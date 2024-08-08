export const EmailValidation = {
    required: "email is required",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "email is not valid",
    },
}

export const LoginPasswordValidation = {
    required: "password is required",
}

export const PasswordValidation = {
    required: "Password is required",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
};

export const ConfirmPasswordValidation = (watch) => ({
    required: "Confirm password is required",
    validate: value => value === watch('password') || 'Passwords do not match',
});