import styles from "./Achievements.module.scss"

type achieve = {
    imp_path: string;
    achieve_text:string;
}


export const Achievements = (props:achieve) => {
    return <div className={styles.root}>
                <img src={props.imp_path} alt="" className={styles.icon} />
                <p className={styles.title}>{props.achieve_text}</p>
            </div>
}
