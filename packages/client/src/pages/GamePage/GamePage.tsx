import styles from "./GamePage.module.scss";
import { Answer } from "../../components/block/Answer";
import { BtnRoute } from "../../components/block/ButtonRout";
import iconHome from "../../../public/images/icons/icon_home.svg"
import iconLeaderboarStar from "../../../public/images/icons/icon_leaderboard_star.svg"
import iconPercon from "../../../public/images/icons/icon_user_circle.svg"
import { ButtonFullsceen } from "../../components/block/ButtonFullscreen";

export const GamePage = () => {
    return <div className={styles.root}>
                <div className={styles.header}>
                        <div className={styles.title}>Time-left:</div> 
                        <div className={styles.timer}></div>
                        <div className={styles.money}>Р:10000</div>
                        <ButtonFullsceen newClass={""}  />
                </div>
                <div className={styles.game}>
                    <div className={styles.questionControl}>
                        <div className={styles.question}>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</span>
                        </div>
                    </div>
                    <ul className={styles.answersList}>
                        <li className={styles.answer}><Answer answer_number="A" answer_text="lorem ipsum..........."/></li>
                        <li className={styles.answer}><Answer answer_number="B" answer_text="lorem ipsum..........."/></li>
                        <li className={styles.answer}><Answer answer_number="C" answer_text="lorem ipsum..........."/></li>
                        <li className={styles.answer}><Answer answer_number="D" answer_text="lorem ipsum..........."/></li>
                    </ul> 
                </div>
                <nav className={styles.navBar}>
                    <ul className={styles.linkList}>
                        <li className={styles.link}><BtnRoute image_path={iconHome} name_btn="Go start" link={"/start"}/></li>
                        <li className={styles.link}><BtnRoute image_path={iconLeaderboarStar} name_btn="Leaders" link={"/leader_board"}/></li>
                        <li className={styles.link}><BtnRoute image_path={iconPercon} name_btn="Profile" link={"/profile"}/></li>
                    </ul>    
                </nav>
            </div>
}
