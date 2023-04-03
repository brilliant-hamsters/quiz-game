import { FC, ReactNode } from 'react'
import styles from './button.module.scss'

export type ButtonProps = {
  classButton: string
  buttonName: string
  //isFormValid: boolean
  children?: ReactNode
  disabled:boolean
}

export const Button: FC<ButtonProps> = ({
  classButton,
  buttonName,
  //isFormValid,
  children,
  disabled
}) => {
  return (
    <button
      type="submit"
      className={`${styles.root} ${styles[classButton]}`}
      disabled={disabled}>
      {buttonName}
      {children}
    </button>
  )
}
