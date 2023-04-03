import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import styles from './register.module.scss'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../store/auth/authSlice'

export function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loggedIn, isLoading } = useAppSelector(state => state.auth)
  const [dataRegister, onChangeDataRegister] = useState<DataRegister>({
    login: '',
    first_name: '',
    second_name: '',
    password: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (loggedIn === true) navigate('/')
  }, [loggedIn])

  function onChange(nameInput: string, value: string) {
    onChangeDataRegister({ ...dataRegister, [nameInput]: value })
  }

  function onSubmitForm() {
    dispatch(signUp(dataRegister))
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
          value={dataRegister.login}
        />
        <Input
          classInput="register"
          type="text"
          name="first_name"
          autoFocus={false}
          required
          label="Имя"
          onChange={onChange}
          value={dataRegister.first_name}
        />
        <Input
          classInput="register"
          type="text"
          name="second_name"
          autoFocus={false}
          required
          label="Фамилия"
          onChange={onChange}
          value={dataRegister.second_name}
        />
        <Input
          classInput="register"
          type="email"
          name="email"
          autoFocus={false}
          required
          label="Email"
          onChange={onChange}
          value={dataRegister.email}
        />
        <Input
          classInput="register"
          type="tel"
          name="phone"
          autoFocus={false}
          required
          label="Телефон"
          onChange={onChange}
          value={dataRegister.phone}
        />
        <Input
          classInput="register"
          type="password"
          name="password"
          autoFocus={false}
          required
          label="Пароль"
          onChange={onChange}
          value={dataRegister.password}
        />
      </PageWithForm>
    </main>
  )
}
