import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function ResetPass() {
    const [showPassword, setShowPassword] = useState(false);
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register, //btsheel el values ui inputs
        handleSubmit, //integration
        formState: { errors }, //errors
    } = useForm();

    let navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!ShowConfirmPassword);
    };


    const onSubmit = async (data) => {
        try {
            let response = await axios.post(
                'https://upskilling-egypt.com:3006/api/v1/Users/Reset',
                data
            );
            toast.success(response.data.message);
            navigate("/login")




        } catch (error) {

            toast.error(error.response.data.message);
        }
    }



    return (
        <>
            <div className='w-75 m-auto my-2 '>
                <div className='my-3'>
                    <h2 className=' fw-bold'> Reset  Password</h2>
                    <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                </div>

                <form className='mt-3' onSubmit={handleSubmit(onSubmit)} >
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
                        <span className="text-danger mb-3 ">{errors?.email?.message}</span>
                    )}

                    <div className="input-group mb-3">
                        <span className="input-group-text  border-0  " id="basic-addon1"><i className=" fa-solid fa-key  h-75 pt-1"></i></span>
                        <input type="text" className="form-control" placeholder="OTP" aria-label="seed" aria-describedby="basic-addon1"
                            {...register("seed", {
                                required: "OTP is required",

                            })}
                        />

                    </div>
                    {errors.seed && (
                        <span className="text-danger mb-3 ">{errors?.seed?.message}</span>
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

                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text  border-0  " id="basic-addon1"><i className="fa-solid fa-lock  h-75 pt-1 "></i></span>
                        <input type={ShowConfirmPassword ? "text" : "password"} className="form-control" placeholder="Confirm New Password" aria-label="Password" aria-describedby="basic-addon1"     {...register("confirmPassword", {
                            required: "password is required",
                        })} />
                        <span className="input-group-text  border-0 " onClick={toggleConfirmPasswordVisibility} id="basic-addon1">
                            <i className={`fa-regular ${ShowConfirmPassword ? 'fa-eye' : "fa-eye-slash"} border-0 p-0`}></i>
                        </span>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-danger">{errors?.confirmPassword?.message}</span>
                    )}


                    <div className="form-group mt-4 mb-3">
                        <button
                            className="btn btn-success w-100">Submit</button>
                    </div>

                </form>

            </div>

        </>
    )
}
