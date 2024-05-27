import React, { useState } from "react";
import styles from "./Sidebar_bottom.module.css";
import { addbutton, bulletpoint } from "../../assets_images";
import { useCategory } from "../../context/CategoryContext";

const tabs = [
  { id: 1, title: "Categories" },
];

const Sidebar_bottom = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [addCategory, setAddCategory] = useState("");
  const { categories, addCategory: addNewCategory } = useCategory();

  const handleInputChange = (event) => {
    setAddCategory(event.target.value);
  };

  const onSubmit = () => {
    addNewCategory(addCategory);
    setAddCategory("");
  };

  return (
    <div className={styles.main}>
      <hr></hr>
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
          className={`${styles.search} `}
          placeholder="Add a Category..."
          value={addCategory}
          onChange={handleInputChange}
        ></input>
        <img
          src={addbutton}
          className={styles.addbutton}
          alt="Add"
          onClick={onSubmit}
        ></img>
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
            <div className={styles.categoryname}>{category.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar_bottom;
