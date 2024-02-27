// Navbar.js
import React, {useState, useEffect} from "react";
import "./Navbar.style.scss";
import {UserAuth} from "../../context/AuthContext";
import Account from "../Account/Account";

const Navbar = () => {
    const {googleSignIn, user, logOut} = UserAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <nav className="nav-container">
            <div className="app-name">
                <a href="/">Weather forecast</a>
            </div>
            <div className="user-logo" onClick={toggleModal}>
                {user ? (
                    <img src={user?.photoURL} alt="User" className="user-image" />
                ) : (
                    <button onClick={handleGoogleSignIn}>Sign in</button>
                )}
                {isModalOpen && user && (
                    <Account
                        isModalOpen={isModalOpen}
                        toggleModal={toggleModal}
                        closeAccount={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
