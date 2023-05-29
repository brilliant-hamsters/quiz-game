import {sendApiRequestDefault} from "../apiService";

export type IUserData = {
    first_name:string;
    second_name:string;
    display_name:string;
    login:string;
    email:string;
    phone:string;
}


export const updateUserData = async (data:IUserData) => {
    return await sendApiRequestDefault('/user/profile', {
      method: 'PUT',
      body: data,
    })
}
