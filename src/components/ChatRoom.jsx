import React from 'react'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// // REFERECE FIREBASE SDK
// const auth = firebase.auth();
// const firestore = firebase.firestore();

function ChatRoom() {
    // reference a firestore collection in the firestore database
    const messagesRef = new firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    // listen to the data
    const [messages] = useCollectionData(query, {idField: 'id'})

  return (
    <>
        <div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}
        </div>

        <div>

        </div>
    </>
  )
}

// ChatMessage Component
function ChatMessage(props) {
    const {text, uid} = props.message

  return (
    <p>{text}</p>
  )
}

export default ChatRoom