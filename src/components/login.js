import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const loginEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch {
      // si no existe, lo crea
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginEmail}>Login / Registro</button>
      <button onClick={loginGoogle}>Login con Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Login;
