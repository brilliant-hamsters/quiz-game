import { FunctionComponent } from "react";
import styles from "./Achievements.module.scss"

interface IAchieve {
    imp_path: string;
    achieve_text:string;
}

export const Achievements: FunctionComponent<IAchieve> = ({imp_path, achieve_text}) => {
    return <div className={styles.root}>
                <img src={imp_path} alt="" className={styles.icon} />
                <p className={styles.title}>{achieve_text}</p>
            </div>
}
