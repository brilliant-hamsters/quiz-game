import styles from './error500.module.scss'
import { BtnBack } from '../../components/block/btn_back'
export const Error500 = () => {
    return <div className={styles.error500_page}>
            <div className={styles.error500_header}>
                <h1 className={styles.service_is_unavailable}>Сервис временно недоступен</h1>
                <h1 className={styles.service_is_unavailable}>Ведём работы</h1>
            </div>
            <div className={styles.error500_body}>
                <div className={styles.btn_back}><BtnBack/></div> 
            </div>
        </div>
}
