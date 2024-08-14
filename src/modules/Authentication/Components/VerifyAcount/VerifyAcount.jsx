import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EmailInput from '../../../../UI/EmailInput';
import { EmailValidation } from '../../../../Constants/VALIDATIONS.JS';
import { useNavigate } from 'react-router-dom';
import { USERS_URLs } from '../../../../Constants/END_POINTS.JS';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const VerifyAccount = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            let response = await axios.put(
                USERS_URLs.verifyAcount,
                data
            );
            toast.success(response.data.message);
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {

        setFocus("email")
    }, []);



    return (
        <div>
            <div className="m-auto mt-5 mb-3" style={{ width: "85%" }}>
                <div className="mb-3">
                    <h2 className="fw-bold">Verify Your Account</h2>
                    <p className="text-muted">Welcome Back! Please enter your details</p>
                </div>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <EmailInput
                        register={register}
                        errors={errors}
                        validation={EmailValidation}
                    />


                    <div className=' mb-3'>
                        <div className="input-group">
                            <span className="input-group-text  border-0  " id="basic-addon1"><i className=" fa-solid fa-key  h-75 pt-1"></i></span>
                            <input type="text" className="form-control" placeholder="Code" aria-label="seed" aria-describedby="basic-addon1"
                                {...register("code", { required: "code verification is required", })}
                            />

                        </div>
                        {errors.code && (<span className="text-danger mb-3 ">{errors?.code?.message}</span>)}
                    </div>

                    <div className="form-group mt-4 text-center">
                        <button
                            type="submit"
                            className="btn btn-success w-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <><span className='m-2'>Loading... </span><ClipLoader size={15} color={"#fff"} /></> : 'Verify'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyAccount;
