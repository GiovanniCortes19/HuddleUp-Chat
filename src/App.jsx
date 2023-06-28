import { useState } from 'react'
import './App.css'

// New Firebase Imports
import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore'
import {getAnalytics} from 'firebase/analytics'

// Firebase Hooks
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

// Firebase project configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBp5QdKwkon53jA3FAMDBhXfx1A7e46uwI",
  authDomain: "huddleup-chat.firebaseapp.com",
  projectId: "huddleup-chat",
  storageBucket: "huddleup-chat.appspot.com",
  messagingSenderId: "100997670425",
  appId: "1:100997670425:web:afa70f4e99f3fbd217ac88",
  measurementId: "G-ZKE09385WR"
})

// REFERECE FIREBASE SDK
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);


function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      <nav className='navBar'>
        <h1 className='title'>✆ HuddleUp</h1>
        {user ? <SignOut/> : <div className='signInOptions'><p>Sign In with:</p><SignIn/></div>}
      </nav>

      <section>
        {user ? <ChatRoom /> : <h2 className='getStarted-msg'>Get Started</h2>}
      </section>

    </>
  )
}

// SIGN-IN COMPONENT
function SignIn(){
  const signInWithGoogle = () => { 
      const provider = new GoogleAuthProvider(); // provider for google auth
      signInWithPopup(auth, provider)
   }

  return (
      <button className='sign-in signBtn' onClick={signInWithGoogle}>Google</button>
  )
}

// SIGN-OUT COMPONENT
function SignOut() {

  return auth.currentUser && (
    <button className='sign-out signBtn' onClick={()=> signOut(auth)}>Sign Out</button>
  )
}


// CHAT-ROOM COMPONENT
function ChatRoom() {
  const messagesRef = collection(firestore,'messages'); // reference firestore collection
  const queRy = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(queRy, {idField: 'id'}) // listen to the data

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e)=>{
    e.preventDefault();
    const {uid} = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid
    })

    setFormValue('')
  }

return (
  <>
      <p className='chatRoom-title'>✆</p>
      <div className='messageDisplay'>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}
      </div>

      <form className='messageForm' onSubmit={sendMessage}>

        <input className='messageInput' value={formValue} onChange={(event)=> setFormValue(event.target.value)} type="text" placeholder='Hi there...' />
        <button className='formBtn' type='submit'>Send</button>

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
    <p className='messageText'>{text}</p>
  </div>
)
}

export default App
