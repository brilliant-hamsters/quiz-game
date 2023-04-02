import styles from "./Profile.module.scss"
import { Achievements } from "../../components/block/Achievements"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import iconMenu from "../../../public/images/icons/icon_menu.svg"
import { MouseEventHandler } from "react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../store"
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
    const dispatch = useAppDispatch();
    const {isLoading, error, user, avatar} = useAppSelector(state => state.profile)
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

    const updateAvater = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const avatarControl = document.querySelector<HTMLFormElement>(`.${styles.avatarControl}`);
        if(avatarControl) {
            dispatch(editAvatar(new FormData(avatarControl)));
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
                        <form method="post" encType="multipart/form-data" className={styles.avatarControl} onChange={updateAvater}>
                            Аватар:
                            <span className={styles.avatarSpan} style={{backgroundImage:`url(${avatar?.avatar})`}}> 
                                <input type="file" name="input__avatar" className={styles.avatar} accept="image/png, image/jpeg"/>
                            </span>
                        </form>
                        <form action="" onSubmit={updateUser} className={styles.userDataControl}>
                            <div className={styles.userData}>Имя: <input  className={styles.input} name="first_name"  placeholder={user?.first_name} disabled/></div>
                            <div className={styles.userData}>Фамилия: <input  className={styles.input} name="second_name" placeholder={user?.second_name} disabled/></div>
                            <div className={styles.userData}>Почта: <input  className={styles.input} name="email" placeholder={user?.mail} disabled/></div>
                            <div className={styles.userData}>Логин: <input  className={styles.input} name="login" placeholder={user?.login} disabled/></div>
                            <div className={styles.userData}>Номер телефона: <input  className={styles.input} name="phone" placeholder={user?.phone} disabled/></div>
                            <button className={styles.buttonSave} type="submit"  disabled>Сохранить</button>
                        </form>
                        <button className={styles.buttonEditPass} onClick={addModal}>Изменить пароль</button>
                    </div>
                    <div className={styles.gameInfo}>
                        <div className={styles.nickname}>Nickname:<input  className={styles.input} name="display_name" placeholder={user?.nickName} disabled/></div>
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
                            <form action="" className={styles.modalForm} onSubmit={updatePassword}>
                                <div className={styles.modalDiv}>Старый пароль: <input name="oldPassword"  className={styles.password} /></div>
                                <div className={styles.modalDiv}>Новый пароль:  <input name="newPassword" className={styles.password} /></div>
                                <input className={styles.savePass} type="submit" value="Сохранить" />
                            </form>
                        </div> 
                    </div>
            </div>
}
