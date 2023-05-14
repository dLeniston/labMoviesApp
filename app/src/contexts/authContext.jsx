import React, { useState, useEffect } from "react";
import { supabaseClient } from "../utils/client";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = React.createContext(null);

const AuthContextProvider = (props) => {
    const [session, setSession ] = useState(null);

      useEffect(() => {
        const session = supabaseClient.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        });
    
        setSession(session)
        const { subscription } = supabaseClient.auth.onAuthStateChange(
          async (_event, session) => {
            setSession(session)
          }
        )
        return () => {
          subscription?.unsubscribe()
        }
      }, []);

    const signIn = () => {
        supabaseClient.auth.signInWithOAuth({
            provider: "google",
          });
    }

    const signOut = () => {
      supabaseClient.auth.signOut(), session
    }

    const register = async (email, password, firstName, lastName, profileImg) => {
      const result = await signup(email, password, firstName, lastName, profileImg);
      console.log(result.code);
      return (result.code == 201) ? true : false;
    };

    return (
        <AuthContext.Provider 
            value={{
                session,
                signIn,
                signOut,
                register,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;