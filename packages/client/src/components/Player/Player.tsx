import styles from './Player.module.scss'
import music from '../../../public/audio/Future-Technology.mp3'
import { useState } from 'react'
import musicOff from '../../../public/images/icons/volume-mute-fill.svg'
import musicOn from '../../../public/images/icons/volume-up-fill.svg'

export const Player = () => {
    const [pause, setPause] = useState(true)
    const audio = document.querySelector<HTMLAudioElement>('audio');

    const onStopMusic = (e) => {

        const button: HTMLButtonElement = e.target;

        if(pause && button) {
            audio?.play();
            setPause(false);
            button.style.backgroundImage = `url(${musicOn})`
        }else if(button) {
            audio?.pause();
            setPause(true);
            button.style.backgroundImage = `url(${musicOff})`
        };      
    }

    const onVolumePlus = () => {
        if(audio) audio.volume += 0.1
    }

    const onVolumeMinus = () => {
        if(audio) audio.volume -= 0.1
    }


    return (
        <>
        <audio 
            className={styles.audio} 
            src={music}
        />
        <section className={styles.section}>
            <input
                className={styles.buttonSound} 
                onClick={onStopMusic}
                type='button' 
            />
            <input type="button" className={styles.volume} onClick={onVolumePlus} value='+'/>
            <input type="button" className={styles.volume} onClick={onVolumeMinus} value='-'/>
        </section>
        </>
    )
}
