import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEmail = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Persist session
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const registerEmail = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Persist session
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="notas-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginEmail}>Login</button>
      <button onClick={registerEmail}>Register</button>
    </div>
  );
}

export default Login;
