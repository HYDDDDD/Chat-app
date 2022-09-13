import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../firebase-config";
import Login from "../Login";
import ChatBox from "./ChatBox";
import User from "./User";

function Chat() {
  //Current user
  const [currentUser, setCurrentUser] = useState([]);
  const [statusSignIn, setStatusSignIn] = useState(false);

  //Sign in Redirect.
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //Sign out
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        //Set data in currentUser = []
        setCurrentUser([]);
        console.log(auth);
      })
      .catch((error) => {
        console.log("Sign out error : ", error);
      });
  };

  //Status user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user signIn succeed.
        setCurrentUser(user);
        setStatusSignIn(true);
      } else {
        //User is not sign-in
        console.log("User is not sign-in");
        setStatusSignIn(false);
      }
    });
  });

  return (
    <div>
      <div className="bg-green-700 flex justify-between p-1">
        <div className="text-center text-4xl">Chat App</div>
        <div>
          <Login
            statusSignIn={statusSignIn}
            signInWithGoogle={signInWithGoogle}
            signOutUser={signOutUser}
            currentUser={currentUser}
          />
        </div>
      </div>
      <div className="flex">
        <User />
        <ChatBox currentUser={currentUser}/>
      </div>
    </div>
  );
}

export default Chat;
