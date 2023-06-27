import { useState } from 'react'
import './App.css'
import firebase from 'firebase'
import 'firebase/firestore' // database
import 'firebase/auth'      // user authentication

// Components
import SignIn from './components/SignIn'
import ChatRoom from './components/ChatRoom'
import SignOut from './components/SignOut'

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

  // User LogIn / LogOut
  const [user] = useAuthState()

  return (
    <>
      <div>
        <h1>Huddle Up</h1>
      </div>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </>
  )
}

export default App
