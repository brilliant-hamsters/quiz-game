import { FC } from 'react'
import styles from './input.module.scss'

type InputProps = {
  classInput: string
  type: string
  name: string
  autoFocus: boolean
  required: boolean
  minSymbol?: number
  maxSymbol?: number
  label: string
}

export const Input: FC<InputProps> = ({
  classInput,
  type,
  name,
  autoFocus,
  required,
  minSymbol,
  maxSymbol,
  label,
}) => {
  return (
    <label className={`${styles.root} ${styles[`type_${classInput}`]}`}>
      {label}
      <input
        type={type}
        className={styles.input}
        name={name}
        id={`input-${name}`}
        autoFocus={autoFocus}
        required={required}
        minLength={minSymbol}
        maxLength={maxSymbol}
      />
    </label>
  )
}
