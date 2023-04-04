import { FC, ReactNode } from 'react'
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
}) => {
  return (
    <div className={`${styles.root} ${styles[`box_${classElement}`]}`}>
      <div className={styles[`icon_${classElement}`]}></div>
      <h1 className={styles.title}>{title}</h1>
      <form className={`${styles.form} ${styles[`form_${classElement}`]}`}>
        <fieldset className={styles.fieldset}>{children}</fieldset>
        <div className={styles.control}>
          <Button
            classButton="standard"
            buttonName={buttonName}
            isFormValid={isFormValid}
          />
          <span className={styles.span}>или</span>
          <Button
            classButton="standard"
            buttonName="Войти с"
            isFormValid={isFormValid}>
            <div className={styles.iconOAuth}></div>
          </Button>
        </div>
        <span className={styles.caption}>
          {caption}
          <a href={path} className={styles.link}>{linkName}</a>
        </span>
      </form>
    </div>
  )
}
