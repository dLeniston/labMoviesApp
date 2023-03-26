import React from "react";
import screenWatchersLogo from '/assets/screenwatchers.png';

const logo = {
    width: "80%",
    padding: "50px 0px 50px 100px"
};

const Logo = () => {
    return (
        <div><img style={logo} src={screenWatchersLogo} /></div>
    );
}

export default Logo;