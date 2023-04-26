import { useAppSelector } from "../../store";
import { Input } from "../Input";
import styles from "./PageWithProfileForm.module.scss";
import { ChangeEvent, FC, FormEvent } from "react";
import { ValidationObj } from "../../utils/hooks/validation.hook";
import { DataProfile } from "../../typings/appTypes";

type PageWithFormProps = {
    disable: boolean,
    updateUser: () => void,
    validObj: ValidationObj,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    dataForm: DataProfile,  
    isFormValid: boolean,
}

export const PageWithProfileForm: FC<PageWithFormProps> = ({disable, updateUser, validObj, onChange, dataForm, isFormValid}) => {
    const { user, isLoading } = useAppSelector(state => state.profile)
    
    const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateUser()
      }

    return (
        <form action="" className={styles.userDataControl} onSubmit={handlerSubmit} noValidate>
            <fieldset className={styles.fieldset} disabled={disable}>
                            <Input
                                classInput="userData"
                                type="text"
                                name="first_name"
                                autoFocus
                                required
                                label="Имя"
                                onChange={onChange}
                                validObj={validObj.first_name}
                                value={dataForm?.first_name || user?.first_name}
                            />
                            <Input
                                classInput="userData"
                                type="text"
                                name="second_name"
                                autoFocus={false}
                                required
                                label="Фамилия"
                                onChange={onChange}
                                validObj={validObj.second_name}
                                value={dataForm?.second_name || user?.second_name} 
                            />
                            <Input
                                classInput="userData"
                                type="email"
                                name="email"
                                autoFocus={false}
                                required
                                label="Почта"
                                onChange={onChange}
                                validObj={validObj.email}
                                value={dataForm?.email || user?.email}
                            />
                            <Input
                                classInput="userData"
                                type="text"
                                name="display_name"
                                autoFocus={false}
                                required
                                label="Nickname"
                                onChange={onChange}
                                validObj={validObj.display_name}
                                value = {dataForm?.display_name || user?.display_name || ""}
                            />
                            <Input
                                classInput="userData"
                                type="text"
                                name="login"
                                autoFocus={false}
                                required
                                label="Логин"
                                onChange={onChange}
                                validObj={validObj.login}
                                value={dataForm?.login || user?.login}
                            />
                            <Input
                                classInput="userData"
                                type="phone"
                                name="phone"
                                autoFocus={false}
                                required
                                label="Телефон"
                                onChange={onChange}
                                validObj={validObj.phone}
                                value={dataForm?.phone || user?.phone}
                            /> 
                    <button className={styles.button} type="submit" disabled={!isFormValid || isLoading}>Сохранить</button>
            </fieldset>
        </form>
    )
}
