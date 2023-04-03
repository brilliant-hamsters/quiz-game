import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import { useAppDispatch, useAppSelector } from '../../store'
import { signIn } from '../../store/auth/authSlice'
import styles from './login.module.scss'
//import { useValidation } from './../../utils/hooks/validation.hook'
//import Api from '../../api/ApiBase'

export function Login() {
  //const [validObj, setValidity] = useValidation()
  const [dataLogin, onChangeDataLogin] = useState<DataAuth>({
    login: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const { loggedIn, isLoading } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn === true) navigate('/')
  }, [loggedIn])

  function changeData(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const nameInput = e.target.name
    onChangeDataLogin({ ...dataLogin, [nameInput]: value })
    // setValidity(e)
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
          onChange={changeData}
          value={dataLogin.login}
          // isValid={validObj.login?.valid}
          // errorMessage={validObj.login?.text}
        />
        <Input
          classInput="login"
          type="password"
          name="password"
          autoFocus={false}
          required
          label="Пароль"
          onChange={changeData}
          value={dataLogin.password}
          // isValid={validObj.password?.valid}
          // errorMessage={validObj.password?.text}
        />
      </PageWithForm>
    </main>
  )
}
