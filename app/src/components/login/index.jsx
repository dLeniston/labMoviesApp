import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import Spinner from '../spinner'

const Login = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.signIn();
  }, []);

  return (
    <Spinner />
  );
};

export default Login;