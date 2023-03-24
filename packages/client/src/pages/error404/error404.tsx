import styles from './error404.module.scss'
import { BtnBack } from '../../components/block/btn_back'

export const Error404 = () => {
    return <div className={styles.error404_page}>
            <div className={styles.error404_header}>
                <h1 className={styles.service_is_broken}>
                <div className={styles.tools_icon}></div> 
                    Поломалося!!((
                    </h1>
            </div>
            <div className={styles.error404_body}> 
                <div className={styles.btn_back}><BtnBack/></div> 
            </div>
        </div>
}
