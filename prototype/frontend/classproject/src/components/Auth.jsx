import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = (props) => {
    const [displaySignIn, setDisplaySignin] = useState(true);
    const toggleSignIn = () => {
        setDisplaySignin(prev => !prev);
    }

    return(
        <>
        {displaySignIn ? <SignIn goToSignUp={toggleSignIn} success={props.signinSuccess}></SignIn> : <SignUp goToSignIn={toggleSignIn} success={props.signinSuccess}></SignUp>}
        </>
    )
}

export default Auth;