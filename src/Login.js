import React, {useState} from 'react'
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import { useHistory } from 'react-router-dom';
import firebase from "firebase";
import "./Login.css"

function Login() {
    const [state, dispatch] = useStateValue();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithEmail = e => {
        e.preventDefault();
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(email.concat("@nbs.com"), password)
            .then((auth) => {
                console.log(auth);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: auth.user,
                })
            })
            .catch((error) => {
                alert(error.message);
            })
        }).catch(err => console.log(err))
    }


    const signInWithGoogle = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
                history.push('/')
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    const registerWithEmail = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email.concat("@nbs.com"), password)
            .then((auth) => {
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))

    }

    return (
        <div className="login">
            <img
                className="login__logo"
                src="https://files.slack.com/files-pri/TN44SBSKE-F01ATQ9K0NA/l5-face_profile.jpg"
                alt="BTM logo"
            />
            
            <div className="login__container">
                <h2>Đăng nhập</h2>
                <form action="">
                    <h5>Tên đăng nhập</h5>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <h5>Mật khẩu</h5>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={signInWithEmail}  className='login__signInButton'>Đăng nhập</button>
                </form>

                {/* <button type="submit" onClick={signInWithGoogle} className='login__signInButton'>Đăng nhập với Google</button> */}

                <p>
                    By continuing, you agree to NBS's Conditions of Use and Privacy Notice.
                </p>
                <button onClick={registerWithEmail} className='login__registerButton'>Tạo tài khoản</button>
                
            </div>
            
        </div>    )
}

export default Login
