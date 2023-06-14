import styles from './Profile.module.scss'
import { Achievements } from '../../components/block/Achievements'
import { Input } from '../../components/Input'
import iconEdit from '../../../public/images/icons/icon_edit_pencil.svg'
import iconWin from '../../../public/images/icons/icon_verified_user.svg'
import iconBack from '../../../public/images/icons/icon_back.svg'
import iconAvatar from '../../../public/images/icons/icon_noAvatar.svg'
import React, { useEffect } from 'react'
import { MouseEventHandler, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { Link, useNavigate } from 'react-router-dom'
import { editAvatar, editPass } from '../../store/profile/profileSlice'
import { logOut } from '../../store/auth/authSlice'
import { PageWithProfileForm } from '../../components/PageWithProfileForm'
import {
  ComponentWithValidation,
  CustomComponentProps,
} from '../../utils/hoc/ComponentWithValidation'
import { DataProfile } from '../../typings/appTypes'
import { ChooseTheme } from '../../utils/hoc/ChooseTheme'
import { logouthUser } from '../../api/methods/logoutUser'

export interface ProfileProps extends CustomComponentProps {
  dataForm: DataProfile
}

function Profile({ validObj, onChange, dataForm }: ProfileProps) {
  const [isEditPassword, setEditPassword] = useState(false)
  const [isAbleChange, changeIsAbleChange] = useState(false)
  const { user } = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addEditElement: MouseEventHandler = () => {
    changeIsAbleChange(!isAbleChange)
  }

  const addModal: MouseEventHandler = () => {
    setEditPassword(!isEditPassword)
  }

  const updatePassword = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const errorPass = document.querySelector<HTMLSpanElement>(
      `.${styles.errorPass}`
    )

    if (dataForm.newPassword && dataForm.oldPassword) {
      const editPasswordData = {
        newPassword: dataForm.newPassword,
        oldPassword: dataForm.oldPassword,
      }
      dispatch(editPass(editPasswordData)).then(response => {
        if (errorPass) {
          errorPass.textContent = response.payload as string
          if (
            response.payload !== 'Некорректный старый пароль!' &&
            response.payload !== 'Невозможно выполнить запрос!'
          ) {
            errorPass.textContent = ''
            setEditPassword(!isEditPassword)
          }
        }
      })
    }
  }

  const updateAvatar = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const fileList = (event.target as HTMLInputElement).files
    const data = new FormData()

    if (fileList && fileList.length !== 0) {
      data.append('avatar', fileList[0], 'userAvatar')
      dispatch(editAvatar(data))
    }
  }

  const updateUser = () => {
    changeIsAbleChange(!isAbleChange)
  }

  const onLogOut = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    await dispatch(logOut())
    console.log('ID', user.id)
    await logouthUser(user.id)
    navigate('/auth')
  }
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.title}>
            Профиль{' '}
            <button onClick={addEditElement} className={styles.buttonEdit}>
              <img
                src={iconEdit}
                className={styles.iconEdit}
                alt="Иконка редактирования"
              />
            </button>
          </div>
          {isAbleChange ? (
            <>
              <div className={styles.message}>Редактирование профиля!</div>
              <button className={styles.buttonClose} onClick={addEditElement}>
                x
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <ChooseTheme />
        <div className={styles.userInfo}>
          <form
            method="post"
            encType="multipart/form-data"
            className={styles.avatarControl}
            onChange={updateAvatar}>
            Аватар:
            <span className={styles.avatarSpan}>
              <img
                src={
                  user?.avatar !== null
                    ? `https://ya-praktikum.tech/api/v2/resources/${user?.avatar}`
                    : iconAvatar
                }
                className={styles.avatarImage}
                alt=""
              />
              <input
                type="file"
                name="input__avatar"
                accept="image/png, image/jpeg"
                className={styles.avatar}
              />
            </span>
          </form>
          <div className={styles.buttonLogOut} onClick={onLogOut}>
            Выйти из профиля
          </div>
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
            disabled={isAbleChange}>
            Изменить пароль
          </button>
        </div>
        <div className={styles.gameInfo}>
          <div className={styles.achievementsControl}>
            Achievements:
            <div className={styles.achievements}>
              <Achievements imp_path={iconWin} achieve_text="Win x10" />
              <Achievements imp_path={iconWin} achieve_text="Win x10" />
              <Achievements imp_path={iconWin} achieve_text="Win x10" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.softBar}>
        <Link to={'/start'}>
          <img src={iconBack} alt="" className={styles.iconMenu} />
        </Link>
      </div>
      {isEditPassword ? (
        <>
          <div className={styles.background}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                Изменение пароля
                <button className={styles.buttonCloseModal} onClick={addModal}>
                  X
                </button>
              </div>
              <form
                action=""
                className={styles.modalForm}
                onSubmit={updatePassword}
                noValidate>
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
                <span className={styles.errorPass} />
                <input
                  className={styles.savePass}
                  type="submit"
                  value="Сохранить"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ComponentWithValidation(Profile)
