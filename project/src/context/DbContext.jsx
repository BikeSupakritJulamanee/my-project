// DbContextProvider.js
import React, { createContext, useContext, useState } from 'react';

import { useUserAuth } from './UserAuthContext';

const DbContext = createContext();

export function UseDbContextProvider({ children }) {

    const { user } = useUserAuth();

    const [data, setData] = useState({
        name: 'DbContext',
        food: 'bbq',
        email: user.email,
    });

    return (
        <DbContext.Provider value={{ data }}>
            {children}
        </DbContext.Provider>
    );
}

export function useDbContext() {
    return useContext(DbContext);
}
