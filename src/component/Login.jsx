import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Login() {
  const [currentUser, setCurrentUser] = useState([]);
  const [showUser, setShowUser] = useState(false);

  //Sign in Redirect
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //Sign out
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        //Sign-out Successful.
        console.log(auth);
      })
      .catch((error) => {
        console.log("Sign out error : ", error);
      });
  };

  //Get a user's profile (When log it shows 2 times)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setShowUser(true);
      } else {
        console.log("User is null");
        setShowUser(false);
      }
    });
  }, []);

  //console.log(currentUser);

  return (
    <div>
      <div>
        {!showUser ? (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              alt="avatar"
              className="w-14 h-14"
            />
            {(currentUser.displayName = "NULL")}
          </>
        ) : (
          <>
            <img
              src={currentUser.photoURL}
              alt="avatar"
              className="w-14 h-14 rounded-full"
            />
            {currentUser.displayName}
          </>
        )}
      </div>
      <div>
        <button className="bg-sky-500" onClick={signInWithGoogle}>
          Sign In
        </button>
        <button className="bg-orange-600" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Login;
