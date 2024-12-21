import React from "react";

const HomePage = ({ user, logout }) => {
    return (
        <>
            <div>Home Page</div>
            <button onClick={() => logout()} title="logout"/>
        </>
    )
}

export { HomePage }