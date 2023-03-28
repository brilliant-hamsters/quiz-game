import styles from './serverError.module.scss'

export const ServerError = () => {
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

