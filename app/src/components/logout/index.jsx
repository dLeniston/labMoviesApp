import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Spinner from '../spinner'

const SignOut = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.signOut();
    navigate("/", {replace: true});
  }, []);

  return (
    <Spinner />
  );
};

export default SignOut;