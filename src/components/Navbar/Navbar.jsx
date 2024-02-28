import {useState} from "react";
import "./Navbar.style.scss";

import {useUserAuth} from "../../context/AuthContext";
import Account from "../Account/Account";

const Navbar = () => {
    const {googleSignIn, user} = useUserAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="nav-container">
            <div className="app-name">
                <a href="/">Weather forecast</a>
            </div>
            <div className="user-logo" onClick={handleModalOpen}>
                {user ? (
                    <img src={user?.photoURL} alt="User" className="user-image" />
                ) : (
                    <button onClick={handleGoogleSignIn}>Sign in</button>
                )}
                {isModalOpen && user && (
                    <Account
                        isModalOpen={isModalOpen}
                        handleModalClose={handleModalClose}
                        handleModalOpen={handleModalOpen}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
