import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase-config";

export const collectionMessagesRef = collection(db, "messages");
export const currentMessageQuery = query(
  collectionMessagesRef,
  orderBy("timestamp", "asc"),
  limit(12)
);
