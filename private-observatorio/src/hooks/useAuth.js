//IMPORTS DE REACT:
import { useContext } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { AuthContext } from "../context";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:


export const useAuth = () => useContext(AuthContext);