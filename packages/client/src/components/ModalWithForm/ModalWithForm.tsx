import { FormEvent, MouseEvent } from 'react'
import { DataMessage } from '../../typings/appTypes'
import {
  ComponentWithValidation,
  CustomComponentProps,
} from '../../utils/hoc/ComponentWithValidation'
import { Button } from '../Button'
import { Input } from '../Input'
import styles from './modalWithForm.module.css'

export interface ModalWithFormProps extends CustomComponentProps {
  dataForm: DataMessage
  isOpen: boolean
  onSubmit: (theme: string) => void
  onClose: () => void
  title: string
  buttonName: string
}

function ModalWithForm({
  isOpen,
  onClose,
  onSubmit,
  validObj,
  onChange,
  clearValue,
  dataForm,
  title,
  buttonName,
}: ModalWithFormProps) {
  function submitForm(evt: FormEvent) {
    evt.preventDefault()
    onSubmit(dataForm.message)
    clearValue()
  }

  function stopClose(evt: MouseEvent<HTMLElement>) {
    evt.stopPropagation()
  }

  return (
    <div
      className={`${styles.root} ${isOpen ? styles.root_opened : ''}`}
      onClick={onClose}>
      <form
        className={styles.container}
        onSubmit={submitForm}
        onClick={stopClose}
        noValidate>
        <h3 className={styles.title}>{title}</h3>
        <Input
          classInput="modal"
          type="text"
          name="message"
          autoFocus
          required
          onChange={onChange}
          validObj={validObj.message}
          value={dataForm.message}
        />
        <Button
          classButton="standard"
          buttonName={buttonName}
          disabled={validObj.message?!validObj.message.valid:true}
        />
      </form>
    </div>
  )
}

export default ComponentWithValidation(ModalWithForm)
