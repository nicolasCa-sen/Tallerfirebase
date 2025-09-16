import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Notas({ user }) {
  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (!user) return;
    // Referencia a la subcolección de notas del usuario
    const notasCollectionRef = collection(db, "users", user.uid, "notas");
    const q = query(notasCollectionRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const agregarNota = async () => {
    if (!texto.trim()) return;
    // Agrega la nota a la subcolección
    await addDoc(collection(db, "users", user.uid, "notas"), {
      texto,
      creado: new Date(),
    });
    setTexto("");
  };

  const editarNota = async (id, nuevoTexto) => {
    // Edita la nota en la subcolección
    await updateDoc(doc(db, "users", user.uid, "notas", id), {
      texto: nuevoTexto,
    });
  };

  const eliminarNota = async (id) => {
    // Elimina la nota de la subcolección
    await deleteDoc(doc(db, "users", user.uid, "notas", id));
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