import styles from "./btn_route.module.scss"

type btnRoute = {
    image_path: string;
    name_btn: string;
}

export const BtnRoute = (props:btnRoute) => {
    return <button className={styles.btn_route}><img src={props.image_path} className={styles.icon}/><p>{props.name_btn}</p></button>
}
