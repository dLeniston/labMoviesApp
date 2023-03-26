import React, { useState, useEffect } from "react";
import { supabaseClient } from "../utils/client";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
    const [user, setUser ] = useState();

    const signIn = () => {
        supabaseClient.auth.signInWithOAuth({
            provider: "google",
          });
    }

    return (
        <AuthContext.Provider 
            value={{
                user,
                signIn,
                //signOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;