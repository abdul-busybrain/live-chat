import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]); // Messages state
  const scroll = useRef(); // Reference to scroll functionality

  // useEffect hook to fetch and listen to messages
  useEffect(() => {
    // Create a query to fetch messages from Firebase
    const q = query(
      collection(db, "messages"), // Get messages collection
      orderBy("createAt", "desc"), // Order by creation time descending
      limit(50) // Limit to 50 messages
    );

    // Set up real-time listener using onSnapshot
    const unSubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];

      // Loop through each document in the snapshot
      QuerySnapshot.forEach((doc) => {
        // Add message data and document ID to array
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      // Sort messages by creation time
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );

      // Update state with sorted messages
      setMessages(sortedMessages);
    });

    // Cleanup function to unsubribe when component unmounts
    return () => unSubscribe;
  }, []); // Empty dependency array means this runs once on mount

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
