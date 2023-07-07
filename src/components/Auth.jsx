import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-auth">
      {auth.currentUser ? (
        <>
          <img src={auth.currentUser.photoURL} alt="" />
          <p>{auth.currentUser.displayName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        </>
      )}
    </div>
  );
};
