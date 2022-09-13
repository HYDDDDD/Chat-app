import React from "react";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import AddMessage from "./AddMessage";

function ChatBox(props) {
  const [showMenuUsers, setShowMenuUsers] = useState(false);
  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="bg-slate-200 w-full mr-auto">
        {/* <button onClick={() => setShowMenuUsers((val) => !val)}>
          <FontAwesomeIcon icon={faBars} className="p-2" />
          =
        </button> */}
      </div>
      <ScrollToBottom className="w-full h-full overflow-x-hidden">
        ChatBox
      </ScrollToBottom>
      <AddMessage currentUser={props.currentUser}/>
    </div>
  );
}

export default ChatBox;
