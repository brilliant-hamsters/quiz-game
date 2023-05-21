import React from "react";
import { ThemeContext, themes } from "../../context/ThemeContext";
import { Toggler } from "../../components/Toggler/Toggler";

export const ChoiceTheme = () => {
    return (
        <ThemeContext.Consumer>
                {({ theme, setTheme }: any) => (
                <Toggler
                    onChange={() => {
                    if (theme === themes.light) setTheme(themes.dark)
                    if (theme === themes.dark) setTheme(themes.light)
                    }}
                    value={theme === themes.dark}
                />
                )}
            </ThemeContext.Consumer> 
    )
}
