import { getDocs, onSnapshot, query } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { currentMessageQuery } from "../../firebase-collections";
import AddMessage from "./AddMessage";

function ChatBox(props) {
  const [showMenuUsers, setShowMenuUsers] = useState(false);
  const [MessageList, setMessageList] = useState([]);

  useEffect(() => {
    //console.log(props.currentUser.uid);
    loadMessages();
  }, []);

  // console.log(props.currentUser.uid);

  // useEffect(() => {
  //   MessageList.map((doc) => {
  //     console.log("collection : ",doc.data.id);
  //   })
  // },[MessageList]);

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
    <div className="flex flex-col w-full h-screen ">
      <div className="bg-slate-200 w-full mr-auto">
        {/* <button onClick={() => setShowMenuUsers((val) => !val)}>
          <FontAwesomeIcon icon={faBars} className="p-2" />
          =
        </button> */}
      </div>
      <ScrollToBottom className="w-full h-full overflow-x-hidden">
        {/* Messages */}
        {MessageList.map((doc) => {
          return (
            <div
              key={doc.id}
              id={props.currentUser.uid === doc.data.id ? "you" : "other"}
            >
              <div>{doc.data.text}</div>
            </div>
          );
        })}
      </ScrollToBottom>
      <AddMessage currentUser={props.currentUser} />
    </div>
  );
}

export default ChatBox;
