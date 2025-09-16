import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";

function Notas({ user }) {
  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "notas"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const agregarNota = async () => {
    if (!texto.trim()) return;
    await addDoc(collection(db, "notas"), {
      texto,
      userId: user.uid,
      creado: new Date()
    });
    setTexto("");
  };

  const editarNota = async (id, nuevoTexto) => {
    await updateDoc(doc(db, "notas", id), { texto: nuevoTexto });
  };

  const eliminarNota = async (id) => {
    await deleteDoc(doc(db, "notas", id));
  };

  return (
    <div className="notas-container">
      <h2>Mis Notas</h2>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={agregarNota}>Agregar</button>
      <ul>
        {notas.map((n) => (
          <li key={n.id}>
            <input
              type="text"
              defaultValue={n.texto}
              onBlur={(e) => editarNota(n.id, e.target.value)}
            />
            <button onClick={() => eliminarNota(n.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notas;
