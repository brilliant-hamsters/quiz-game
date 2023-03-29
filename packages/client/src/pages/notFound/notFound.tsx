import styles from './notFound.module.scss'

export const NotFound = () => {
    return <div className={styles.page}>
                <div className={styles.page__span}>
                    <div className={styles.span__icon}></div> 
                    <p>Поломалося!!((</p> 
                </div>
                <div className={styles.page__button}>
                    <button className={styles.button}>
                        <div className={styles.button__icon}></div> 
                        Вернуться назад
                    </button>
                </div> 
            </div>
}
