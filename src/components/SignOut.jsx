import { signOut } from 'firebase/auth';

// SIGN-OUT COMPONENT
function SignOut({ auth }) {
  return (
    auth.currentUser && (
      <button className="sign-out signBtn" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    )
  );
}

export default SignOut;
