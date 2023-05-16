import React, { useState } from "react";
import { login, signup, getUser } from "../api/tmdb-api";

export const AuthContext = React.createContext(null);

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ authToken, setAuthToken ] = useState(existingToken);
    const [ email, setEmail ] = useState("");
    const [ user, setUser ] = useState({});

    const setToken = (data) => {
      localStorage.setItem("token", data);
      setAuthToken(data);
    };
  
    const authenticate = async (email, password) => {
      const result = await login(email, password);
      if (result.token) {
        setToken(result.token)
        setIsAuthenticated(true);
        setEmail(email);
        const user = await getUser(email);
        setUser(user);
      }
    };

    const register = async (email, password, firstName, lastName, profileImg) => {
      const result = await signup(email, password, firstName, lastName, profileImg);
      return (result.code == 201) ? true : false;
    };

    const signOut = () => {
      setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                user,
                authenticate,
                signOut,
                register,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;