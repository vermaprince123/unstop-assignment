import React, { use } from "react";
import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = ({user, login}) => {
    return(
        <LoginForm user={user} login={login} />
    )
}

export {LoginPage};
