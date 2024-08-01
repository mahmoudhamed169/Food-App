
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();
    const {
        register, //btsheel el values ui inputs
        handleSubmit, //integration
        formState: { errors }, //errors
    } = useForm();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const onSubmit = async (data) => {
        try {
            let response = await axios.post(
                "https://upskilling-egypt.com:3006/api/v1/Users/Login",
                data
            );
            toast.success("Login successful!");

            navigate("/dashboard/home")



        } catch (error) {

            toast.error(error.response.data.message);
        }
    }



    return (
        <>
            <div className='w-75 m-auto my-4 '>
                <div className='mb-3'>
                    <h2 className=' fw-bold'>Log In</h2>
                    <p className='text-muted'>Welcome Back! Please enter your details</p>
                </div>

                <form className='mt-4' onSubmit={handleSubmit(onSubmit)} >
                    <div className="input-group mb-3">
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

                    <div className="input-group mb-3 mt-3">
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

                    <div className="d-flex justify-content-between align-items-center my-4">
                        <Link
                            to="/register"
                            className="text-black text-decoration-none"
                        >
                            Register now?
                        </Link>
                        <Link
                            to="/forgetPass"
                            className="text-success text-decoration-none"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="form-group my-3 mb-4">
                        <button
                            className="btn btn-success w-100">Login</button>
                    </div>
                </form >
            </div >
        </>


    )
}
