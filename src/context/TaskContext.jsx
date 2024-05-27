import { createContext, useContext, useState, useEffect } from "react";
import { db, useFirebase } from "./Firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = (props) => {
    const [taskArray, setTaskArray] = useState([]);
    const { user } = useFirebase();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTaskArray(tasks);
        });

        return () => unsubscribe();
    }, [user]);

    const addTask = async (taskData) => {
        try {
            // const docRef = await addDoc(collection(db, "tasks", taskData.id), taskData);
            const taskDocRef = doc(db, "tasks", taskData.id);
            await setDoc(taskDocRef, taskData);
            // window.location.reload();
            const updatedArray=[...taskArray, taskData]
            setTaskArray(updatedArray)

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const taskDocRef = doc(db, "tasks", taskId);
            await updateDoc(taskDocRef, { taskStatus: newStatus });
            // window.location.reload();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    console.log(taskArray,"harshit")

    return (
        <TaskContext.Provider value={{ taskArray,setTaskArray, addTask, updateTaskStatus }}>
            {props.children}
        </TaskContext.Provider>
    );
};
