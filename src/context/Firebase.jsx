import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

// Load Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};

export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const navigate = useNavigate();
  const [taskArray, setTaskArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const q = query(collection(db, "tasks"), where("uid", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        const notesArray = [];
        querySnapshot.forEach((doc) => {
          notesArray.push(doc.data());
        });
        setTaskArray(notesArray);

        const q2 = query(collection(db, "category"), where("uid", "==", user?.uid));
        const querySnapshotCategory = await getDocs(q2);
        const catArray = [];
        querySnapshotCategory.forEach((doc) => {
          catArray.push(doc.data());
        });
        setCategoryArray(catArray);
      }
    };
    getData();
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signOut = async () => {
    await firebaseAuth.signOut();
    navigate("/");
  };

  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        isLoggedIn,
        user,
        taskArray,
        setTaskArray,
        categoryArray,
        setCategoryArray,
        signOut,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};




// import { createContext, useContext, useState, useEffect} from "react";
// import { initializeApp } from "firebase/app";
// import{getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";
// import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// const FirebaseContext = createContext(null);

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyClpEZdXxBUeTf4N8aqVyb71MsnCakRKq0",
//   authDomain: "todo-list-a8984.firebaseapp.com",
//   projectId: "todo-list-a8984",
//   storageBucket: "todo-list-a8984.appspot.com",
//   messagingSenderId: "673288162890",
//   appId: "1:673288162890:web:64822bd1554df6904d20b3",
//   //databaseURl : "https://todo-list-a8984-default-rtdb.firebaseio.com"
// };



// export const useFirebase =()=> useContext(FirebaseContext);
// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// export const db = getFirestore(firebaseApp);
// const firebaseAuth = getAuth(firebaseApp);

// const googleProvider = new GoogleAuthProvider();


// export const FirebaseProvider = (props) => {
//     const navigate = useNavigate();
//     const [taskArray, setTaskArray] =useState([    
//     ]);
//     const[categoryArray, setCategoryArray] = useState([
//     ]);
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         const getData = async () => {
//           if (user) {
//             const q = query(collection(db, "tasks"), where("uid", "==", user?.uid));
//             const querySnapshot = await getDocs(q);
//             // console.log(querySnapshot, "qwerty");
//             const notesArray = [];
//             querySnapshot.forEach((doc) => {
//               // doc.data() is never undefined for query doc snapshots
//               console.log(doc.id, " => ", doc.data());
//               notesArray.push(doc.data());

//             });
//             console.log(notesArray);
//             setTaskArray(notesArray);
//             // setNotes(notesArray);
//             // console.log(notes);

//             const q2 = query(collection(db, "category"), where("uid", "==", user?.uid));
//             const querySnapshotCategory = await getDocs(q);
//             // console.log(querySnapshot, "qwerty");
//             const catArray = [];
//             querySnapshotCategory.forEach((doc) => {
//               // doc.data() is never undefined for query doc snapshots
//             //   console.log(doc.id, " => ", doc.data());
//               catArray.push(doc.data());

//             });
//             // console.log(catArray);
//             setCategoryArray(catArray);
//             // setNotes(notesArray);
//             // console.log(notes);
//           }
//         };
//         getData();
//       }, [user]);
//     useEffect(() => {
//         onAuthStateChanged(firebaseAuth, (user)=> {
//             if (user){
//                 setUser(user);
//                 console.log(user);
//             }
//             else setUser(null);
//         });
//     }, []);
//     const signOut = async () => {
//         await firebaseAuth.signOut();
//         navigate("/");
//       };
//     const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
//     const isLoggedIn = user ? true : false;
//     return <FirebaseContext.Provider value={{signInWithGoogle, isLoggedIn, user, taskArray, setTaskArray, categoryArray, setCategoryArray, signOut}}>{props.children}</FirebaseContext.Provider>
// };