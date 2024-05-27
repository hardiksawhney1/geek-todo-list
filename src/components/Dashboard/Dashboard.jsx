import React, { useEffect } from 'react';
import { useFirebase } from '../../context/Firebase';
import {Navbar} from "../Navbar"
import {Sidebar} from "../Sidebar/Sidebar"
import {Container} from "../Container/Container"
import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const { user } = useFirebase();
  const navigation = useNavigate();
  useEffect(()=>{
    if(!user){
      navigation("/");
    }
  },[user])
  return (
    
    <div className={styles.maindiv}>
      <div><Navbar /></div>
      <div className={styles.dashboardcontainer}>
        <div className={styles.sidebarcall}><Sidebar /></div>
        <div className={styles.containercall}><Container /></div>
      </div>    
    </div>
  );
};

export default Dashboard;
