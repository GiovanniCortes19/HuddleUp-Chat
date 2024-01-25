import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from './ChatMessage';

// CHAT-ROOM COMPONENT
const ChatRoom = ({ auth, firestore }) => {
  // reference firestore collection
  const messagesRef = collection(firestore, 'messages');

  // query instructions instance
  const queRy = query(messagesRef, orderBy('createdAt'), limit(500));

  // get messages data from the firestore
  const [messages] = useCollectionData(queRy, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  // Send Message to the chat database
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;

    await addDoc(messagesRef, {
      name: displayName,
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    setFormValue('');
  };

  return (
    <>
      <p className="chatRoom-title">✆</p>

      {/* Display of messages feed */}
      <div className="messageDisplay">
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={auth} />
          ))}
      </div>

      {/* Input field to write a message */}
      <form className="messageForm" onSubmit={sendMessage}>
        <input
          className="messageInput"
          value={formValue}
          onChange={(event) => setFormValue(event.target.value)}
          type="text"
          placeholder="Hi there..."
        />
        <button className="formBtn" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

ChatRoom.propTypes = {};

export default ChatRoom;
