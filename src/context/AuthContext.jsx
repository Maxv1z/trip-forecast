import {useContext, createContext, useEffect, useState} from "react";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithRedirect,
    getRedirectResult,
} from "firebase/auth";
import {auth} from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("user");
            setUser(null);
            window.location.reload();
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== null) {
            setUser(JSON.parse(storedUser));
        } else {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    localStorage.setItem("user", JSON.stringify(currentUser));
                } else {
                    // Redirect the user to sign in with Google if not authenticated
                    signInWithRedirect(auth, new GoogleAuthProvider());
                    // Check for redirect result
                    const userCred = await getRedirectResult(auth);
                    setUser(userCred.user);
                    localStorage.setItem("user", JSON.stringify(userCred.user));
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

// use context here instead of calling it in components
export const useUserAuth = () => {
    return useContext(AuthContext);
};
