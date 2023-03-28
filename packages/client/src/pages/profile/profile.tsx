import styles from "./profile.module.scss"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import iconBtnBack from "../../../public/images/icons/Vector.svg"
import { MouseEventHandler } from "react"
import React from "react"
type profile = {
    avatar: string;
    first_name: string;
    second_name: string;
    nickName:string;
    mail: string;
    phone: string;
}
type achieve = {
    imp_path: string;
    achieve_text:string;
}


const Achievements = (props:achieve) => {
    return <div className={styles.achievements}>
                <img src={props.imp_path} alt="" className={styles.achievements__icon} />
                <p className={styles.achievements_p}>{props.achieve_text}</p>
            </div>
}

export const Profile = (props: profile) => {

    const [trottle, setTrottle] = React.useState("true");
    const [check, setCheck] = React.useState("true");

    const addEditElement: MouseEventHandler = () => {
        const button_close = document.querySelector<HTMLButtonElement>(`.${styles.header__btn__close}`);
        const userInfo__names = document.querySelectorAll<HTMLInputElement>(`.${styles.body__userInfo_input}`);
        const message = document.querySelector<HTMLDivElement>(`.${styles.message}`);
        const userInfo__save = document.querySelector<HTMLButtonElement>(`.${styles.userInfo__save}`);
        const userInfo__editPass = document.querySelector<HTMLButtonElement>(`.${styles.userInfo__btn__editPass}`);

        if(check === "true") {
            if(button_close !== null 
                && message !== null 
                && userInfo__save !== null 
                && userInfo__editPass !== null
                && userInfo__names !== null ) 
            {
                button_close.style.display = "flex";
                message.style.display = "block";
                userInfo__save.disabled = false;
                userInfo__editPass.disabled = true;
                userInfo__names.forEach((e) => {
                    e.disabled = false;
            })
            }
            setCheck("false");
        }else {
            if(button_close !== null 
                && message !== null 
                && userInfo__save !== null 
                && userInfo__editPass !== null
                && userInfo__names !== null) 
            {
                button_close.style.display = "none";
                message.style.display = "none";
                userInfo__save.disabled = true;
                userInfo__editPass.disabled = false;
                userInfo__names.forEach((e) => {
                    e.disabled = true;
            });
            }
            setCheck("true")
        }
        
      };


    const addModal:MouseEventHandler = () => {
        const modal = document.querySelector<HTMLDivElement>(`.${styles.background}`);
        if(trottle === "true") {
            if(modal !== null) {
                modal.style.display = "flex"
                setTrottle("false");
            }
        }else {
            if(modal !== null) {
                modal.style.display = "none" 
                setTrottle("true");
            }
        }
    }

    return <div className={styles.page}>
                <div className={styles.body}>
                    <div className={styles.body__header}>
                        <p className={styles.header__p}>
                            Профиль <button onClick={addEditElement} className={styles.header__btn} ><img src={iconEdit} className={styles.header__image}/></button>
                        </p>
                        <div className={styles.message}>Редактирование профиля!</div>
                        <button className={styles.header__btn__close} onClick={addEditElement}>x</button>
                    </div>
                    <div className={styles.body__userInfo}>
                        <form method="post" encType="multipart/form-data" className={styles.userInfo__avatar}>
                            Аватар:
                            <span className={styles.avatar}> 
                                <input type="file" name="input__avatar" className={styles.form__input_avatar} accept="image/png, image/jpeg"/>
                            </span>
                        </form>
                        <form action="">
                            <div className={styles.userInfo__names}>Имя: <div className={styles.props}><input  className={styles.body__userInfo_input}  placeholder={props.first_name} disabled/></div></div>
                            <div className={styles.userInfo__names}>Фамилия: <div className={styles.props}><input  className={styles.body__userInfo_input} placeholder={props.second_name} disabled/></div></div>
                            <div className={styles.userInfo__names}>Почта: <div className={styles.props}><input  className={styles.body__userInfo_input} placeholder={props.mail} disabled/></div></div>
                            <div className={styles.userInfo__names}>Номер телефона: <div className={styles.props}><input  className={styles.body__userInfo_input} placeholder={props.phone} disabled/></div></div>
                            <input className={styles.userInfo__save} type="submit" disabled value="Сохранить"/>
                        </form>
                        <button className={styles.userInfo__btn__editPass} onClick={addModal}>Изменить пароль</button>
                    </div>
                    <div className={styles.body__gameInfo}>
                        <div className={styles.body__nickname}>Nickname:<div className={styles.nickname}><input  className={styles.body__userInfo_input} placeholder={props.nickName} disabled/></div></div>
                        <div className={styles.gameInfo__achievements}>
                            Achievements:
                            <div className={styles.gameInfo__achievements_body}>
                                <Achievements  imp_path={iconWin} achieve_text="Win x10"/>
                                <Achievements  imp_path={iconWin} achieve_text="Win x10"/>
                                <Achievements  imp_path={iconWin} achieve_text="Win x10"/>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={styles.softBar}>
                            <button className={styles.softBar__btn}><img src={iconBtnBack} alt="" className={styles.softBar__icon} /></button> 
                    </div>
                    <div className={styles.background}>
                        <div className={styles.modal}>
                            <div className={styles.modal__header}>Изменение пароля!<button className={styles.modal__btn__close} onClick={addModal}>X</button></div> 
                            <form action="" className={styles.modal__form}>
                                <div className={styles.userInfo__password}>Старый пароль: <div className={styles.form__oldPassword}><input  className={styles.password} /></div></div>
                                <div className={styles.userInfo__password}>Новый пароль:  <div className={styles.form__newPassword}><input  className={styles.password} /></div></div>
                                <input className={styles.modal__save} type="submit" value="Сохранить" />
                            </form>
                        </div> 
                    </div> 
            </div>
}
