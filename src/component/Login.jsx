import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Login() {
  const [currentUser, setCurrentUser] = useState([]);

  //Sign in Redirect
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //Sign out
  const signOut = () => {
    signOut(getAuth());
  };

  //Get a user's profile (When log it shows 2 times)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("User is null");
      }
    });
  }, []);

  console.log(currentUser);

  return (
    <div>
      <div>
        <img src={currentUser.photoURL} alt="avatar" />
        {currentUser.displayName}
      </div>
      <div>
        <button className="bg-sky-500" onClick={signInWithGoogle}>
          Sign In
        </button>
        <button className="bg-orange-600" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Login;
