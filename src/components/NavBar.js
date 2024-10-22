import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import GoogleSigninImg from "../img/btn_google_signin_dark_pressed_web.png";

const NavBar = () => {
  // useAuthState hook - which returns an array with the current user as first element
  const [user] = useAuthState(auth);

  // Google Sign-in function
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider(); // Creates new Google auth provider
    try {
      signInWithPopup(auth, provider); // Opens Google sign-in popup
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Google Sign-out function
  const signOut = () => {
    try {
      auth.signOut(); // Signs out the current user
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="nav-bar">
      <h1>Live Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSigninImg}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
