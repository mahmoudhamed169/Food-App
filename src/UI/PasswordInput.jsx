import { useState } from 'react';

const PasswordInput = ({ register, errors, name, placeholder, validation }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='mb-3'>
            <div className="input-group">
                <span className="input-group-text border-0" id="basic-addon1">
                    <i className="fa-solid fa-lock h-75 pt-1"></i>
                </span>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder={placeholder}
                    aria-label={placeholder}
                    aria-describedby="basic-addon1"
                    {...register(name, validation)}
                />
                <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault() }}
                    onMouseUp={(e) => { e.preventDefault() }}
                    className="input-group-text border-0"
                    onClick={togglePasswordVisibility} id="basic-addon1">
                    <i className={`fa-regular ${showPassword ? 'fa-eye' : "fa-eye-slash"} border-0 p-0`} aria-hidden="true"></i>
                </button>
            </div>
            {errors[name] && (
                <span className="text-danger">{errors[name]?.message}</span>
            )}
        </div>
    );
};

export default PasswordInput;
