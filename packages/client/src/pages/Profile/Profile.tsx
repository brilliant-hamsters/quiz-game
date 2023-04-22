import styles from "./Profile.module.scss"
import { Achievements } from "../../components/block/Achievements"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import React, { useEffect } from "react"
import { MouseEventHandler, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import iconBack from "../../../public/images/icons/icon_back.svg"
import { Link, useNavigate } from 'react-router-dom'
import { editUser, editAvatar, editPass } from "../../store/profile/profileSlice"
import { logOut } from "../../store/auth/authSlice"
import { Input } from "../../components/Input"
import { ComponentWithValidation, CustomComponentProps } from "../../utils/hoc/ComponentWithValidation"
import { DataProfile } from "../../typings/appTypes"
import { PageWithProfileForm } from "../../components/PageWithProfileForm"

export interface ProfileProps extends CustomComponentProps {
    dataForm: Omit<DataProfile,  'password'>
  }


function Profile({ validObj, onChange, dataForm }: ProfileProps) {
    const [trottle, setTrottle] = useState(true);
    const [check, setCheck] = useState(true);
    const { user, loggedIn } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) navigate('/auth')
      }, [loggedIn])

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

    const updatePassword = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const modal = document.querySelector<HTMLDivElement>(`.${styles.background}`);
        const errorMessage = document.querySelector<HTMLSpanElement>(`.${styles.errorMess}`);
        
        if(dataForm.newPassword && dataForm.oldPassword) {
            const userForm =  {
                newPassword: dataForm.newPassword,
                oldPassword: dataForm.oldPassword        
              }      
                    if(errorMessage) {
                        dispatch(editPass(userForm));
                                if(modal !== null) {
                                    modal.style.display = "none"
                                    setTrottle(true);
                                    errorMessage.textContent = ""
                                }
                    }
                 
        }
    }

    const updateAvatar = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const fileList = (event.target as HTMLInputElement).files;
        const data = new FormData();
            if(fileList) {
                data.append('avatar', fileList[0], 'userAvatar');
                dispatch(editAvatar(data));
            }
        
    }
    
    const updateUser = ()=> {
        dispatch(editUser(dataForm));
        document.querySelectorAll<HTMLInputElement>('input').forEach((e) => {
            e.value = ""
        })
    }
    const onLogOut = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(logOut());
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
                            <span className={styles.avatarSpan} >
                                <img src={`https://ya-praktikum.tech/api/v2/resources/${user?.avatar}`} className={styles.avatarImage} />
                                <input type="file" name="input__avatar" accept="image/png, image/jpeg" className={styles.avatar}></input>
                             </span>
                        </form>
                        <div className={styles.buttonLogOut} onClick={onLogOut} >Выйти из профиля</div>
                        <PageWithProfileForm check={check} updateUser={updateUser} validObj={validObj} onChange={onChange} />
                        <button className={styles.buttonEditPass} onClick={addModal} disabled={!check}>Изменить пароль</button>
                    </div>
                    <div className={styles.gameInfo}>
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
                                <label className={styles.password}>
                                <Input
                                    classInput=""
                                    type="password"
                                    name="oldPassword"
                                    autoFocus
                                    required
                                    label="Старый"
                                    onChange={onChange}
                                    validObj={validObj.password}
                                    value={undefined}
                                    />
                                </label>
                                <label className={styles.password}>
                                <Input
                                    classInput=""
                                    type="password"
                                    name="newPassword"
                                    autoFocus
                                    required
                                    label="Новый"
                                    onChange={onChange}
                                    validObj={validObj.password}
                                    value={undefined}
                                    />
                                </label>
                                    <span className={styles.errorMess}>Неверный старый пароль!</span>
                                <input className={styles.savePass} type="submit" value="Сохранить" />
                            </form>
                        </div>
                    </div>
            </div>
}

export default ComponentWithValidation(Profile)
