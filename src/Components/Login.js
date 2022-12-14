import React from "react";
import { useNavigate } from "react-router-dom";
import db, { auth, googleProvider } from "../firebase";
import "./Login.css";
function Login({ setUser }) {
  const navigate = useNavigate();

  const signWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        navigate("/");
        setUser(newUser);
        localStorage.setItem('user',JSON.stringify(newUser))
        db.collection("users").doc(result.user.email).set(newUser);
      })

      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login-container">
        <img
          className="login-logo"
          src="./whatsapp-logo.png"
          alt="whatappIcon"
        />
        <p className="login-name">Whatsapp Web</p>
        <button className="login-btn" onClick={signWithGoogle}>
          <img src="./google-logo.png" alt="login with google" />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;