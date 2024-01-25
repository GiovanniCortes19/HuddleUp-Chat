import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Costumizable Component for Google or GitHub SignIn options

const SignIn = ({ authMethod, auth }) => {
  // sign in with google
  const signInWithGoogle = () => {
    // provider for google auth
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // sign in with github
  const signInWithGitHub = () => {
    // provider for github auth
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button
      className="sign-in signBtn"
      onClick={authMethod === 'google' ? signInWithGoogle : signInWithGitHub}
    >
      {authMethod}
    </button>
  );
};

export default SignIn;
