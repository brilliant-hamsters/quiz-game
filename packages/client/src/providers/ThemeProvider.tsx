import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getByTheme } from "../api/methods/getByTheme";

interface ThemeChildren {
    children: ReactNode
}

type BodyTheme = {
    theme: string
}

const getTheme = () => { 
    let theme = `${window?.localStorage?.getItem('theme')}`
    if(Object.values(theme).includes(theme)) {
        return theme;
    }else { 
        getByTheme()
        .then((response:Response) => {
             if(response.status === 200) return response.json() 
            })
        .then((body:BodyTheme) => { 
            theme = body.theme 
        })
    } 
    const prefersColor = window.matchMedia(`(prefers-color-scheme: ${theme})`)
    if(prefersColor.matches) return theme

    return theme
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


