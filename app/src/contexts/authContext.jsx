import React, { useState, useEffect } from "react";
import { supabaseClient } from "../utils/client";

export const AuthContext = React.createContext(null);

const AuthContextProvider = (props) => {
    const [session, setSession ] = useState(null);

    /* useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        });

        supabaseClient.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, []);*/

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

    return (
        <AuthContext.Provider 
            value={{
                session,
                signIn,
                signOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;