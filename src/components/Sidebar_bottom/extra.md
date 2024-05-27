.gitignore

original : 
  const { user, categoryArray, setCategoryArray} = useFirebase();

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [addCategory, setAddCategory] = useState("");
  const handleInputChange = (event) => {
    setAddCategory(event.target.value);
  };

  const pushCategory = async (newCategory) => {
    const categoryDocRef = doc(db, "category", newCategory.id);
    await setDoc(categoryDocRef, newCategory);
  };
  const generateRandomId = () => {
    return Math.random().toString(36) + Date.now().toString(36);
  };
  const onSubmit = () => {
    // console.log(addCategory);
    const randomID = generateRandomId();
    const newCategory = {
        id: randomID,
        taskCategory: addCategory,
        uid: user.uid,

    };
    setAddCategory("");
    pushCategory(newCategory);
  };





  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [addCategory, setAddCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCategories = async () => {
      if (user) {
        const categoryCollection = collection(db, 'category');
        const q = query(categoryCollection, where('uid', '==', user.uid));
        const categorySnapshot = await getDocs(q);
        const categoryList = categorySnapshot.docs.map(doc => doc.data());
        setCategories(categoryList);
      }
    };

    fetchCategories();
  }, [user]);

  const handleInputChange = (event) => {
    setAddCategory(event.target.value);
  };

  const onSubmit = () => {
    console.log(addCategory);
    // Reset the input field after submission if needed
    setAddCategory('');
  };













  import React, { useState, useEffect } from "react";
import styles from "./Sidebar_bottom.module.css";
import { addbutton, bulletpoint } from "../../assets_images";
import { db } from "../../context/Firebase";
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useFirebase } from "../../context/Firebase";

const tabs = [
  { id: 1, title: "Categories" },
];

const Sidebar_bottom = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [addCategory, setAddCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useFirebase();

  useEffect(() => {
    const fetchCategories = async () => {
      if (user) {
        const categoryCollection = collection(db, "category");
        const q = query(categoryCollection, where("uid", "==", user.uid));
        const categorySnapshot = await getDocs(q);
        const categoryList = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      }
    };

    fetchCategories();
  }, [user]);

  const handleInputChange = (event) => {
    setAddCategory(event.target.value);
  };

  const onSubmit = async () => {
    if (addCategory.trim() === "" || !user) {
      return;
    }

    const newCategory = {
      taskCategory: addCategory,
      uid: user.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "category"), newCategory);
      setCategories([...categories, { id: docRef.id, ...newCategory }]);
      setAddCategory("");
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  return (
    <div className={styles.main}>
      <hr />
      {/* Top Section */}
      <div className={styles.top}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <p className={styles.tabTitle}>{tab.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section */}
      <div className={styles.middle}>
        <input
          className={`${styles.search}`}
          placeholder="Add a Category..."
          value={addCategory}
          onChange={handleInputChange}
        />
        <img
          src={addbutton}
          className={styles.addbutton}
          alt="Add"
          onClick={onSubmit}
        />
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <img
              src={bulletpoint}
              className={styles.bulletpoint}
              alt="bullet point"
            />
            <div className={styles.categoryname}>{category.taskCategory}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar_bottom;
