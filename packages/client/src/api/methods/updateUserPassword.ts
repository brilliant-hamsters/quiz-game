import {sendApiRequestDefault} from "../apiService";

export type IUserPassword = {
    oldPassword:string;
    newPassword:string;
}


export const updateUserPassword = async (data:IUserPassword) => {
    return await sendApiRequestDefault('/user/password', {
      method: 'PUT',
      body: data,
    })
}
