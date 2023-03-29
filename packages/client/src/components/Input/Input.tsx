import { ChangeEvent, FC } from 'react'
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
  minSymbol,
  maxSymbol,
  label,
  onChange,
  value,
  // isValid,
  // errorMessage
}) => {
  return (
    <>
      <label className={`${styles.label} ${styles[`type_${classInput}`]}`}>
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
          onChange={onChange}
          value={value}
        />
        {/* {isValid?<></>:<span className={styles.errorMessage}>{errorMessage}</span>} */}
      </label>
      
    </>
  )
}
