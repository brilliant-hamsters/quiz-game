import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import { useAppDispatch, useAppSelector } from '../../store'
import { signIn } from '../../store/auth/authSlice'
import styles from './login.module.scss'

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loggedIn, isLoading } = useAppSelector(state => state.auth)
  const [dataLogin, onChangeDataLogin] = useState<DataAuth>({
    login: '',
    password: '',
  })

  useEffect(() => {
    if (loggedIn === true) navigate('/')
  }, [loggedIn])

  function onChange(nameInput: string, value: string) {
    onChangeDataLogin({ ...dataLogin, [nameInput]: value })
  }

  function onSubmitForm() {
    dispatch(signIn(dataLogin))
  }

  return (
    <main className={styles.main}>
      <PageWithForm
        classElement="login"
        title="Авторизация"
        buttonName="Войти"
        isFormValid
        caption="Нет аккаунта?"
        path="/sign_up"
        linkName="Зарегистрироваться"
        onSubmitForm={onSubmitForm}
        isLoading={isLoading}>
        <Input
          classInput="login"
          type="text"
          name="login"
          autoFocus
          required
          label="Логин"
          onChange={onChange}
          value={dataLogin.login}
        />
        <Input
          classInput="login"
          type="password"
          name="password"
          autoFocus={false}
          required
          label="Пароль"
          onChange={onChange}
          value={dataLogin.password}
        />
      </PageWithForm>
    </main>
  )
}
