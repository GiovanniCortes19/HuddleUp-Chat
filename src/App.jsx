import { useRef, useEffect } from 'react';
import './App.css';

// Firebase Imports
import { initializeApp } from 'firebase/app';

// Firebase Auth
import { getAuth } from 'firebase/auth';

// Firebase Store
import { getFirestore } from 'firebase/firestore';

// Firebase Hooks
import { useAuthState } from 'react-firebase-hooks/auth';

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

// Firebase Analytics
// import { getAnalytics } from 'firebase/analytics';
// const analytics = getAnalytics(firebaseApp);

// Initialize Auth instance and Firestore
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// COMPONENTS
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatRoom from './components/ChatRoom';

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
        {user ? (
          <ChatRoom auth={auth} firestore={firestore} />
        ) : (
          <p className="getStarted-msg">Get Started</p>
        )}
      </section>
    </>
  );
}

export default App;
