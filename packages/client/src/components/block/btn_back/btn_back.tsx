import styles from "./btn_back.module.scss"

export const BtnBack = () => {
    return <button className={styles.back_btn}>
                <div className={styles.send_icon}></div> 
                Вернуться назад
            </button>
}
