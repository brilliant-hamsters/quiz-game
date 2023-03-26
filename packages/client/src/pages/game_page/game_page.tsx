import styles from "./game_page.module.scss";
import { Answer } from "../../components/block/block_answer";
import { BtnRoute } from "../../components/block/btn_route";
import iconHome from "../../../public/images/icons/icon_home.svg"
import iconLeaderboarStar from "../../../public/images/icons/icon_leaderboard_star.svg"
import iconPercon from "../../../public/images/icons/icon_user_circle.svg"

export const GamePage = () => {
    return <div className={styles.page}>
                <div className={styles.page__header}>
                        <p className={styles.div__time_left}>Time-left:</p> 
                        <div className={styles.div__time_bar}></div>
                        <p className={styles.div__money}>Р:10000</p>
                </div>
                <div className={styles.page__body}>
                    <section className={styles.div__header}>
                        <div className={styles.div__question}><p className={styles.div__question_p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</p>
                        </div>
                    </section>
                    <section className={styles.div__body}>
                        <Answer answer_number="A" answer_text="lorem ipsum..........."/>
                        <Answer answer_number="B" answer_text="lorem ipsum..........."/>
                        <Answer answer_number="C" answer_text="lorem ipsum..........."/>
                        <Answer answer_number="D" answer_text="lorem ipsum..........."/>
                    </section> 
                </div>
                <div className={styles.page__link_bar}>
                        <BtnRoute image_path={iconHome} name_btn="Go start"/>
                        <BtnRoute image_path={iconLeaderboarStar} name_btn="Leaders"/>
                        <BtnRoute image_path={iconPercon} name_btn="Profile"/>
                </div>
            </div>
}
