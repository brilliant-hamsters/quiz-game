import { FC, ReactNode } from 'react'
import { Button } from '../Button/Button'
import styles from './pageWithForm.module.scss'

type PageWithFormProps = {
  iconClass: string
  title: string
  children: ReactNode
  buttonName: string
  isFormValid: boolean
  caption: string
  path: string
  linkName: string
}

export const PageWithForm: FC<PageWithFormProps> = ({
  iconClass,
  title,
  children,
  buttonName,
  isFormValid,
  caption,
  path,
  linkName,
}) => {
  return (
    <div className={styles.box}>
      <div className={styles[iconClass]}></div>
      <h1 className={styles.title}>{title}</h1>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>{children}</fieldset>
        <div className={styles.control}>
          <Button
            classButton={styles.buttonSubmit}
            buttonName={buttonName}
            isFormValid={isFormValid}
          />
          <span className={styles.span}>или</span>
          <Button
            classButton={styles.buttonSubmit}
            buttonName="Войти с"
            isFormValid={isFormValid}>
            <div className={styles.iconOAuth}></div>
          </Button>
        </div>
        <span className={styles.caption}>
          {caption}
          <a href={path}>{linkName}</a>
        </span>
      </form>
    </div>
  )
}
