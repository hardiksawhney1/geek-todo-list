.gitignore 
import React from 'react';
import styles from './CategoryDropdown.module.css';

export const CategoryDropdown = ({ taskCategory, setTaskCategory }) => {
    const options = [
        { value: 'option1', label: 'Option 1 loem ipsum text' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleChange = (event) => {
        setTaskCategory(event.target.value);
    };

    return (
        <div className={styles.dropdownContainer}>
            <label htmlFor='Category'>CATEGORY</label>
            <select
                value={taskCategory}
                onChange={handleChange}
                className={`${styles.dropdown} ${taskCategory === '' ? styles.placeholder : ''}`}
            >
                <option value="" disabled>
                    Select
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}




import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from "../../context/Firebase";
import styles from './CategoryDropdown.module.css';
import { useFirebase } from '../../context/Firebase';

export const CategoryDropdown = ({ taskCategory, setTaskCategory }) => {
    const [options, setOptions] = useState([]);
    const { user } = useFirebase();

    useEffect(() => {
        const fetchCategories = async () => {
            if (user) {
                const categoryCollection = collection(db, 'category');
                const q = query(categoryCollection, where('uid', '==', user.uid));
                const categorySnapshot = await getDocs(q);
                const categoryList = categorySnapshot.docs.map(doc => ({
                    value: doc.id,
                    label: doc.data().taskCategory
                }));
                setOptions(categoryList);
            }
        };

        fetchCategories();
    }, [user]);

    const handleChange = (event) => {
        setTaskCategory(event.target.value);
    };

    return (
        <div className={styles.dropdownContainer}>
            <label htmlFor='Category'>CATEGORY</label>
            <select
                value={taskCategory}
                onChange={handleChange}
                className={`${styles.dropdown} ${taskCategory === '' ? styles.placeholder : ''}`}
            >
                <option value="" disabled>
                    Select
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
