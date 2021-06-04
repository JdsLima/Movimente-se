import { createContext, ReactNode, useState } from "react";

interface MyThemeContextData {
    myTheme: object;
    setTheme: (theme) => void;
}

interface MyThemeProviderProps {
    children: ReactNode;
}

export const MyThemeContext = createContext({} as MyThemeContextData);

export function MyThemeProvider({ children }: MyThemeProviderProps) {
    const [myTheme, setMyTheme] = useState();

    function setTheme(theme) {
        setMyTheme(theme)
    }

    return (
        <MyThemeContext.Provider value={{
            myTheme, setTheme
        }}>
            {children}
        </MyThemeContext.Provider>
    );
}
