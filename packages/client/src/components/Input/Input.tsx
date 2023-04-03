import { ChangeEvent, FC } from 'react'
import styles from './input.module.scss'

type InputProps = {
  classInput: string
  type: string
  name: string
  autoFocus: boolean
  required: boolean
  label: string
  onChange: (nameInput: string, value: string) => void
  value: string
}

export const Input: FC<InputProps> = ({
  classInput,
  type,
  name,
  autoFocus,
  required,
  label,
  onChange,
  value,
}) => {
  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const nameInput = e.target.name
    onChange(nameInput, value)
  }
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
        onChange={handlerChange}
        value={value}
      />
    </label>
  )
}
