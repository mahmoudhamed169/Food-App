
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { useLoading } from './../../../../Context/LoadingContext';
import Spinner from './../Spinner/Spinner';
import { useEffect } from 'react';

export default function MasterLayout() {
    const { isLoading, setIsLoading } = useLoading()
    // const location = useLocation();
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <Spinner />}
            <div className=' container-fluid'>
                <div className="row">
                    <div className="col-md-3 bg-info">
                        <SideBar />

                    </div>
                    <div className="col-md-9 bg-success">
                        <NavBar />

                        <Outlet />


                    </div>
                </div>
            </div>
        </>


    )
}
