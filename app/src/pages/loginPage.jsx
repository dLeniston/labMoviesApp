import React from 'react';
import SignIn from "../components/cardIcons/signIn";

const LoginPage = () => {

    return (
        <div className="row flex flex-center">
          <div className="col-6 form-widget">
            <h1 className="header">ScreenWatchers</h1>
            <SignIn />
          </div>
        </div>
      )
}

export default LoginPage;