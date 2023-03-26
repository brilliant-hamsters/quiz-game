import styles from "./btn_back.module.scss"

export const BtnBack = () => {
    return <button className={styles.button}>
                <div className={styles.button__icon}></div> 
                Вернуться назад
            </button>
}
