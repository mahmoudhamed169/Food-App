import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import styles from './MasterLayout.module.css';
import NavBar from "../NavBar/NavBar";
import { useState } from "react";

export default function MasterLayout({ loginData }) {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`${styles.container} ${collapsed ? styles.collapsed : ''}`}>
            <div className={`${styles.sidebar} position-fixed`}>
                <SideBar toggleSidebar={toggleSidebar} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <NavBar loginData={loginData} />
                </div>
                <div className={styles.body}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
