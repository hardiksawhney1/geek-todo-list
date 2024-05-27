import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { geeklogo, bell, dropdownicon } from "../../assets_images";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../context/TaskContext";

export const Navbar = () => {

  const { user, signOut } = useFirebase();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { taskArray, setTaskArray } = useTask();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tempArray, setTempArray] = useState(taskArray);
  const [fetchOnce, setFetchOnce] = useState(false);
  
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredTasks = tempArray.filter((task) => {
      const matchesName = task.taskName.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesCategory = task.taskCategory.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesTags = task.taskTags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm));
      return matchesName || matchesCategory || matchesTags;
    });
    // console.log(newFilteredTasks)
    setFilteredTasks(newFilteredTasks);
    setTaskArray(newFilteredTasks);
  }, [searchTerm]);

  useEffect(()=>{
    if(taskArray.length>0 && !fetchOnce){
      setTempArray(taskArray);
      setFetchOnce(true);
    }
  },[taskArray]);
  


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSignOut = async () => {
    await signOut();
    // navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.leftside}`}>
        <img src={geeklogo} className={`${styles.logo}`} alt="Logo" />
        <input
          className={`${styles.search}`}
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        ></input>
      </div>
      <div className={`${styles.rightside}`}>
        <img src={bell} className={`${styles.bell}`} alt="Bell" />
        {user ? (
          <>
            <img
              src={user.photoURL}
              className={`${styles.profilephoto}`}
              alt="Profile"
            />
            <div className={`${styles.username}`}>{user.displayName}</div>
          </>
        ) : (
          <>
            <div className={`${styles.placeholderProfile}`} />
            <div className={`${styles.username}`}>Guest</div>
          </>
        )}
        <img
          src={dropdownicon}
          className={`${styles.dropdownicon}`}
          alt="Dropdown"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem} onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};





// import React, { useState } from "react";
// import styles from "./Navbar.module.css";
// import { geeklogo, bell, dropdownicon } from "../../assets_images";
// import { useFirebase } from "../../context/Firebase";
// import { useNavigate } from "react-router-dom";
// import { useTask } from "../../context/TaskContext";

// export const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { taskArray, setTaskArray } = useTask();

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredTasks = taskArray.filter((task) => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     const matchesName = task.taskName.toLowerCase().includes(lowerCaseSearchTerm);
//     const matchesCategory = task.taskCategory.toLowerCase().includes(lowerCaseSearchTerm);
//     const matchesTags = task.taskTags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm));
//     return matchesName || matchesCategory || matchesTags;
//   });
//   // setTaskArray(filteredTasks);
//   // console.log("Filteered Task array",filteredTasks);
//   const { user, signOut } = useFirebase();
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     await signOut();
//     // navigate("/");
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   return (
//     <div className={`${styles.main}`}>
//       <div className={`${styles.leftside}`}>
//         <img src={geeklogo} className={`${styles.logo}`} alt="Logo" />
//         <input
//           className={`${styles.search}`}
//           placeholder="🔍 Search..."
//           value={searchTerm}
//           onChange={()=>{handleSearchChange()}}
//         ></input>
//       </div>
//       <div className={`${styles.rightside}`}>
//         <img src={bell} className={`${styles.bell}`} alt="Bell" />
//         {user ? (
//           <>
//             <img
//               src={user.photoURL}
//               className={`${styles.profilephoto}`}
//               alt="Profile"
//             />
//             <div className={`${styles.username}`}>{user.displayName}</div>
//           </>
//         ) : (
//           <>
//             <div className={`${styles.placeholderProfile}`} />
//             <div className={`${styles.username}`}>Guest</div>
//           </>
//         )}
//         <img
//           src={dropdownicon}
//           className={`${styles.dropdownicon}`}
//           alt="Dropdown"
//           onClick={toggleDropdown}
//         />
//         {dropdownVisible && (
//           <div className={styles.dropdownMenu}>
//             <div className={styles.dropdownItem} onClick={handleSignOut}>
//               Sign Out
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



// import React from "react";
// import styles from "./Navbar.module.css";
// import { geekyants, geeklogo, bell, dropdownicon } from "../../assets_images";
// import { useFirebase } from "../../context/Firebase";
// export const Navbar = () => {
//   const { user } = useFirebase();
//   return (
//     <div className={`${styles.main}`}>
//       <div className={`${styles.leftside} `}>
//         <img src={geeklogo} className={`${styles.logo} `} />
//         <input
//           className={`${styles.search} `}
//           placeholder="🔍 Search..."
//         ></input>
//       </div>
//       <div className={`${styles.rightside} `}>
//         <img src={bell} className={`${styles.bell}`}></img>
//         {user ? (
//           <>
//             <img
//               src={user.photoURL}
//               className={`${styles.profilephoto}`}
//               alt="Profile"
//             />
//             <div className={`${styles.username}`}>{user.displayName}</div>
//           </>
//         ) : (
//           <>
//             <div className={`${styles.placeholderProfile}`} />
//             <div className={`${styles.username}`}>Guest</div>
//           </>
//         )}
//         <img src={dropdownicon} className={`${styles.dropdownicon} `} />
//       </div>
//     </div>
//   );
// };
