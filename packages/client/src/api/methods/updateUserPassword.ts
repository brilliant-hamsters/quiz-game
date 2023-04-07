import {sendApiRequest} from "../apiService";

export type IUserPassword = {
    oldPassword:string;
    newPassword:string;
}


export const updateUserPassword = async (data:IUserPassword) => {
    return await sendApiRequest('/user/password', {
        method: "PUT",
        body: data
    })
}
