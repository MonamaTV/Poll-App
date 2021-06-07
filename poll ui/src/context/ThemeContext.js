import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [darkTheme, setDarkTheme] = useState(false);

    const globalTheme = {
        backgroundColor: darkTheme ? "rgb(33, 33, 47)" : "#fff"
    }

    return (
        <ThemeContext.Provider value={[darkTheme, setDarkTheme, globalTheme]}  >
            {children}
        </ThemeContext.Provider>
    );
}

