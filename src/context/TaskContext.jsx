import { createContext, useContext, useState, useEffect } from "react";
import { db, useFirebase } from "./Firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc, setDoc, query, where } from "firebase/firestore";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = (props) => {
    const [taskArray, setTaskArray] = useState([]);
    const { user } = useFirebase();

    useEffect(() => {
        if (user) {
            const tasksQuery = query(collection(db, "tasks"), where("uid", "==", user.uid));
            const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
                const tasks = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTaskArray(tasks);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const addTask = async (taskData) => {
        try {
            const taskDocRef = doc(db, "tasks", taskData.id);
            await setDoc(taskDocRef, { ...taskData, uid: user.uid });
            setTaskArray([...taskArray, { ...taskData, uid: user.uid }]);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const taskDocRef = doc(db, "tasks", taskId);
            await updateDoc(taskDocRef, { taskStatus: newStatus });
            const updatedTasks = taskArray.map(task =>
                task.id === taskId ? { ...task, taskStatus: newStatus } : task
            );
            setTaskArray(updatedTasks);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <TaskContext.Provider value={{ taskArray, setTaskArray, addTask, updateTaskStatus }}>
            {props.children}
        </TaskContext.Provider>
    );
};
