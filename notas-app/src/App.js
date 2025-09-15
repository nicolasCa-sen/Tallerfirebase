import React, { useState } from "react";
import Login from "./components/login";
import Notas from "./components/Notas";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>📒 Mini App de Notas</h1>
      {!user ? <Login setUser={setUser} /> : <Notas user={user} />}
    </div>
  );
}

export default App;
