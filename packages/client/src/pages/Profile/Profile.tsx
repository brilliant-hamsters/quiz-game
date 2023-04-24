import styles from "./Profile.module.scss"
import { Achievements } from "../../components/block/Achievements"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import React from "react"
import { MouseEventHandler, useState } from "react"
import store, { useAppDispatch, useAppSelector } from "../../store"
import iconBack from "../../../public/images/icons/icon_back.svg"
import iconAvatar from "../../../public/images/icons/icon_noAvatar.svg"
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
    const [isEditPassword, setEditPassword] = useState(false);
    const [isAbleChange, changeIsAbleChange] = useState(false);
    const { user } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const addEditElement: MouseEventHandler = () => {
        if(isAbleChange) {
            changeIsAbleChange(!isAbleChange);
            console.log(store.getState())
        }else {
            changeIsAbleChange(!isAbleChange)
        }
      };

    const addModal:MouseEventHandler = () => {
        if(isEditPassword) {
                setEditPassword(!isEditPassword);
        }else {
                setEditPassword(!isEditPassword);
        }
    }

    const updatePassword = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const errorPass = document.querySelector<HTMLSpanElement>(`.${styles.errorPass}`);

        if(dataForm.newPassword && dataForm.oldPassword) {
            const userForm =  {
                newPassword: dataForm.newPassword,
                oldPassword: dataForm.oldPassword        
              } 
            dispatch(editPass(userForm)).then((response: any) => {
                if(errorPass) {
                    errorPass.textContent = response.payload;
                    if(response.payload !== 'Некорректный старый пароль!' 
                    && response.payload !== 'Невозможно выполнить запрос!') {
                        errorPass.textContent = "";
                        setEditPassword(!isEditPassword);   
                    }
                }
                
            });
        } 
    }

    const updateAvatar = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        const fileList = (event.target as HTMLInputElement).files;
        const data = new FormData();

            if(fileList && fileList.length !== 0) {
                data.append('avatar', fileList[0], 'userAvatar');
                dispatch(editAvatar(data));
            } 
    }
    
    const updateUser = ()=> {
        dispatch(editUser(dataForm));
        document.querySelectorAll<HTMLInputElement>('input').forEach((e) => {
            e.value = ""
        })
        changeIsAbleChange(!isAbleChange)
    }

    const onLogOut = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        await dispatch(logOut());
        navigate('/auth');
    }

    return <div className={styles.root}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            Профиль <button onClick={addEditElement} className={styles.buttonEdit} ><img src={iconEdit} className={styles.iconEdit}/></button>
                        </div>
                        { isAbleChange ?
                        <>
                            <div className={styles.message}>Редактирование профиля!</div>
                            <button className={styles.buttonClose} onClick={addEditElement}>x</button>
                        </> 
                        : 
                        <></>
                        }
                    </div>
                    <div className={styles.userInfo}>
                        <form method="post" encType="multipart/form-data" className={styles.avatarControl} onChange={updateAvatar}>
                            Аватар:
                            <span className={styles.avatarSpan} >
                                <img src={ user?.avatar !== null ? `https://ya-praktikum.tech/api/v2/resources/${user?.avatar}` : iconAvatar } className={styles.avatarImage} alt="" />
                                <input type="file" name="input__avatar" accept="image/png, image/jpeg" className={styles.avatar}></input>
                             </span>
                        </form>
                        <div className={styles.buttonLogOut} onClick={onLogOut} >Выйти из профиля</div>
                        <PageWithProfileForm dataForm={dataForm} disable={!isAbleChange} updateUser={updateUser} validObj={validObj} onChange={onChange} isFormValid />
                        <button className={styles.buttonEditPass} onClick={addModal} disabled={isAbleChange}>Изменить пароль</button>
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
                    { isEditPassword ? 
                    <>
                        <div className={styles.background}>
                            <div className={styles.modal}>
                                <div className={styles.modalHeader}>Изменение пароля<button className={styles.buttonCloseModal} onClick={addModal}>X</button></div>
                                <form action="" className={styles.modalForm} onSubmit={updatePassword} noValidate>
                                    <Input
                                        classInput="password"
                                        type="password"
                                        name="oldPassword"
                                        autoFocus
                                        required
                                        label="Старый"
                                        onChange={onChange}
                                        validObj={validObj.oldPassword}
                                        value={undefined}
                                    />
                                    <Input
                                        classInput="password"
                                        type="password"
                                        name="newPassword"
                                        autoFocus={false}
                                        required
                                        label="Новый"
                                        onChange={onChange}
                                        validObj={validObj.newPassword}
                                        value={undefined}
                                    />
                                        <span className={styles.errorPass}></span>
                                    <input className={styles.savePass} type="submit" value="Сохранить" />
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <></>
                    }
            </div>
}

export default ComponentWithValidation(Profile)
