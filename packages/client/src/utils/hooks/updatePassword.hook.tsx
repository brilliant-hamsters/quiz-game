import { DataProfile } from "../../typings/appTypes";
import { editPass } from "../../store/profile/profileSlice";
type updatePasswordProps = {
    styles: CSSModuleClasses,
    dataForm: DataProfile,
    dispatch: any,
    setEditPassword: React.Dispatch<React.SetStateAction<boolean>>,
    isEditPassword: boolean,
}


export const updateByPassword = ({
    styles, 
    dataForm, 
    dispatch, 
    setEditPassword, 
    isEditPassword
    }: 
    updatePasswordProps ) => {
    const errorPass = document.querySelector<HTMLSpanElement>(`.${styles.errorPass}`);

        if(dataForm.newPassword && dataForm.oldPassword) {
            const editPasswordData =  {
                newPassword: dataForm.newPassword,
                oldPassword: dataForm.oldPassword        
              } 
            dispatch(editPass(editPasswordData)).then((response) => {
                if(errorPass) {
                    errorPass.textContent = response.payload as string;
                    if(response.payload !== 'Некорректный старый пароль!' 
                    && response.payload !== 'Невозможно выполнить запрос!') {
                        errorPass.textContent = "";
                        setEditPassword(!isEditPassword);   
                    }
                }
                
            });
        } 
}

