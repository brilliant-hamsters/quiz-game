import styles from "./Profile.module.scss"
import { Achievements } from "../../components/block/Achievements"
import iconEdit from "../../../public/images/icons/icon_edit_pencil.svg"
import iconWin from "../../../public/images/icons/icon_verified_user.svg"
import iconBack from "../../../public/images/icons/icon_back.svg"
import iconAvatar from "../../../public/images/icons/icon_noAvatar.svg"
import React from "react"
import { MouseEventHandler, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { Link, useNavigate } from 'react-router-dom'
import { editAvatar } from "../../store/profile/profileSlice"
import { logOut } from "../../store/auth/authSlice"
import { PageWithProfileForm } from "../../components/PageWithProfileForm"
import { 
    ComponentWithValidation
    ,CustomComponentProps } from "../../utils/hoc/ComponentWithValidation"
import { DataProfile } from "../../typings/appTypes"
import { ChooseTheme } from "../../utils/hoc/ChooseTheme"
import { Maps } from "../../components/Map"
import { updateByPassword } from "../../utils/hooks/updatePassword.hook"
import { ModalByProfile } from "../../components/ModalByProfile"

export interface ProfileProps extends CustomComponentProps {
    dataForm: DataProfile
  }

function Profile({ validObj, onChange, dataForm }: ProfileProps) {
    const [isEditPassword, setEditPassword] = useState(false);
    const [isAbleChange, changeIsAbleChange] = useState(false);
    const { user } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const addEditElement: MouseEventHandler = () => {
        changeIsAbleChange(!isAbleChange);
      };

    const addModal:MouseEventHandler = () => {
        setEditPassword(!isEditPassword);
    }

    const updatePassword = (event: React.SyntheticEvent)=> {
        event.preventDefault();
        updateByPassword({
            styles, 
            dataForm, 
            dispatch, 
            setEditPassword, 
            isEditPassword
            })
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
    
    const updateUser = () => {
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
                            Профиль <button onClick={addEditElement} className={styles.buttonEdit} >
                            <img src={iconEdit} className={styles.iconEdit} alt='Иконка редактирования'/>
                        </button>
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
                    <ChooseTheme />  
                    <div className={styles.userInfo}>
                        <form 
                            method="post" 
                            encType="multipart/form-data" 
                            className={styles.avatarControl} 
                            onChange={updateAvatar}
                        >
                            Аватар:
                            <span className={styles.avatarSpan} >
                                <img 
                                    src={ user?.avatar !== null 
                                                ? `https://ya-praktikum.tech/api/v2/resources/${user?.avatar}` 
                                                : iconAvatar
                                        } 
                                    className={styles.avatarImage} 
                                    alt="обратно" 
                                />
                                <input 
                                    type="file" 
                                    name="input__avatar" 
                                    accept="image/png, image/jpeg" 
                                    className={styles.avatar} 
                                />
                             </span>
                        </form>
                        <div className={styles.buttonLogOut} onClick={onLogOut} >Выйти из профиля</div>
                        <PageWithProfileForm 
                            dataForm={dataForm} 
                            disable={!isAbleChange} 
                            updateUser={updateUser} 
                            validObj={validObj} 
                            onChange={onChange} 
                            isFormValid 
                        />
                        <button 
                            className={styles.buttonEditPass} 
                            onClick={addModal} 
                            disabled={isAbleChange}
                        >
                            Изменить пароль
                        </button>
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
                        <div className={styles.mapsControll}>
                            <Maps />
                        </div>
                    </div>
                </div>
                    <div className={styles.softBar}>
                            <Link to={"/start"}>
                                <img 
                                    src={iconBack} 
                                    alt="обратно" 
                                    className={styles.iconMenu} 
                                />
                            </Link>
                    </div>
                    { isEditPassword ? 
                        <ModalByProfile 
                            onChange={onChange} 
                            validObj={validObj} 
                            addModal={addModal} 
                            updatePassword={updatePassword}
                        />
                    :
                    <></>
                    }         
            </div>
}

export default ComponentWithValidation(Profile)
