import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// SendMessage Component which receieves "scroll" prop
const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState(""); // State for message input

  const sendMessage = async (event) => {
    event.preventDefault(); // Prevent form submission refresh

    // Validate/check message isn't empty
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    // Get current user data from Firebase Auth
    const { uid, displayName, photoURL } = auth.currentUser;

    // Add new message to Firestore
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createAt: serverTimestamp(), // Server-side timestamp
      uid,
    });

    // Reset input and scroll to bottom
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
