import { FC, ReactNode } from 'react'
import styles from './button.module.scss'

export type ButtonProps = {
  classButton: string
  buttonName: string
  children?: ReactNode
  disabled: boolean
  onSubmit?: (event:React.SyntheticEvent) => void
  onClick?: (e:React.SyntheticEvent) => void
}

export const Button: FC<ButtonProps> = ({
  classButton,
  buttonName,
  children,
  disabled,
  onSubmit,
  onClick
}) => {
  return (
    <button
      type="submit"
      className={`${styles.root} ${styles[classButton]}`}
      onSubmit={onSubmit}
      onClick={onClick}
      disabled={disabled}>
      {buttonName}
      {children}
    </button>
  )
}
