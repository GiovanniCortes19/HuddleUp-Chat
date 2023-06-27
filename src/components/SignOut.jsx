import React from 'react'
import firebase from 'firebase'
import 'firebase/firestore' // database
import 'firebase/auth'      // user authentication

// REFERECE FIREBASE SDK
const auth = firebase.auth();
const firestore = firebase.firestore();

function SignOut() {


  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

export default SignOut