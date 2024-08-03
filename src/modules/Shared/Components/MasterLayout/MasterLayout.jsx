
import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import styles from './MasterLayout.module.css';
import NavBar from "../NavBar/NavBar";
import { useLoading } from "../../../../Context/LoadingContext";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";


export default function MasterLayout({ loginData }) {
    const { isLoading, setIsLoading, isAuthLayout, setIsAuthLayout } = useLoading();

    useEffect(() => {
        if (isAuthLayout) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
                setIsAuthLayout(false);
            }, 1100);

            return () => clearTimeout(timer);
        }
    }, [isAuthLayout, setIsLoading, setIsAuthLayout]);
    return (
        <>
            {isLoading && <Spinner />}

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
