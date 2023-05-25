import React from "react";
import { ThemeContext, themes } from "../../context/ThemeContext";
import { Toggler } from "../../components/Toggler/Toggler";
import { updateTheme } from "../../api/methods/updateTheme";

export const ChoiceTheme = () => {

    return (
        <ThemeContext.Consumer>
                {({ theme, setTheme }: any) => (
                <Toggler
                    onChange={async () => {
                        if (theme === themes.light) {
                            await updateTheme({theme: 'dark'}).then((response) => {if(response.status === 200) setTheme(themes.dark)})
                        }  
                        if (theme === themes.dark) {
                            await updateTheme({theme: 'light'}).then((response) => {if(response.status === 200) setTheme(themes.light)})
                        } 
                    }}
                    value={theme === themes.dark}
                />
                )}
            </ThemeContext.Consumer> 
    )
}
