import React, { useState } from "react";
import styles from "./Container.module.css";
import { addmytaskbitmoji } from "../../assets_images";
import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";
import EnhancedTable from "../Tasktable/TaskTable";
import { db } from "../../context/Firebase";
import { useFirebase } from "../../context/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useTask } from "../../context/TaskContext";
export const Container = () => {
  const { user } = useFirebase();
  const { addTask } = useTask();
  // Create state variables for each input field
  const [taskName, setTaskName] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskTags, setTaskTags] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDate, setTaskDate] = useState('');


  const pushTask = async (newNote) => {
    const taskDocRef = doc(db, "tasks", newNote.id);
    await setDoc(taskDocRef, newNote);
  };
  const generateRandomId = () => {
    return Math.random().toString(36) + Date.now().toString(36);
  };
  const handleSubmit = async () => {
    const randomId = generateRandomId();
    const tags = taskTags.split(' ');
    const newNote = {
      id: randomId,
      taskName: taskName,
      taskCategory: taskCategory,
      taskTags: tags,
      taskTime: taskTime,
      taskDate: taskDate,
      taskStatus: false,
      uid: user.uid,
    };
    // const updatedNotes = [newNote, ...notes];
    // setNotes(updatedNotes);
    setTaskName('')
    setTaskCategory('');
    setTaskDate('');
    setTaskTags('');
    setTaskTime('');

    // pushTask(newNote);
    addTask(newNote);
    
  };

  return (
    <div className={styles.maindiv}>
      <div className={styles.addmytask}>
        <div className={styles.addInputs}>
          <p>Add My Day Task</p>
          <form onSubmit={handleSubmit} className={styles.inputBoxes}>
            <div className={styles.taskbox}>
              <label htmlFor="task-input">TASK</label>
              <input
                type="text"
                id="task-input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.categorybox}>
              <CategoryDropdown taskCategory={taskCategory} setTaskCategory={setTaskCategory} />
            </div>
            <div className={styles.taskbox}>
              <label htmlFor="tag-input">TAGS <span className="text-[0.6vw] md:text-[0.7vw]">(Space-separated)</span></label>
              <input
                type="text"
                id="tag-input"
                value={taskTags}
                onChange={(e) => setTaskTags(e.target.value)}
                className={styles.input}
              />
            </div>
          </form>
          <div className={styles.inputBoxes}>
            <div className={styles.taskbox}>
              <label htmlFor="time-input">TIME<span className="text-[0.6vw] md:text-[0.7vw]"> (In hours)</span></label>
              <input
                type="text"
                id="time-input"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.datebox}>
              <label htmlFor="date-input">DUE DATE</label>
              <input
                type="date"
                id="date-input"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <button type="submit" onClick={()=>{handleSubmit()}} className={styles.addbutton}>Add</button>
          </div>
        </div>
        <img src={addmytaskbitmoji} className={styles.bitmoji} />
      </div>
      <div className={styles.tasks}>
        <EnhancedTable />
      </div>
    </div>
  );
};









// import React from "react";
// import styles from "./Container.module.css";
// import { addmytaskbitmoji } from "../../assets_images";
// import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";
// import EnhancedTable from "../Tasktable/TaskTable2";
// export const Container = () => {
//   return (
//     <div className={styles.maindiv}>
//       <div className={styles.addmytask}>
//         <div className={styles.addInputs}>
//           <p>Add My Day Task</p>
//           <div className={styles.inputBoxes}>
//             <div className={styles.taskbox}>
//               <label htmlFor="task-input">TASK</label>
//               <input type="text" id="task-input" />
//             </div>
//             <div className={styles.categorybox}>
//                 <CategoryDropdown />
//             </div>
//             <div className={styles.taskbox}>
            
//               <label htmlFor="tag-input">TAGS <span className="text-[0.6vw] md:text-[0.7vw]">(Space-separated)</span></label>
              
//               <input type="text" id="tag-input" />
//             </div>
            
//           </div>
//           <div className={styles.inputBoxes}>
//             <div className={styles.taskbox}>
//                 <label htmlFor="task-input">TIME<span className="text-[0.6vw] md:text-[0.7vw]"> (In hours)</span></label>
//                 <input type="text" id="task-input" />
//             </div>
//             <div className={styles.datebox}>
//                 <label htmlFor="date-input">DUE DATE</label>
//                 <input type="date" id="date-input" />
//             </div>
//             <button className={styles.addbutton}>Add</button>
//           </div>
          

//         </div>
//         <img src={addmytaskbitmoji} className={styles.bitmoji} />
//       </div>
//       <div classname={styles.tasks}>
//         <EnhancedTable />
//       </div>
//     </div>
//   );
// };
