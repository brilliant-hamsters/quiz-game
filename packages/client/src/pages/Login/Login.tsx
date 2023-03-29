import { ChangeEvent, useState } from 'react'
import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import styles from './login.module.scss'
//import { useValidation } from './../../utils/hooks/validation.hook'
//import Api from '../../api/ApiBase'

export function Login() {
  //const [validObj, setValidity] = useValidation()
  const [dataLogin, onChangeDataLogin] = useState<DataAuth>({
    login: '',
    password: '',
  })

  function changeData(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const nameInput = e.target.name
    onChangeDataLogin({ ...dataLogin, [nameInput]: value })
    // setValidity(e)
    // console.log(validObj)
  }

  async function onSubmitForm() {
    //const res = await Api.login(dataLogin)
    //console.log(res)
  }

  return (
    <main className={styles.main}>
      <PageWithForm
        classElement="login"
        title="Авторизация"
        buttonName="Войти"
        isFormValid
        caption="Нет аккаунта?"
        path="#"
        linkName="Зарегистрироваться"
        onSubmitForm={onSubmitForm}>
        <Input
          classInput="login"
          type="text"
          name="login"
          autoFocus
          required
          minSymbol={2}
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
          autoFocus
          required
          minSymbol={2}
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
