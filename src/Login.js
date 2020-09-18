import React from 'react'
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import db from "./firebase";
import "./Login.css"

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://vectorlogo4u.com/wp-content/uploads/2019/06/facebook-icon-2019-logo-720x340.png" alt="" />
                <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="" />
            </div>
            <Button type="submit" onClick={signIn}>Sign in with Google</Button>
        </div>    )
}

export default Login
