import { ChangeEvent, FC } from 'react'
import styles from './input.module.scss'
import { ValidationObj } from '../../utils/hooks/validation.hook'

type InputProps = {
  classInput: string
  type: string
  name: string
  autoFocus: boolean
  required: boolean
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  validObj: ValidationObj[keyof ValidationObj]
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
  validObj
}) => {
  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e)
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
       
      /> {validObj?.valid?<></>:<span className={styles.errorMessage}>{validObj?.text}</span>}
    </label>
  )
}
