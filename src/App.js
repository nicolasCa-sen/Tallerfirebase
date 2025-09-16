import React, { useState } from "react";
import Login from "./components/login";
import Notas from "./components/Notas";
import { logout } from "./authUtils";


function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>📒 Mini App de Notas</h1>
      {!user ? <Login setUser={setUser} /> : <Notas user={user} />}
      <div>
        {user && <button onClick={() => logout(setUser)}>Logout</button>}
      </div>
    </div>
  );
}

export default App;
