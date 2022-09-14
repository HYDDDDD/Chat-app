import { onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { currentMessageQuery } from "../../firebase-collections";


function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  },[]);

  const loadUsers = () => {
    
  }

  return (
    <div className="flex h-screen">
      <div className="bg-amber-500 float-right w-40 h-screen py-4 px-3 overflow-y-hidden dark:bg-gray-800">
        <h3 className="text-center">Users</h3>
      </div>
    </div>
  );
}

export default User;
