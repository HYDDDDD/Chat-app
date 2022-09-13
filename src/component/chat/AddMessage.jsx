import React from "react";
import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { collectionMessagesRef } from "../../firebase-collections";

function AddMessage(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  // Saves a new message to Cloud Firestore.
  const saveMessage = async () => {
    //Add a new message entry to the Firebase database.
    if (currentMessage !== "") {
      try {
        await addDoc(collectionMessagesRef, {
          id: props.currentUser.uid,
          name: props.currentUser.displayName,
          text: currentMessage,
          profilePicUrl: props.currentUser.photoURL,
          timestamp: serverTimestamp(),
        });
        setCurrentMessage("");
      } catch (error) {
        console.error("Error writing new message to Firebase Database", error);
      }
    }
  };
  return (
    <div>
      <div className="w-full flex bottom-0 mt-1">
        <input
          type="text"
          placeholder="Hey..."
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2907/2907795.png"
            alt="icon-sendMessage"
            className="w-7 h-7 bg-green-200"
            onClick={saveMessage}
          />
        </button>
      </div>
    </div>
  );
}

export default AddMessage;
