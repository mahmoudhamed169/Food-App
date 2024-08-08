
import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import styles from './MasterLayout.module.css';
import NavBar from "../NavBar/NavBar";



export default function MasterLayout({ loginData }) {

    return (
        <>

            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <SideBar />
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
        </>
    );
}
