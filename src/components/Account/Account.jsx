import React, {useRef} from "react";
import {MdClose} from "react-icons/md";
import "./Account.style.scss";
import {UserAuth} from "../../context/AuthContext";

const Account = ({isModalOpen, toggleModal, closeAccount}) => {
    const {user, logOut} = UserAuth();
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

    return (
        <div
            className={`modal-account ${isModalOpen ? "open" : ""}`}
            onClick={toggleModal}
        >
            <div className="overlay-account">
                <div
                    className="modal-content-account"
                    onClick={handleModalClick}
                    ref={accountRef}
                >
                    <div className="top-div-account">
                        <h3>Your account</h3>
                        <MdClose onClick={closeAccount} id="close-button" />
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
