import React from "react";
import { useState } from "react";
import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { collectionMessagesRef } from "../../firebase-collections";
import Picker from "emoji-picker-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase-config";

function AddMessage(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showSelectFile, setShowSelectFile] = useState(false);
  const [imageUpload, setImageUpload] = useState();

  const onEmojiClick = (emojiObject) => {
    setCurrentMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  // Saves a new message to Cloud Firestore.
  const saveMessage = async () => {
    //Add a new message entry to the Firebase database.
    if (currentMessage !== "") {
      try {
        await addDoc(collectionMessagesRef, {
          id: props.currentUser.uid,
          name: props.currentUser.displayName,
          imageUrl: null,
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

  const saveImageMessage = async () => {
    if (imageUpload !== null || imageUpload !== undefined) {
      try {
        //add message
        const messageRef = await addDoc(collectionMessagesRef, {
          id: props.currentUser.uid,
          name: props.currentUser.displayName,
          imageUrl: null,
          profilePicUrl: props.currentUser.photoURL,
          timestamp: serverTimestamp(),
        });

        //file name show in storage.
        const filePath = `${props.currentUser.uid}/${messageRef.id}`;
        // create reference to file
        const imageRef = ref(storage, filePath);
        //upload file and metadata.
        const fileSnapshot = await uploadBytesResumable(imageRef, imageUpload);

        const publicImageUrl = await getDownloadURL(imageRef);
        await updateDoc(messageRef, {
          imageUrl: publicImageUrl,
          storageUrl: fileSnapshot.metadata.fullPath,
        });

        setImageUpload();
        setShowSelectFile(false);
      } catch (error) {
        console.error(
          "There was an error uploading a file to Cloud Storage:",
          error
        );
      }
    }
  };

  return (
    <div>
      <div className="w-full flex bottom-0">
        <div className="flex space-x-1">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowPicker((val) => !val)}
          >
            😊
          </button>
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowSelectFile((val) => !val)}
          >
            ➕
          </button>
        </div>
        <input
          type="text"
          placeholder="Hey..."
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && saveMessage();
          }}
        />
        {/* <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={saveMessage}
        >
          ✔
        </button> */}
        {showSelectFile ? (
          <>
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={saveImageMessage}
            >
              ✔
            </button>
          </>
        ) : (
          <>
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={saveMessage}
            >
              ✔
            </button>
          </>
        )}
      </div>
      {showPicker && (
        <Picker
          pickerStyle={{ width: "100%", height: "400px" }}
          onEmojiClick={onEmojiClick}
        />
      )}
      {showSelectFile ? (
        <>
          <input type={"file"} onChange={handleImageChange} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddMessage;
