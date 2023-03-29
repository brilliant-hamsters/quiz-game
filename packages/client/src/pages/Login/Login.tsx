import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import styles from './login.module.scss'

export function Login() {
  return (
    <main className={styles.main}>
      <PageWithForm
        iconClass="iconLogin"
        title="Авторизация"
        buttonName="Войти"
        isFormValid
        caption="Нет аккаунта?"
        path="#"
        linkName="Зарегистрироваться">
        <Input
          type="text"
          name="login"
          autoFocus
          required
          minSymbol={2}
          label="Логин"
        />
        <Input
          type="password"
          name="password"
          autoFocus
          required
          minSymbol={2}
          label="Пароль"
        />
      </PageWithForm>
    </main>
  )
}