
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';

export default function ForgetPass() {
    const [loading, setLoading] = useState(false);
    const {
        register, //btsheel el values ui inputs
        handleSubmit, //integration
        formState: { errors }, //errors
        setFocus,
    } = useForm();

    useEffect(() => {
        // inputEl.current.focus()
        setFocus("email")
    }, []);



    let navigate = useNavigate();


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let response = await axios.post(
                "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
                data
            );
            toast.info(response.data.message);
            navigate("/resetPass")



        } catch (error) {

            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='w-75 m-auto my-4 '>
                <div className='my-5'>
                    <h2 className=' fw-bold'>Forgot Your Password?</h2>
                    <p className='text-muted'>No worries! Please enter your email and we will send a password reset link </p>
                </div>


                <form className='mt-4' onSubmit={handleSubmit(onSubmit)} >
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
                            <span className="text-danger mb-3 ">{errors?.email?.message}</span>
                        )}
                    </div>



                    <div className="form-group mt-5 mb-4">
                        <button className="btn btn-success w-100 " disabled={loading}>

                            {loading ? <><span className='m-2'>Loading... </span><ClipLoader size={15} color={"#fff"} /></> : 'Submit'}
                        </button>
                    </div>

                </form>




            </div >
        </>
    )
}
