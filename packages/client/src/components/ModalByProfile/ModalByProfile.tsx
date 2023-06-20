import { ValidationObj } from "../../utils/hooks/validation.hook"
import { Input } from "../Input"
import styles from "./ModalByProfile.module.scss"

type ModalProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    validObj: ValidationObj,
    addModal: React.MouseEventHandler,
    updatePassword: (event: React.SyntheticEvent) => void,
}

export const ModalByProfile = ({onChange, validObj, addModal, updatePassword}: ModalProps) => {
    return (
        <div className={styles.root}>
                            <div className={styles.modal}>
                                <div className={styles.header}>Изменение пароля
                                    <button className={styles.btnClose} onClick={addModal} >
                                        X
                                    </button>
                                </div>
                                <form action="" className={styles.form} onSubmit={updatePassword} noValidate>
                                    <Input
                                        classInput="password"
                                        type="password"
                                        name="oldPassword"
                                        autoFocus
                                        required
                                        label="Старый"
                                        onChange={onChange}
                                        validObj={validObj.oldPassword}
                                        value={undefined}
                                    />
                                    <Input
                                        classInput="password"
                                        type="password"
                                        name="newPassword"
                                        autoFocus={false}
                                        required
                                        label="Новый"
                                        onChange={onChange}
                                        validObj={validObj.newPassword}
                                        value={undefined}
                                    />
                                        <span className={styles.errorMessage} />
                                    <input className={styles.btnSave} type="submit" value="Сохранить" />
                                </form>
                            </div>
                        </div>
    )
}
