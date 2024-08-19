import { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MenuItem } from 'react-pro-sidebar';
import PasswordInput from '../../../../UI/PasswordInput';
import { useForm } from 'react-hook-form';
import logo from "../../../../assets/images/4.png"
import { ClipLoader } from 'react-spinners';
import { PasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import { oldPasswordValidation } from '../../../../Constants/VALIDATIONS.JS';

import { ConfirmNewPasswordValidation } from '../../../../Constants/VALIDATIONS.JS';
import axios from 'axios';
import { USERS_URLs } from '../../../../Constants/END_POINTS.JS';
import { toast } from 'react-toastify';

function ChangePassword() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
        watch
    } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        setFocus("oldPassword")
    }, []);

    const onSubmit = async (data) => {
        try {
            let response = await axios.put(

                USERS_URLs.changePassword,
                data,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },

            );
            await toast.success(response.data.message);
            handleClose()
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }



    return (
        <>
            <MenuItem
                icon={<i className="fa-solid fa-unlock"></i>}
                onClick={handleShow}
            >
                Change Password
            </MenuItem>

            <Modal show={show} onHide={handleClose} centered size='lg'>

                <Modal.Body>
                    <div className='w-75 m-auto'>
                        <div className='bg-white rounded'>
                            <div className="logo-cont  text-center p-4 my-3">
                                <img src={logo} alt="logo" className='w-100' />
                            </div>

                            <div className='mb-3'>
                                <h2 className=' fw-bold'>Change Your Password</h2>
                                <p className='text-muted'>Welcome Back! Please enter your details</p>
                            </div>

                            <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>

                                <PasswordInput
                                    register={register}
                                    errors={errors}
                                    name="oldPassword"
                                    placeholder="Old Password"
                                    validation={oldPasswordValidation}
                                />

                                <PasswordInput
                                    register={register}
                                    errors={errors}
                                    name="newPassword"
                                    placeholder="New Password"
                                    validation={PasswordValidation}
                                />

                                <PasswordInput
                                    register={register}
                                    errors={errors}
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    validation={ConfirmNewPasswordValidation(watch)}
                                />

                                <div className="form-group mt-5 mb-4">
                                    <button className="btn btn-success w-100" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <span className='m-2'>Loading... </span>
                                                <ClipLoader size={15} color={"#fff"} />
                                            </>
                                        ) : 'Change Password'}
                                    </button>
                                </div>
                            </Form>

                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ChangePassword;