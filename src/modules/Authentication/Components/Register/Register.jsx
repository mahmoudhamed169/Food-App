import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countries, setCountries] = useState([]);


    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryNames = response.data.map(country => country.name.common).sort();
            setCountries(countryNames);
            // console.log(countries);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchCountries()

        return () => {

        };
    }, []);


    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
    } = useForm();

    useEffect(() => {
        // inputEl.current.focus()
        setFocus("userName")
    }, []);

    let navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!ShowConfirmPassword);
    };

    const onSubmit = async (data) => {
        try {
            console.log(data);




        } catch (error) {

            console.log(error);
        }
    }


    return (
        <div className=' m-auto mb-2 ' style={{ width: "85%" }} >
            <div className='mb-3'>
                <h2 className=' fw-bold'>Resgiter</h2>
                <p className='text-muted'>Welcome Back! Please enter your details</p>
            </div>

            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>

                <div className="row g-3 ">
                    {/* userName */}
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-user  h-75 pt-1"></i></span>
                                <input type="text" className="form-control" placeholder="UserName" aria-label="Email" aria-describedby="basic-addon1"
                                    {...register("userName", {
                                        required: "userName is required",

                                    })}
                                />
                            </div>
                            {errors.userName && (
                                <span className="text-danger ">{errors?.userName?.message}</span>
                            )}
                        </div>
                    </div>

                    {/* email */}
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-envelope  h-75 pt-1"></i></span>
                                <input type="email" className="form-control" placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1"
                                    {...register("email", {
                                        required: "email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "email is not valid",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-danger ">{errors?.email?.message}</span>
                            )}
                        </div>
                    </div>
                    {/* country */}
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <div className="input-group ">
                                <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-house  h-75 pt-1"></i></span>
                                <select className="form-control" id="countrySelect"
                                    {...register("country", {
                                        required: "Country is required",

                                    })}>
                                    <option value="">Select a country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.country && (
                                <span className="text-danger ">{errors?.country?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-phone  h-75 pt-1"></i></span>
                            <input type="tel" className="form-control" placeholder="Phone Number" aria-label="PhoneNumber" aria-describedby="basic-addon1"
                                {...register("phoneNumber ", {
                                    required: "phoneNumber  is required",

                                })}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <span className="text-danger ">{errors?.phoneNumber?.message}</span>
                        )}
                    </div>

                    <div className="col-md-6">
                        <div className='mb-2'>
                            <div className="input-group  ">
                                <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-lock  h-75 pt-1 "></i></span>
                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"     {...register("password", {
                                    required: "password is required",
                                })} />
                                <span className="input-group-text  border-0 " onClick={togglePasswordVisibility} id="basic-addon1">
                                    <i className={`fa-regular ${showPassword ? 'fa-eye' : "fa-eye-slash"} border-0 p-0`}></i>
                                </span>
                            </div>
                            {errors.password && (
                                <span className="text-danger">{errors?.password?.message}</span>
                            )}
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className='mb-2'>
                            <div className="input-group ">
                                <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-lock  h-75 pt-1 "></i></span>
                                <input type={ShowConfirmPassword ? "text" : "password"} className="form-control" placeholder="Confirm New Password" aria-label="Password" aria-describedby="basic-addon1"     {...register("confirmPassword", {
                                    required: "confirm Password is required",
                                })} />
                                <span className="input-group-text  border-0 " onClick={toggleConfirmPasswordVisibility} id="basic-addon1">
                                    <i className={`fa-regular ${ShowConfirmPassword ? 'fa-eye' : "fa-eye-slash"} border-0 p-0`}></i>
                                </span>
                            </div>
                            {errors.confirmPassword && (
                                <span className="text-danger">{errors?.confirmPassword?.message}</span>
                            )}
                        </div>
                    </div>


                </div>


                <div className="d-flex  flex-row-reverse my-4">

                    <Link
                        to="/login"
                        className="text-success text-decoration-none"
                    >
                        Login Now?
                    </Link>
                </div>


                <div className="form-group mt-4 text-center">
                    <button
                        className="btn btn-success w-50">Register</button>
                </div>

            </form>
        </div>
    )
}
