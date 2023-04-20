import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import styles from './register.module.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../store/auth/authSlice'
import { DataRegister } from '../../typings/appTypes'
import { ComponentWithValidation, CustomComponentProps } from '../../utils/hoc/ComponentWithValidation'

export interface RegisterProps extends CustomComponentProps{
  dataForm:DataRegister
}

function Register({validObj, onChange, dataForm}:RegisterProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loggedIn, isLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (loggedIn === true) navigate('/start')
  }, [loggedIn])


  function onSubmitForm() {
    dispatch(signUp(dataForm))
  }

  return (
    <main className={styles.main}>
      <PageWithForm
        classElement="register"
        title="Регистрация"
        buttonName="Зарегистрироваться"
        isFormValid
        caption="Уже зарегистрированы?"
        path="/auth"
        linkName="Войти"
        onSubmitForm={onSubmitForm}
        isLoading={isLoading}>
        <Input
          classInput="register"
          type="text"
          name="login"
          autoFocus
          required
          label="Логин"
          onChange={onChange}
          validObj={validObj.login}
          value={dataForm.login}
        />
        <Input
          classInput="register"
          type="text"
          name="first_name"
          autoFocus={false}
          required
          label="Имя"
          onChange={onChange}
          validObj={validObj.first_name}
          value={dataForm.first_name}
        />
        <Input
          classInput="register"
          type="text"
          name="second_name"
          autoFocus={false}
          required
          label="Фамилия"
          onChange={onChange}
          validObj={validObj.second_name}
          value={dataForm.second_name}
        />
        <Input
          classInput="register"
          type="email"
          name="email"
          autoFocus={false}
          required
          label="Email"
          onChange={onChange}
          validObj={validObj.email}
          value={dataForm.email}
        />
        <Input
          classInput="register"
          type="tel"
          name="phone"
          autoFocus={false}
          required
          label="Телефон"
          onChange={onChange}
          validObj={validObj.phone}
          value={dataForm.phone}
        />
        <Input
          classInput="register"
          type="password"
          name="password"
          autoFocus={false}
          required
          label="Пароль"
          onChange={onChange}
          validObj={validObj.password}
          value={dataForm.password}
        />
      </PageWithForm>
    </main>
  )
}

export default ComponentWithValidation(Register)
