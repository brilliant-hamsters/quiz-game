import { useAppSelector } from "../../store";
import { Input } from "../Input";
import styles from "./PageWithProfileForm.module.scss";
import { ChangeEvent, FC, FormEvent } from "react";
import { ValidationObj } from "../../utils/hooks/validation.hook";

type PageWithFormProps = {
    check: boolean,
    updateUser: () => void,
    validObj: ValidationObj,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    
}

export const PageWithProfileForm: FC<PageWithFormProps> = ({check, updateUser, validObj, onChange}) => {
    
    const { user } = useAppSelector(state => state.auth)

    function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        updateUser()
      }

    return (
        <form action="" className={styles.userDataControl} onSubmit={handlerSubmit}>
            <fieldset className={styles.fieldset} disabled={check}>
                            <Input
                                classInput="userData"
                                type="text"
                                name="first_name"
                                autoFocus
                                required
                                label="Имя"
                                onChange={onChange}
                                validObj={validObj.first_name}
                                value={undefined}
                                placeholder={user?.first_name}
                                />
                            <Input
                                classInput="userData"
                                type="text"
                                name="second_name"
                                autoFocus
                                required
                                label="Фамилия"
                                onChange={onChange}
                                validObj={validObj.second_name}
                                value={undefined}
                                placeholder={user?.second_name}
                                />
                            <Input
                                classInput="userData"
                                type="email"
                                name="email"
                                autoFocus
                                required
                                label="Почта"
                                onChange={onChange}
                                validObj={validObj.email}
                                value={undefined}
                                placeholder={user?.email}
                                />
                                <Input
                                    classInput="userData"
                                    type="text"
                                    name="display_name"
                                    autoFocus
                                    required
                                    label="Nickname"
                                    onChange={onChange}
                                    validObj={validObj.display_name}
                                    value = {undefined}
                                    placeholder={user?.display_name}
                                    />
                            <Input
                                classInput="userData"
                                type="text"
                                name="login"
                                autoFocus
                                required
                                label="Логин"
                                onChange={onChange}
                                validObj={validObj.login}
                                value={undefined}
                                placeholder={user?.login}
                                />
                            <Input
                                classInput="userData"
                                type="phone"
                                name="phone"
                                autoFocus
                                required
                                label="Телефон"
                                onChange={onChange}
                                validObj={validObj.phone}
                                value={undefined}
                                placeholder={user?.phone}
                                /> 
                    <button className={styles.button} type="submit" disabled={check}>Сохранить</button>
            </fieldset>
        </form>
    )
}
