import React from "react";
import { ThemeContext, themes } from "../../context/ThemeContext";
import { Toggler } from "../../components/Toggler/Toggler";


export const ChoiceTheme = () => {
    return (
        <ThemeContext.Consumer>
                {({ theme, setTheme }: any) => (
                <Toggler
                    onChange={() => {
                        if (theme === themes.light) {
                            //await updateTheme(dark).then((response) => {if(response.status === 200) setTheme(themes.dark)})
                            setTheme(themes.dark)
                        }  
                        if (theme === themes.dark) {
                            //await updateTheme(light).then((response) => {if(response.status === 200) setTheme(themes.light)})
                            setTheme(themes.light)
                        } 
                    }}
                    value={theme === themes.dark}
                />
                )}
            </ThemeContext.Consumer> 
    )
}
