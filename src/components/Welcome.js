import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import GoogleSigninImg from "../img/btn_google_signin_dark_pressed_web.png";
import logoImg from "../img/logo.png";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <main className="welcome">
      <h2>Welcome to Live Chat</h2>
      <img src={logoImg} alt="Live Chat Logo" />
      <p>Sign in with Google to interact with our bot.</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSigninImg}
          alt="Sign in with Google"
          type="button"
        />
      </button>
    </main>
  );
};

export default Welcome;
