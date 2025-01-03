import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import './LoginForm.css';

import {
  getUsernameValidation,
  getEmailValidation,
  getPasswordValidation,
} from '../../utils/validation';
import { redirect } from 'react-router-dom';
import GoogleIcon from '../../assets/icons/googleIcon';
import FacebookIcon from '../../assets/icons/facebookIcon';
import UserIcon from '../../assets/icons/userIcon';
import KeyIcon from '../../assets/icons/keyIcon';
import MailIcon from '../../assets/icons/mailIcon';
import { SocialLoginButton } from '../Shared/SocialLoginButton';

const LoginForm = ({ user, login }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const usernameIsValid = validateAndSetState(
      username,
      setUsername,
      setUsernameError,
      getUsernameValidation
    );
    const emailIsValid = validateAndSetState(
      email,
      setEmail,
      setEmailError,
      getEmailValidation
    );
    const passwordIsValid = validateAndSetState(
      password,
      setPassword,
      setPasswordError,
      getPasswordValidation
    );

    if (usernameIsValid && emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const loggedIn = await login({ username, email, password });
        if (loggedIn) redirect("/home");

        console.log(username, email, password);
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  const validateAndSetState = (value, setValue, setError, validationFunction) => {
    const validationResult = validationFunction(value);
    setError(validationResult.message);
    setValue(value);
    return validationResult.isValid;
  };

  return (
    <div className="login-form-container">
      <div className="form-heading">Welcome to <span className="form-unstop-heading">Unstop</span></div>
      <SocialLoginButton socialMediaName="Google" SocialIcon={<GoogleIcon />}/>
      <SocialLoginButton socialMediaName="Facebook" SocialIcon={<FacebookIcon />}/>
      <div className="login-form-or-line">
        <div className="or-option-text">OR</div>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => validateAndSetState(e.target.value, setUsername, setUsernameError, getUsernameValidation)}
          errorMessage={usernameError}
          icon={<UserIcon />}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => validateAndSetState(e.target.value, setEmail, setEmailError, getEmailValidation)}
          errorMessage={emailError}
          icon={<MailIcon />}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => validateAndSetState(e.target.value, setPassword, setPasswordError, getPasswordValidation)}
          errorMessage={passwordError}
          icon={<KeyIcon />}
        />
        <button
          type="submit"
          disabled={usernameError || emailError || passwordError}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;