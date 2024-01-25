import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Costumizable Component for Google or GitHub SignIn options

const SignIn = ({ authMethod, auth }) => {
  // sign in with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider(); // provider for google auth
    signInWithPopup(auth, provider);
  };

  // sign in with github
  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider(); // provider for github auth
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
