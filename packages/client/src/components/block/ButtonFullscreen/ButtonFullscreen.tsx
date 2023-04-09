import React, { FC } from "react"
import styles from "./ButtonFullscreen.module.scss"

type IButtonFullscreen = {
    newClass:string
}

export const ButtonFullsceen: FC<IButtonFullscreen> = ({newClass}) => {

    const onFullscreen = () => {
        const button = document.querySelector<HTMLButtonElement>(`.${styles.button}`);
        if(button) {
            if(document.fullscreenEnabled ) {
                if(!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                }else {
                    document.exitFullscreen();
                }
            }
        }
    }
    
    return (
        <button className={`${styles.button} ${newClass}`} onClick={onFullscreen}></button>
    )
}
