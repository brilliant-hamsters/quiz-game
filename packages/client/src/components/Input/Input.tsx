import { ChangeEvent, FC, useState } from 'react'
import styles from './input.module.scss'
import { ValidationObj } from '../../utils/hooks/validation.hook'

type InputProps = {
  classInput: string
  type: string
  name: string
  autoFocus: boolean
  required: boolean
  label?: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string | undefined
  validObj: ValidationObj[keyof ValidationObj]
}


export const Input: FC<InputProps> = ({
  classInput,
  type,
  name,
  autoFocus,
  required,
  label,
  placeholder,
  onChange,
  value,
  validObj
}) => {
  const [inputValue, setInputValue] = useState(value);

  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e);
    setInputValue(e.target.value)
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
        value={inputValue}
        placeholder={placeholder}

      /> {validObj?.valid?<></>:<span className={styles.errorMessage}>{validObj?.text}</span>}
    </label>
  )
}
