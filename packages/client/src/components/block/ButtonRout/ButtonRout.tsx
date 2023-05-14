import { Link } from "react-router-dom";
import styles from "./ButtonRout.module.scss"

type TBtnRoute = {
    image_path: string;
    name_btn: string;
    link:string;
}

export const BtnRoute = (props: TBtnRoute) => {
    return (
        <div className={styles.button}>
            <Link to={props.link}>
                <img src={props.image_path} className={styles.icon} alt="Пусто" />
                {props.name_btn}
            </Link>
        </div>
        )
}
