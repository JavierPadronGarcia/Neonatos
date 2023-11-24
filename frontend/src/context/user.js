import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [userImage, setUserImage] = useState('');

    const updateUserImage = (newImage) => {
        setUserImage(newImage);
    }

    return (
        <UserContext.Provider value={{ userImage, updateUserImage }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}

