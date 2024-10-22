import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Message component which receives "message" prop
const Message = ({ message }) => {
  const [user] = useAuthState(auth); // Get current user state

  // Format timestamp function
  const formatTimeStamp = (timestamp) => {
    if (!timestamp) return "";

    // If timestamp is a Firebase Timestamp, Convert to JS Date
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }

    // If timestamp is already a number (milliseconds)
    if (typeof timestamp === "number") {
      return new Date(timestamp).toLocaleString();
    }

    return "";
  };

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="User Avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        <span className="timestamp">{formatTimeStamp(message.createAt)}</span>
      </div>
    </div>
  );
};

export default Message;
