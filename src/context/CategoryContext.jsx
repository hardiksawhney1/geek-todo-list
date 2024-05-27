import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "./Firebase";
import { useFirebase } from './Firebase';

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const { user } = useFirebase();

    useEffect(() => {
        const fetchCategories = async () => {
            if (user) {
                const categoryCollection = collection(db, 'category');
                const q = query(categoryCollection, where('uid', '==', user.uid));
                
                // Use onSnapshot for real-time updates
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const categoryList = snapshot.docs.map(doc => ({
                        value: doc.id,
                        label: doc.data().taskCategory
                    }));
                    setCategories(categoryList);
                });

                return () => unsubscribe();
            }
        };

        fetchCategories();
    }, [user]);

    const addCategory = async (newCategory) => {
        if (user) {
            const categoryCollection = collection(db, 'category');
            await addDoc(categoryCollection, { taskCategory: newCategory, uid: user.uid });
            // No need to update state manually, onSnapshot will handle it
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
