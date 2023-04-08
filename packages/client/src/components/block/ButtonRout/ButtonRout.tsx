import styles from "./ButtonRout.module.scss"

type BtnRoute = {
    image_path: string;
    name_btn: string;
    link:string;
}

export const BtnRoute = (props:BtnRoute) => {
    return <a className={styles.button} href={props.link}>
                <img src={props.image_path} className={styles.icon} alt="Пусто" />
                {props.name_btn}
            </a>
}
