import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import { useAppDispatch, useAppSelector } from '../../store'
import { serviceId, signIn } from '../../store/auth/authSlice'
import { DataAuth } from '../../typings/appTypes'
import styles from './login.module.scss'
import {
  ComponentWithValidation,
  CustomComponentProps,
} from '../../utils/hoc/ComponentWithValidation'

export interface LoginProps extends CustomComponentProps {
  dataForm: DataAuth
}

function Login({ validObj, onChange, dataForm }: LoginProps) {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loggedIn, isLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (loggedIn) navigate('/start')
  }, [loggedIn])

  function onSubmitForm() {
    dispatch(signIn(dataForm))
  }

  function onOauthSubmt() {
    dispatch(serviceId({redirect_uri: 'https://quiz-game-client.vercel.app/start'})).then((response) => {
      if(response.payload.service_id) {
         window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${response.payload.service_id}&redirect_uri=https://quiz-game-client.vercel.app/start`);
        }
    })
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
        onOauth={onOauthSubmt}
        isLoading={isLoading}>
        <Input
          classInput="login"
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
          classInput="login"
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

export default ComponentWithValidation(Login)
