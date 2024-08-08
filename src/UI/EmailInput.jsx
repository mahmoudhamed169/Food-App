import React from 'react';

const EmailInput = ({ register, errors, validation }) => {
    return (
        <div className='mb-3'>
            <div className="input-group">
                <span className="input-group-text border-0" id="basic-addon1">
                    <i className="fa-solid fa-envelope h-75 pt-1"></i>
                </span>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your E-mail"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    {...register("email", validation)}
                />
            </div>
            {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
            )}
        </div>
    );
};

export default EmailInput;
