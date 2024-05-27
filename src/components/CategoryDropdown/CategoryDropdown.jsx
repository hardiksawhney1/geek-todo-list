import React from 'react';
import styles from './CategoryDropdown.module.css';
import { useCategory } from '../../context/CategoryContext';

export const CategoryDropdown = ({ taskCategory, setTaskCategory }) => {
    const { categories } = useCategory();

    const handleChange = (event) => {
        setTaskCategory(event.target.value);
        console.log(event.target.value, "incategorydropdown");
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
                {categories.map((option) => (
                    <option key={option.value} value={option.taskCategory}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
