import styles from './error404.module.scss'
import { BtnBack } from '../../components/block/btn_back'

export const Error404 = () => {
    return <div className={styles.page}>
                <span className={styles.page__span}>
                    <div className={styles.span__icon}></div> 
                    <p>Поломалося!!((</p> 
                </span>
                <div className={styles.page__button}><BtnBack/></div> 
            </div>
}
