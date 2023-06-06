import React from "react";
import { ThemeContext, themes } from "../../context/ThemeContext";
import { Toggler } from "../../components/Toggler";
import { updateTheme } from "../../api/methods/updateTheme";

export const ChooseTheme = () => {

    return (
        <ThemeContext.Consumer>
                {({ theme, setTheme }: any) => (
                <Toggler
                    onChange={async () => {
                        if (theme === themes.light) {
                            setTheme(themes.dark)
                            await updateTheme({theme: 'dark'})
                        }  
                        if (theme === themes.dark) {
                            setTheme(themes.light)
                            await updateTheme({theme: 'light'})
                        } 
                    }}
                    value={theme === themes.dark}
                />
                )}
            </ThemeContext.Consumer> 
    )
}
