import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { EmailValidation } from '../../../../Constants/VALIDATIONS.JS';
import { USERS_URLs } from '../../../../Constants/END_POINTS.JS';
import PasswordInput from '../../../../UI/PasswordInput';
import { LoginPasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import EmailInput from '../../../../UI/EmailInput';
import { AuthContext } from '../../../../Context/AuthContext';



export default function Login() {
    const { saveLoginData } = useContext(AuthContext)





    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm();

    useEffect(() => {
        // inputEl.current.focus()
        setFocus("email")
    });



    const onSubmit = async (data) => {
        console.log(data);

        try {
            let response = await axios.post(
                USERS_URLs.login,
                data
            );
            localStorage.setItem("token", response.data.token)
            saveLoginData()
            toast.success("Login successful!");
            navigate("/dashboard/home");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className='w-75 m-auto my-4 '>
                <div className='mb-3'>
                    <h2 className=' fw-bold'>Log In</h2>
                    <p className='text-muted'>Welcome Back! Please enter your details</p>
                </div>

                <form className='mt-4' onSubmit={handleSubmit(onSubmit)} >

                    <EmailInput
                        register={register}
                        errors={errors}
                        validation={EmailValidation}
                    />


                    <PasswordInput
                        register={register}
                        errors={errors}
                        name="password"
                        placeholder="Password"
                        validation={LoginPasswordValidation}
                    />

                    <div className="d-flex justify-content-between align-items-center my-4">
                        <Link to="/register" className="text-black text-decoration-none">
                            Register now?
                        </Link>
                        <Link to="/forgetPass" className="text-success text-decoration-none">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="form-group my-3 mb-4">
                        <button className="btn btn-success w-100" disabled={isSubmitting}>
                            {isSubmitting ? <><span className='m-2'>Loading... </span><ClipLoader size={15} color={"#fff"} /></> : 'Login'}
                        </button>
                    </div>
                </form >
            </div >
        </>
    );
}
