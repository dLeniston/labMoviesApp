import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined)
    throw Error('useAuth must be used within AuthProvider')
  return context
}