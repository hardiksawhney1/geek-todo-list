import React, { useState } from 'react';
import styles from './VerticalTabs.module.css';

const tabs = [
  { id: 1, title: 'Dashboard' },
  { id: 2, title: 'My Daily Task' },
  { id: 3, title: 'Tasks' },
  { id: 4, title: 'History' },
];

const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={styles.verticalTabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTabs;
