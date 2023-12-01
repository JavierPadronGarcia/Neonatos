import { createContext, useState } from 'react';

export const RolesContext = createContext();

export function RolesProvider({ children }) {
  const [role, setRole] = useState("");

  return (
    <RolesContext.Provider value={{ role, setRole }}>
      {children}
    </RolesContext.Provider>
  );
}