import { useState } from 'react'
import './App.css'

// New Firebase Imports
import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore'

// Firebase Hooks
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

// Firebase project configuration
firebase.initializeApp({
  apiKey: "AIzaSyBp5QdKwkon53jA3FAMDBhXfx1A7e46uwI",
  authDomain: "huddleup-chat.firebaseapp.com",
  projectId: "huddleup-chat",
  storageBucket: "huddleup-chat.appspot.com",
  messagingSenderId: "100997670425",
  appId: "1:100997670425:web:afa70f4e99f3fbd217ac88",
  measurementId: "G-ZKE09385WR"
})

// REFERECE FIREBASE SDK
const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      <div>
        <h1>Huddle Up</h1>
      </div>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
      <section>
        <ChatRoom />
      </section>

    </>
  )
}

// SIGN-IN COMPONENT
function SignIn(){

  const signInWithGoogle = () => { 
      const provider = new firebase.auth.GoogleAuthProvider(); // provider for google auth
      auth.signInWithPopup(provider)
   }

  return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

// SIGN-OUT COMPONENT
function SignOut() {

  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}


// CHAT-ROOM COMPONENT
function ChatRoom() {
  const messagesRef = firestore.collection('messages'); // reference firestore collection
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'}) // listen to the data

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e)=>{
    e.preventDefault();
    const {uid} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    })

    setFormValue('')
  }


return (
  <>
      <h1>Messages</h1>
      <div>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}
      </div>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(event)=> setFormValue(event.target.value)} type="text" />
        <button type='submit'>Send</button>

      </form>
  </>
)
}

// MESSAGE COMPONENT
function ChatMessage(props) {
  const { text, uid } = props.message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

return (
  <div className={`message ${messageClass}`}>
    <p>{text}</p>
  </div>
)
}

export default App
