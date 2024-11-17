import React, { createContext , useEffect, useState } from 'react';


export const AuthContext = createContext();




export default function AuthProvider({ children }) {
    const [token, settoken] = useState(null) ; 
    useEffect(() => {
      const storedToken = localStorage.getItem('tkn');
      if (storedToken != null) {
        settoken(storedToken);
      }
    }, [])
    // another answer to code from 11 to 16  const [token, settoken] = useState(localStorage.getItem('tkn')) ; 

    
    console.log(token);
  return (
    <AuthContext.Provider value={{token , settoken}}>
      {children}
    </AuthContext.Provider>
  );
}
