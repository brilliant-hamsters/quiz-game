import {sendApiRequest} from "../apiService";

interface IUserPassword {
    oldPassword:string;
    newPassword:string;
}


export const updateUserData = async (data:IUserPassword) => {
    return await sendApiRequest('/user/password', {
        method: "PUT",
        body: {...data}
    })
}
