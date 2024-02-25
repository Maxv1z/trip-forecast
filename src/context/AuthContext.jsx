import {useContext, createContext, useEffect, useState} from "react";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithRedirect,
    signInWithPopup,
} from "firebase/auth";
import {auth} from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(result.user));
        });
    };

    const logOut = () => {
        signOut(auth).then(() => {
            // Remove user data from localStorage
            localStorage.removeItem("user");
            // Refresh the window
            window.location.reload();
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // If user data is available in localStorage, set the user state
            setUser(JSON.parse(storedUser));
        } else {
            // If user data is not available in localStorage, set up the listener
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    // Save user data to localStorage
                    localStorage.setItem("user", JSON.stringify(currentUser));
                } else {
                    // Try to log in user if not available in localStorage
                    signInWithRedirect(auth, new GoogleAuthProvider());
                }
            });
            return () => {
                unsubscribe();
            };
        }
    }, []);

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
