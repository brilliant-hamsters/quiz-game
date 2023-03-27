import styles from './error500.module.scss'

export const Error500 = () => {
    return <div className={styles.page}>
                <p className={styles.page__p}>Сервис временно недоступен</p>
                <p className={styles.page__p}>Ведём работы</p>
                <div className={styles.page__btn}>
                        <button className={styles.button}>
                                <div className={styles.button__icon}></div> 
                                Вернуться назад
                        </button>
                </div>
        </div>
}

