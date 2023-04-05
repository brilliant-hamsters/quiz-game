import { FC, FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'
import styles from './pageWithForm.module.scss'

type PageWithFormProps = {
  classElement: string
  title: string
  children: ReactNode
  buttonName: string
  isFormValid: boolean
  caption: string
  path: string
  linkName: string
  onSubmitForm: () => void
  isLoading: boolean
}

export const PageWithForm: FC<PageWithFormProps> = ({
  classElement,
  title,
  children,
  buttonName,
  isFormValid,
  caption,
  path,
  linkName,
  onSubmitForm,
  isLoading,
}) => {
  function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmitForm()
  }
  return (
    <div className={`${styles.root} ${styles[`box_${classElement}`]}`}>
      <div className={styles[`icon_${classElement}`]}></div>
      <h1 className={styles.title}>{title}</h1>
      <form
        className={`${styles.form} ${styles[`form_${classElement}`]}`}
        onSubmit={handlerSubmit}
        noValidate>
        <fieldset className={styles.fieldset} disabled={isLoading}>
          {children}
        </fieldset>
        <div className={styles.control}>
          <Button
            classButton="standard"
            buttonName={buttonName}
            disabled={isLoading||!isFormValid}
          />
          <span className={styles.span}>или</span>
          <Button
            classButton="standard"
            buttonName="Войти с"
            disabled={isLoading||!isFormValid}
            >
            <div className={styles.iconOAuth}></div>
          </Button>
        </div>
        <span className={styles.caption}>
          {caption}
          <Link to={path} className={styles.link}>
            {linkName}
          </Link>
        </span>
      </form>
    </div>
  )
}
