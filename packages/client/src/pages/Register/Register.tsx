import { Input } from '../../components/Input'
import { PageWithForm } from '../../components/PageWithForm/PageWithForm'
import styles from './register.module.scss'

export function Register() {
  return (
    <main className={styles.main}>
      <PageWithForm
        classElement="register"
        title="Регистрация"
        buttonName="Зарегистрироваться"
        isFormValid
        caption="Уже зарегистрированы?"
        path="#"
        linkName="Войти">
        <Input
          classInput="register"
          type="text"
          name="login"
          autoFocus
          required
          minSymbol={2}
          label="Логин"
        />
        <Input
          classInput="register"
          type="text"
          name="first_name"
          autoFocus={false}
          required
          minSymbol={2}
          label="Имя"
        />
        <Input
          classInput="register"
          type="text"
          name="second_name"
          autoFocus={false}
          required
          minSymbol={2}
          label="Фамилия"
        />
        <Input
          classInput="register"
          type="email"
          name="email"
          autoFocus={false}
          required
          minSymbol={2}
          label="Email"
        />
        <Input
          classInput="register"
          type="tel"
          name="phone"
          autoFocus={false}
          required
          minSymbol={2}
          label="Телефон"
        />
        <Input
          classInput="register"
          type="password"
          name="password"
          autoFocus={false}
          required
          minSymbol={2}
          label="Пароль"
        />
      </PageWithForm>
    </main>
  )
}
