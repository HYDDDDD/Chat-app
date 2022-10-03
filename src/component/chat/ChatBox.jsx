import React from "react";
import { onSnapshot } from "firebase/firestore";
import { currentMessageQuery } from "../../firebase-collections";
import { useEffect } from "react";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import AddMessage from "./AddMessage";
import DeleteMessage from "./DeleteMessage";

function ChatBox(props) {
  const [MessageList, setMessageList] = useState([]);
  const [showBtnMore, setShowBtnMore] = useState(false);
  const [idText, setIdText] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  //load messages
  const loadMessages = () => {
    onSnapshot(currentMessageQuery, (response) => {
      setMessageList(
        response.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  return (
    <div className="w-full h-screen ">
      {!props.statusSignIn ? (
        <ScrollToBottom className="w-full h-full overflow-x-hidden"></ScrollToBottom>
      ) : (
        <ScrollToBottom className="w-full h-full overflow-x-hidden bg-slate-600">
          {MessageList.map((doc) => {
            // You
            if (props.currentUser.uid === doc.data.id) {
              return (
                <div key={doc.id} className="flex items-center justify-end">
                  {idText === doc.id ? (
                    <DeleteMessage idMessage={doc.id} idUser={props.currentUser.uid}/>
                  ) : (
                    <></>
                  )}

                  <div
                    className="space-x-2 mt-4 pr-2 rounded-xl w-16 p-1 "
                    id="you"
                  >
                    <button
                      className="text-start text-sm break-all font-semibold p-1"
                      onClick={() => setIdText(doc.id)}
                      // onClick={() => setShowBtnMore((val) => !val)}
                    >
                      <div className="text-black text-sm">{doc.data.name}</div>
                      {doc.data.text}
                      <img src={doc.data.imageUrl} alt="" />
                    </button>
                  </div>
                </div>
              );

              // Other
            } else {
              return (
                <div key={doc.id} className="flex items-center justify-start">
                  <div
                    className="space-x-2 mt-4 pr-2 rounded-xl w-16 p-1 "
                    id="other"
                  >
                    <button className="text-start text-sm break-all font-semibold p-1">
                      <div className="text-black text-sm">{doc.data.name}</div>
                      {doc.data.text}
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </ScrollToBottom>
      )}
      <AddMessage currentUser={props.currentUser} />
    </div>
  );
}

export default ChatBox;
