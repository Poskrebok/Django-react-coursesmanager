import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a UserContextProvider component
export const UserContextProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  // Define any other functions or state related to the user here

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
