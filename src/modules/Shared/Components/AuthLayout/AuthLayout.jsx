import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logo from "../../../../assets/images/4.png"
import { useLoading } from './../../../../Context/LoadingContext';
import Spinner from './../Spinner/Spinner';

export default function AuthLayout() {
    const { isLoading, setIsLoading, setIsAuthLayout } = useLoading()
    const location = useLocation();
    const colClass = location.pathname === '/register' ? 'col-md-8' : 'col-md-6';


    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1100);

        return () => clearTimeout(timer);
    }, [location.pathname, setIsLoading]);

    useEffect(() => {
        setIsAuthLayout(true);
    }, [setIsAuthLayout]);

    return (
        <div>
            {isLoading && <Spinner />}
            <div className='Auth-container container-fluid'>
                <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
                    <div className={colClass}>
                        <div className='bg-white rounded p-3'>
                            <div className="logo-cont  text-center my-2">
                                <img src={logo} alt="logo" />
                            </div>
                            <Outlet />

                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}
