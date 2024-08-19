import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { USERS_URLs } from '../../../../Constants/END_POINTS.JS';
import { EmailValidation } from '../../../../Constants/VALIDATIONS.JS';
import { PasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import PasswordInput from '../../../../UI/PasswordInput';
import { ConfirmPasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import EmailInput from '../../../../UI/EmailInput';

export default function ResetPass() {



    const {
        register, //btsheel el values ui inputs
        handleSubmit, //integration
        formState: { errors, isSubmitting }, //errors
        setFocus,

        watch
    } = useForm();

    useEffect(() => {

        setFocus("email")
    }, []);

    let navigate = useNavigate();



    const onSubmit = async (data) => {
        try {
            let response = await axios.post(
                USERS_URLs.reset,
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
                    <EmailInput
                        register={register}
                        errors={errors}
                        validation={EmailValidation}
                    />

                    <div className=' mb-3'>
                        <div className="input-group">
                            <span className="input-group-text  border-0  " id="basic-addon1"><i className=" fa-solid fa-key  h-75 pt-1"></i></span>
                            <input type="text" className="form-control" placeholder="OTP" aria-label="seed" aria-describedby="basic-addon1"
                                {...register("seed", { required: "OTP is required", })}
                            />

                        </div>
                        {errors.seed && (<span className="text-danger mb-3 ">{errors?.seed?.message}</span>)}
                    </div>


                    <PasswordInput
                        register={register}
                        errors={errors}
                        name="password"
                        placeholder="Password"
                        validation={PasswordValidation}
                    />



                    <PasswordInput
                        register={register}
                        errors={errors}
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        validation={ConfirmPasswordValidation(watch)}
                    />



                    <div className="form-group mt-5 mb-4">
                        <button className="btn btn-success w-100" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className='m-2'>Loading... </span>
                                    <ClipLoader size={15} color={"#fff"} />
                                </>
                            ) : 'Reset Password'}
                        </button>
                    </div>

                </form>

            </div>

        </>
    )
}
