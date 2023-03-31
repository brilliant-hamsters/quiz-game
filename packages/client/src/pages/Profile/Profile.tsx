import styles from "./Profile.module.scss"
import { Achievements } from "../../components/block/Achievements"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import iconMenu from "../../../public/images/icons/icon_menu.svg"
import { MouseEventHandler } from "react"
import React from "react"


export const Profile = () => {
    const [trottle, setTrottle] = React.useState(true);
    const [check, setCheck] = React.useState(true);

    const addEditElement: MouseEventHandler = () => {
        const button_close = document.querySelector<HTMLButtonElement>(`.${styles.buttonClose}`);
        const userInfo__names = document.querySelectorAll<HTMLInputElement>(`.${styles.input}`);
        const message = document.querySelector<HTMLDivElement>(`.${styles.message}`);
        const userInfo__save = document.querySelector<HTMLButtonElement>(`.${styles.buttonSave}`);
        const userInfo__editPass = document.querySelector<HTMLButtonElement>(`.${styles.buttonEditPass}`);

        if(check) {
            if(button_close  
                && message  
                && userInfo__save  
                && userInfo__editPass 
                && userInfo__names ) 
            {
                button_close.style.display = "flex";
                message.style.display = "block";
                userInfo__save.disabled = false;
                userInfo__editPass.disabled = true;
                userInfo__names.forEach((e) => {
                    e.disabled = false;
            })
            }
            setCheck(false);
        }else {
            if(button_close  
                && message 
                && userInfo__save 
                && userInfo__editPass 
                && userInfo__names ) 
            {
                button_close.style.display = "none";
                message.style.display = "none";
                userInfo__save.disabled = true;
                userInfo__editPass.disabled = false;
                userInfo__names.forEach((e) => {
                    e.disabled = true;
            });
            }
            setCheck(true)
        }
        
      };

    const addModal:MouseEventHandler = () => {
        const modal = document.querySelector<HTMLDivElement>(`.${styles.background}`);
        if(trottle) {
            if(modal !== null) {
                modal.style.display = "flex"
                setTrottle(false);
            }
        }else {
            if(modal !== null) {
                modal.style.display = "none" 
                setTrottle(true);
            }
        }
    }

    return <div className={styles.root}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            Профиль <button onClick={addEditElement} className={styles.buttonEdit} ><img src={iconEdit} className={styles.iconEdit}/></button>
                        </div>
                        <div className={styles.message}>Редактирование профиля!</div>
                        <button className={styles.buttonClose} onClick={addEditElement}>x</button>
                    </div>
                    <div className={styles.userInfo}>
                        <form method="post" encType="multipart/form-data" className={styles.avatarControl}>
                            Аватар:
                            <span className={styles.avatarSpan}> 
                                <input type="file" name="input__avatar" className={styles.avatar} accept="image/png, image/jpeg"/>
                            </span>
                        </form>
                        <form action="" className={styles.userDataControl}>
                            <div className={styles.userData}>Имя: <input  className={styles.input} name="first_name"  placeholder={""} disabled/></div>
                            <div className={styles.userData}>Фамилия: <input  className={styles.input} name="second_name" placeholder={""} disabled/></div>
                            <div className={styles.userData}>Почта: <input  className={styles.input} name="email" placeholder={""} disabled/></div>
                            <div className={styles.userData}>Логин: <input  className={styles.input} name="login" placeholder={""} disabled/></div>
                            <div className={styles.userData}>Номер телефона: <input  className={styles.input} name="phone" placeholder={""} disabled/></div>
                            <button className={styles.buttonSave} type="submit"  disabled>Сохранить</button>
                        </form>
                        <button className={styles.buttonEditPass} onClick={addModal}>Изменить пароль</button>
                    </div>
                    <div className={styles.gameInfo}>
                        <div className={styles.nickname}>Nickname:<input  className={styles.input} name="display_name" placeholder={""} disabled/></div>
                        <div className={styles.achievementsControl}>
                            Achievements:
                            <div className={styles.achievements}>
                                <Achievements  imp_path={iconWin} achieve_text="Win x10"/>
                                <Achievements  imp_path={iconWin} achieve_text="Win x10"/>
                                <Achievements  imp_path={iconWin} achieve_text="Win x10"/>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={styles.softBar}>
                            <button className={styles.buttonMenu}><img src={iconMenu} alt="" className={styles.iconMenu} /></button> 
                    </div>
                    <div className={styles.background}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>Изменение пароля!<button className={styles.buttonCloseModal} onClick={addModal}>X</button></div> 
                            <form action="" className={styles.modalForm}>
                                <div className={styles.password}>Старый пароль: <input  className={styles.oldPassword} /></div>
                                <div className={styles.password}>Новый пароль:  <input  className={styles.newPassword} /></div>
                                <input className={styles.savePass} type="submit" value="Сохранить" />
                            </form>
                        </div> 
                    </div>
            </div>
}
