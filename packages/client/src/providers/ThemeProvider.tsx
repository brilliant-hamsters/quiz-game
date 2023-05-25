import React, { ReactNode, useEffect, useState } from "react";
import { ThemeContext, themes } from "../context/ThemeContext";
import { getByTheme } from "../api/methods/getTheme";

interface ThemeChildren {
    children: ReactNode
}

const getTheme = () => { 
    let theme = `${window?.localStorage?.getItem('theme')}`
    if(Object.values(theme).includes(theme)) {
        return theme;
    }else { 
        getByTheme().then((response) => {if(response.status === 200) theme = response.theme as string})
    } 
    const prefersColor = window.matchMedia('(prefers-color-scheme: light)')
    if(prefersColor.matches) return themes.light

    return themes.light
}

export function ThemeProvider({children}: ThemeChildren) {
    const [theme, setTheme] = useState(getTheme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      )
}


