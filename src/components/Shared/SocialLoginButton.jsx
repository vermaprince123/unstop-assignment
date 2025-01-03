import React from "react";

import './SocialLoginButton.css'

const SocialLoginButton = ({socialMediaName, SocialIcon}) => {
    return(
        <button className="social-login-button">
            <div>
                {SocialIcon}
            </div>
            <span className="social-login-button-text">Login with {socialMediaName}</span>
        </button>
    )
}

export {SocialLoginButton}