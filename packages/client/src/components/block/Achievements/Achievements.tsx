import styles from "./Achievements.module.scss"

type achieve = {
    imp_path: string;
    achieve_text:string;
}


export const Achievements = (props:achieve) => {
    return <div className={styles.achievements}>
                <img src={props.imp_path} alt="" className={styles.achievements__icon} />
                <p className={styles.achievements_p}>{props.achieve_text}</p>
            </div>
}
