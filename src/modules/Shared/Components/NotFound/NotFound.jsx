import React from 'react';
import logoImage from "../../../../assets/images/4.png";
import notFoundImg from "../../../../assets/images/404.png";
import styles from './notFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className={`${styles.container} d-flex flex-column flex-md-row align-items-center vh-100`}>
            <div className="col-md-5 py-5">
                <div className={`${styles.imgContainer} w-50 m-auto mb-5`}>
                    <img src={logoImage} alt="Logo" className="img-fluid" />
                </div>
                <div className={`${styles.caption} my-5 w-50 m-auto `}>
                    <h2 className="fw-bold mx-3">Oops.<br />
                        <span className="text-success fw-medium">Page not found</span><br />
                    </h2>
                    <p className="mx-3 mb-5 mt-4">This page doesn’t exist or was removed! <br />
                        We suggest you back to home.</p>
                    <button className={`${styles.btnBackHome} mx-3 p-3 mt-1`} onClick={() => { navigate("/dashboard/home") }}>
                        <i className="fa-solid fa-arrow-left me-3"></i>Back To Home
                    </button>
                </div>
            </div>
            <div className={`${styles.notFoundContiner} col-md-7 d-flex justify-content-center align-items-center`}>
                <img src={notFoundImg} className="w-75 img-fluid" alt="Not Found" />
            </div>
        </div>
    );
}

export default NotFound;
