import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export const logout = async (setUser) => {
  await signOut(auth);
  setUser(null);
};