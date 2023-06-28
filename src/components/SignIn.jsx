import React from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// // REFERECE FIREBASE SDK
// const auth = firebase.auth();
// const firestore = firebase.firestore();

function SignIn(){

    const signInWithGoogle = () => { 
        // provider for google auth
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
     }

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

export default SignIn
