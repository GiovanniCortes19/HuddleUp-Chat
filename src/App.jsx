import { useState, useRef, useEffect } from 'react';
import './App.css';

// Firebase Imports
import { initializeApp } from 'firebase/app';

// Firebase Auth
import { getAuth } from 'firebase/auth';

// Firebase Store
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Firebase Analytics
import { getAnalytics } from 'firebase/analytics';

// Firebase Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Firebase project configuration
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBp5QdKwkon53jA3FAMDBhXfx1A7e46uwI',
  authDomain: 'huddleup-chat.firebaseapp.com',
  projectId: 'huddleup-chat',
  storageBucket: 'huddleup-chat.appspot.com',
  messagingSenderId: '100997670425',
  appId: '1:100997670425:web:afa70f4e99f3fbd217ac88',
  measurementId: 'G-ZKE09385WR',
});

// REFERECE FIREBASE SDK
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

// COMPONENTS
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

// APP COMPONENT
function App() {
  const [user] = useAuthState(auth);

  const scrollContainer = useRef(null);

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <>
      <nav className="navBar">
        <h1 className="title">✆ HuddleUp</h1>
        {user ? (
          <SignOut auth={auth} />
        ) : (
          <div className="signInOptions">
            <p>Sign In with:</p>
            <SignIn authMethod={'google'} auth={auth} />
            <SignIn authMethod={'github'} auth={auth} />
          </div>
        )}
      </nav>

      <section ref={scrollContainer} id="scrollContainer">
        {user ? <ChatRoom /> : <p className="getStarted-msg">Get Started</p>}
      </section>
    </>
  );
}

// CHAT-ROOM COMPONENT
function ChatRoom() {
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
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
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
}

// MESSAGE COMPONENT
function ChatMessage(props) {
  const { text, uid, name } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message${messageClass} bubble`}>
      <p className="username">{name}</p>
      <p className={`messageText ${messageClass}`}>{text}</p>
    </div>
  );
}

export default App;
