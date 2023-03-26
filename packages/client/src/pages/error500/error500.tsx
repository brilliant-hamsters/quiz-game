import styles from './error500.module.scss'
import { BtnBack } from '../../components/block/btn_back'
export const Error500 = () => {
    return <div className={styles.page}>
                <p className={styles.page__p}>Сервис временно недоступен</p>
                <p className={styles.page__p}>Ведём работы</p>
                <div className={styles.page__btn}><BtnBack/></div>
        </div>
}
