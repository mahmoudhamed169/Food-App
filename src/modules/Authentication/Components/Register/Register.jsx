import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { EmailValidation, PasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import PasswordInput from '../../../../UI/PasswordInput';
import EmailInput from '../../../../UI/EmailInput';
import { ConfirmPasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import { USERS_URLs } from '../../../../Constants/END_POINTS.JS';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export default function Register() {
    const [countries, setCountries] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryNames = response.data.map(country => country.name.common).sort();
            setCountries(countryNames);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,

        watch
    } = useForm();

    useEffect(() => {
        setFocus("userName");
    }, [setFocus]);

    let navigate = useNavigate();


    const appendFormData = (data) => {
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("email", data.email);
        formData.append("country", data.country);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        formData.append("profileImage", data.profileImage[0]);


        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        return formData;
    };


    const onSubmit = async (data) => {
        console.log(data)
        const userData = appendFormData(data);
        try {
            let response = await axios.post(USERS_URLs.register, userData);

            toast.success('Registration successful! Please check your email to verify your account.');
            navigate("/verifyAcount")
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };


    return (
        <div className='m-auto mb-2' style={{ width: "85%" }}>
            <div className='mb-3'>
                <h2 className='fw-bold'>Register</h2>
                <p className='text-muted'>Welcome Back! Please enter your details</p>
            </div>

            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                    {/* userName */}
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text border-0" id="basic-addon1"><i className="fa-solid fa-user h-75 pt-1"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="UserName"
                                    aria-label="UserName"
                                    aria-describedby="basic-addon1"
                                    {...register("userName", {
                                        required: "UserName is required",
                                        pattern: {
                                            value: /^[a-zA-Z]+[0-9]+$/,
                                            message: "UserName must contain letters, end with numbers, and not contain spaces",
                                        },
                                    })}
                                />
                            </div>
                            {errors.userName && (
                                <span className="text-danger">{errors?.userName?.message}</span>
                            )}
                        </div>
                    </div>

                    {/* email */}
                    <div className="col-md-6">
                        <EmailInput
                            register={register}
                            errors={errors}
                            validation={EmailValidation}
                        />
                    </div>

                    {/* country */}
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text border-0" id="basic-addon1"><i className="fa-solid fa-house h-75 pt-1"></i></span>
                                <select
                                    className="form-control"
                                    id="countrySelect"
                                    {...register("country", {
                                        required: "Country is required",
                                    })}
                                >
                                    <option value="">Select a country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.country && (
                                <span className="text-danger">{errors?.country?.message}</span>
                            )}
                        </div>
                    </div>

                    {/* phoneNumber */}
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text border-0" id="basic-addon1"><i className="fa-solid fa-phone h-75 pt-1"></i></span>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    aria-label="PhoneNumber"
                                    aria-describedby="basic-addon1"
                                    {...register("phoneNumber", {
                                        required: "Phone number is required",
                                    })}
                                />
                            </div>
                            {errors.phoneNumber && (
                                <span className="text-danger">{errors?.phoneNumber?.message}</span>
                            )}
                        </div>
                    </div>

                    {/* password */}
                    <div className="col-md-6">
                        <PasswordInput
                            register={register}
                            errors={errors}
                            name="password"
                            placeholder="Password"
                            validation={PasswordValidation}
                        />
                    </div>

                    {/* confirmPassword */}
                    <div className="col-md-6">
                        <PasswordInput
                            register={register}
                            errors={errors}
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            validation={ConfirmPasswordValidation(watch)}
                        />
                    </div>

                    {/* profileImage */}
                    <div className="col-md-8 m-auto mt-3">
                        <div className="mb-3">

                            <div className="input-group ">
                                <input
                                    type="file"
                                    className="form-control h-100"
                                    {...register("profileImage", {
                                        required: "Image is required",
                                    })}
                                />
                            </div>
                            {errors.profileImage && (
                                <span className="text-danger">{errors?.profileImage?.message}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-row-reverse my-4">
                    <Link to="/login" className="text-success text-decoration-none">
                        Login Now?
                    </Link>
                </div>

                <div className="form-group mt-4 text-center">
                    <button className="btn btn-success w-50" disabled={isSubmitting}>
                        {isSubmitting ? <><span className='m-2'>Loading... </span><ClipLoader size={15} color={"#fff"} /></> : 'Register'}

                    </button>
                </div>
            </form>
        </div>
    );
}
