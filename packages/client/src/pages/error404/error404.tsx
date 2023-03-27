import styles from './error404.module.scss'

export const Error404 = () => {
    return <div className={styles.page}>
                <span className={styles.page__span}>
                    <div className={styles.span__icon}></div> 
                    <p>Поломалося!!((</p> 
                </span>
                <div className={styles.page__button}>
                    <button className={styles.button}>
                        <div className={styles.button__icon}></div> 
                        Вернуться назад
                    </button>
                </div> 
            </div>
}
