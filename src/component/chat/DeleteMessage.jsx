import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { db, storage } from "../../firebase-config";

function DeleteMessage(props) {
  const [showBtnDel, setShowBtnDel] = useState(false);

  const delMessage = () => {
    const docRef = doc(db, "messages", props.idMessage);
    deleteDoc(docRef);
    delImageMessage();
  };

  const delImageMessage = () => {
    //file name show in storage.
    const filePath = `${props.idUser}/${props.idMessage}`;
    // create reference to file
    const imageRef = ref(storage, filePath);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully.");
      })
      .catch((error) => error.message);
  };

  console.log(props);

  return (
    <div>
      {!showBtnDel ? (
        <></>
      ) : (
        <button className="mr-3" onClick={delMessage}>
          Delete
        </button>
      )}

      <button className="px-3" onClick={() => setShowBtnDel((val) => !val)}>
        :
      </button>
      <div></div>
    </div>
  );
}

export default DeleteMessage;
