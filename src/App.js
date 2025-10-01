import React, { useState, useEffect } from "react";
import Login from "./components/login";
import Notas from "./components/Notas";
import { auth } from "./firebase";
import WeatherTable from "./components/weather";
import { logout } from "./authUtils";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>📒 Mini App de Notas</h1>
      <WeatherTable />
    </div>
  );
}

export default App;
