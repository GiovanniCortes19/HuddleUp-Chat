import { useState, useRef, useEffect } from 'react'
import './App.css'

// New Firebase Imports
import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
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


// APP COMPONENT
function App() {
  const [user] = useAuthState(auth)

  const scrollContainer = useRef(null)

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  return (
    <>
      <nav className='navBar'>
        <h1 className='title'>✆ HuddleUp</h1>
        {user ? <SignOut/> : <div className='signInOptions'><p>Sign In with:</p><SignIn/><GitHubSignIn/></div>}
      </nav>

      <section ref={scrollContainer} id='scrollContainer'>
        {user ? <ChatRoom /> : <p className='getStarted-msg'>Get Started</p>}
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

// GITHUB-SIGNIN COMPONENT
function GitHubSignIn(){
  const signInWithGitHub = () => { 
    const provider = new GithubAuthProvider(); // provider for github auth
    signInWithPopup(auth, provider)
   }

  return (
    <button className='sign-in signBtn' onClick={signInWithGitHub}>GitHub</button>
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
  const queRy = query(messagesRef, orderBy('createdAt'), limit(500));

  const [messages] = useCollectionData(queRy, {idField: 'id'}) // listen to the data

  const [formValue, setFormValue] = useState('')

  // Send Message to the chat database
  const sendMessage = async (e)=>{
    e.preventDefault();
    const {uid, displayName} = auth.currentUser;

    await addDoc(messagesRef, {
      name: displayName,
      text: formValue,
      createdAt: serverTimestamp(),
      uid
    })

    setFormValue('')
  }

return (
  <>
      <p className='chatRoom-title'>✆</p>

      <div  className='messageDisplay'>
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
  const { text, uid, name } = props.message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

return (
  <div className={`message${messageClass} bubble`}>
    <p className='username'>{name}</p>
    <p className={`messageText ${messageClass}`}>{text}</p>
  </div>
)
}

export default App
