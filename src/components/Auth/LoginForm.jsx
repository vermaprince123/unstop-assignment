import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import './LoginForm.css';

import {
  getUsernameValidation,
  getEmailValidation,
  getPasswordValidation,
} from '../../utils/validation';
import { redirect } from 'react-router-dom';

const LoginForm = ({user, login}) => {
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
        const loggedIn = await login({username, email, password});
        if(loggedIn) redirect("/home");

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
    <form onSubmit={handleLogin} className="login-form">
      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => validateAndSetState(e.target.value, setUsername, setUsernameError, getUsernameValidation)}
        errorMessage={usernameError}
        icon={<i className="fa fa-user"></i>}
      />
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => validateAndSetState(e.target.value, setEmail, setEmailError, getEmailValidation)}
        errorMessage={emailError}
        icon={<i className="fa fa-envelope"></i>}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => validateAndSetState(e.target.value, setPassword, setPasswordError, getPasswordValidation)}
        errorMessage={passwordError}
        icon={<i className="fa fa-lock"></i>}
      />
      <button
        type="submit"
        disabled={usernameError || emailError || passwordError}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;