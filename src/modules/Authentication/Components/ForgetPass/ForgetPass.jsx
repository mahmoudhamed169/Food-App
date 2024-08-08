import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect } from 'react';
import { USERS_URLs } from '../../../../Constants/END_POINTS.JS';
import { EmailValidation } from '../../../../Constants/VALIDATIONS.JS';
import EmailInput from '../../../../UI/EmailInput';

export default function ForgetPass() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm();

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await axios.post(
                USERS_URLs.resetRequest,
                data
            );
            toast.info("OTP is sent to your mail");
            navigate("/resetPass");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='w-75 m-auto my-4'>
            <div className='my-5'>
                <h2 className='fw-bold'>Forgot Your Password?</h2>
                <p className='text-muted'>No worries! Please enter your email and we will send a password reset link</p>
            </div>
            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                <EmailInput
                    register={register}
                    errors={errors}
                    validation={EmailValidation}
                />
                <div className="form-group mt-5 mb-4">
                    <button className="btn btn-success w-100" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className='m-2'>Loading... </span>
                                <ClipLoader size={15} color={"#fff"} />
                            </>
                        ) : 'Request Reset'}
                    </button>
                </div>
            </form>
        </div>
    );
}
