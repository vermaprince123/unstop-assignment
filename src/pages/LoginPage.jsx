import React, { use } from "react";
import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";

import './LoginPage.css'
import SideImage from "../assets/icons/sideImage";

const LoginPage = ({ user, login }) => {
    return (
        <div className="login-page">
            <div className="side-image-container">
                <SideImage className="side-image"/>
            </div>
            <LoginForm user={user} login={login} className="login-form-container" />
        </div>
    )
}

export { LoginPage };
