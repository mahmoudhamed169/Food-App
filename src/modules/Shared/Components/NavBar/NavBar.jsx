import React from 'react'
import logo from "../../../../assets/images/1.png";
import avatar from '../../../../assets/images/avatar.png';
import { Link } from 'react-router-dom';

export default function NavBar({ loginData }) {
    return (
        <div className="navbar-container  ">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    {/* <Link className="navbar-brand " to="/dashboard/home"  >
                        <img src={logo} className=' p-2' alt="" style={{ width: "100px" }} />

                </Link> */}


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <form className="d-flex " role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </ul> */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className='d-flex'>
                                    <img src={avatar} className='w-100' alt="" />
                                    <h6 className='mt-3 mx-3'>{loginData?.userName}</h6>
                                </div>
                            </li>
                            <li className="nav-item">
                                <i className="fa-solid fa-bell mt-3 mx-3"></i>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}
