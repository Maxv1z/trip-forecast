import React from "react";
import "./Navbar.style.scss";

import {UserAuth} from "../../context/AuthContext";

const Navbar = () => {
    const {googleSignIn, user, logOut} = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSingOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="nav-container">
            <div className="app-name">Weather forecast</div>
            <div className="user-logo">
                {user?.displayName ? (
                    <button onClick={handleSingOut}>Logout, {user.displayName}</button>
                ) : (
                    <button onClick={handleGoogleSignIn}>Sign in</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
