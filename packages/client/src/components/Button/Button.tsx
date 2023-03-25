import { FC, ReactNode } from 'react'
import styles from './button.module.scss'

export type ButtonProps = {
  classButton: string
  buttonName: string
  isFormValid: boolean
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  classButton,
  buttonName,
  isFormValid,
  children,
}) => {
  return (
    <button
      type="submit"
      className={styles[classButton]}
      disabled={!isFormValid}>
      {buttonName}
      {children}
    </button>
  )
}
