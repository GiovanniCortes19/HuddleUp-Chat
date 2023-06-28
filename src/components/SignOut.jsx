import React from 'react'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// // REFERECE FIREBASE SDK
// const auth = firebase.auth();
// const firestore = firebase.firestore();

function SignOut() {


  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

export default SignOut