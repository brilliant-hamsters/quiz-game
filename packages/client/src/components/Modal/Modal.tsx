import { FormEvent, MouseEvent } from 'react'
import { DataMessage } from '../../typings/appTypes'
import {
  ComponentWithValidation,
  CustomComponentProps,
} from '../../utils/hoc/ComponentWithValidation'
import { Button } from '../Button'
import { Input } from '../Input'
import styles from './modal.module.css'

export interface ModalProps extends CustomComponentProps {
  dataForm: DataMessage
  isOpen: boolean
  onSubmit: (theme: string) => void
  onClose: () => void
}

function Modal({ isOpen, onClose, onSubmit, validObj, onChange, dataForm }: ModalProps) {
  function submitForm(evt: FormEvent) {
    evt.preventDefault()
    onSubmit(dataForm.text)
  }

function stopClose(evt:MouseEvent<HTMLElement>) {
  evt.stopPropagation()
}

  return (
    <div className={`${styles.root} ${isOpen ? styles.root_opened : ''}`} onClick={onClose}>
      <form className={styles.container} onSubmit={submitForm} onClick={stopClose}>
        <h3 className={styles.title}>Введите название темы</h3>
        <Input
          classInput="modal"
          type="text"
          name="text"
          autoFocus
          required
          onChange={onChange}
          validObj={validObj.text}
          value={dataForm.text}
        />
        <Button
          classButton="standard"
          buttonName="Создать тему"
          disabled={false}
        />
      </form>
    </div>
  )
}

export default ComponentWithValidation(Modal)
