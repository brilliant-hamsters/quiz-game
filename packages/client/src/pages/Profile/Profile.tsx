import styles from "./Profile.module.scss"
import { Achievements } from "../../components/block/Achievements"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import React from "react"
import { MouseEventHandler, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import iconBack from "../../../public/images/icons/icon_back.svg"
import { Link } from 'react-router-dom'
import { editUser, editAvatar, editPass } from "../../store/profile/profileSlice"

interface IUserData {
    [key: string]: string
    first_name:string;
    second_name:string;
    display_name:string;
    login:string;
    email:string;
    phone:string;
}

interface IUserUpdatePass {
    [key: string]: string;
    oldPassword: string;
    newPassword: string;
}

export const Profile = () => {
    const [trottle, setTrottle] = useState(true);
    const [check, setCheck] = useState(true);
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const addEditElement: MouseEventHandler = () => {
        const button_close = document.querySelector<HTMLButtonElement>(`.${styles.buttonClose}`);
        const message = document.querySelector<HTMLDivElement>(`.${styles.message}`);

        if(check) {
            if(button_close && message) {
                button_close.style.display = "flex";
                message.style.display = "block";
            }
            setCheck(false);
        }else {
            if(button_close && message ) {
                button_close.style.display = "none";
                message.style.display = "none";
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

    const updateUser = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const userInfo__names = document.querySelector<HTMLInputElement>(`.${styles.input}`);
        if(userInfo__names) {
                const data:IUserData = {
                    first_name: "",
                    second_name: "",
                    display_name: "",
                    login: "",
                    email: "",
                    phone: ""
                };
                const userInfo = document.querySelectorAll<HTMLInputElement>(`.${styles.input}`)
            
            if(userInfo) {
                userInfo.forEach((e) => {
                    data[e.name] = e.value 
                });
                dispatch(editUser(data))
            } 
        }
        
    }

    const updatePassword = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const data:IUserUpdatePass = {
            oldPassword: "",
            newPassword: "",
        };
        const userInfo = document.querySelectorAll<HTMLInputElement>(`.${styles.password}`)
        if(userInfo) {
                userInfo.forEach((e) => {
                    data[e.name] = e.value;
                });
                dispatch(editPass(data))
        }
    }
    const updateAvatar = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const input = event.target;
        const fileList = (input as HTMLInputElement).files;
        const data = new FormData();
            if(fileList) {
                data.append('avatar', fileList[0], 'userAvatar');
                dispatch(editAvatar(data));
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
                        <form method="post" encType="multipart/form-data" className={styles.avatarControl} onChange={updateAvatar}>
                            Аватар:
                            <span className={styles.avatarSpan}>
                                <input type="file" name="input__avatar" className={styles.avatar} accept="image/png, image/jpeg"/>
                            </span>
                        </form>
                        <form action="" className={styles.userDataControl} onSubmit={updateUser}>
                            <fieldset className={styles.fieldset} disabled={check}>
                            <label className={styles.userData}>Имя: <input  className={styles.input} name="first_name"  value={user?.first_name} /></label>
                            <label className={styles.userData}>Фамилия: <input  className={styles.input} name="second_name" value={user?.second_name} /></label>
                            <label className={styles.userData}>Почта: <input  className={styles.input} name="email" value={user?.email} /></label>
                            <label className={styles.userData}>Логин: <input  className={styles.input} name="login" value={user?.login} /></label>
                            <label className={styles.userData}>Номер телефона: <input  className={styles.input} name="phone" value={user?.phone} /></label>
                            <button className={styles.buttonSave} type="submit"  disabled={check}>Сохранить</button>
                            </fieldset>
                        </form>
                        <button className={styles.buttonEditPass} onClick={addModal} disabled={!check}>Изменить пароль</button>
                    </div>
                    <div className={styles.gameInfo}>
                        <div className={styles.nickname}>Nickname:<input  className={styles.input} name="display_name" placeholder={""} disabled={check} /></div>
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
                            <Link to={"/start"}><img src={iconBack} alt="" className={styles.iconMenu} /></Link>
                    </div>
                    <div className={styles.background}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>Изменение пароля!<button className={styles.buttonCloseModal} onClick={addModal}>X</button></div>
                            <form action="" className={styles.modalForm} onSubmit={updatePassword}>
                                <div className={styles.password}>Старый пароль: <input  className={styles.oldPassword} /></div>
                                <div className={styles.password}>Новый пароль:  <input  className={styles.newPassword} /></div>
                                <input className={styles.savePass} type="submit" value="Сохранить" />
                            </form>
                        </div>
                    </div>
            </div>
}
