import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import styles from './MasterLayout.module.css';
import NavBar from "../NavBar/NavBar";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

export default function MasterLayout() {
    const { loginData } = useContext(AuthContext)
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
