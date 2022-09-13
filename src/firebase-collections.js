import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const collectionMessagesRef = collection(db, "messages");