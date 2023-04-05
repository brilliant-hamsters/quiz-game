import { ChangeEvent, FC } from 'react'
import styles from './input.module.scss'

type InputProps = {
  classInput: string
  type: string
  name: string
  autoFocus: boolean
  required: boolean
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  // isValid:boolean
  // errorMessage:string
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
  // isValid,
  // errorMessage
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
          onChange={onChange}
          value={value}
        />
        {/* {isValid?<></>:<span className={styles.errorMessage}>{errorMessage}</span>} */}
      </label>
  )
}
