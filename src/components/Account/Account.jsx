import React, {useRef, useEffect} from "react";
import {MdClose} from "react-icons/md";
import "./Account.style.scss";
import {useUserAuth} from "../../context/AuthContext";

const Account = ({isModalOpen, handleModalClose, handleModalOpen}) => {
    const {user, logOut} = useUserAuth();
    const accountRef = useRef(null);

    const handleSingOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    //// useEffect to make modal close when click outside of it
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                handleModalClose();
            }
        };
        if (isModalOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isModalOpen, handleModalClose]);

    return (
        <div className={`modal-account ${isModalOpen ? "open" : ""}`}>
            <div className="overlay-account">
                <div
                    className="modal-content-account"
                    onClick={handleModalClick}
                    ref={accountRef}
                >
                    <div className="top-div-account">
                        <h3>Your account</h3>
                        <MdClose onClick={handleModalClose} id="close-button" />
                    </div>
                    <div className="account-info">
                        <img src={user.photoURL} alt="" />
                        <p>
                            Account username: <b>{user.displayName}</b>
                        </p>
                        <p>
                            Account email: <b>{user.email}</b>
                        </p>
                    </div>
                    <button onClick={handleSingOut} id="sign-out">
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
