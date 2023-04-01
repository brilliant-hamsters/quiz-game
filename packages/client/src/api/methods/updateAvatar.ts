import {sendApiRequest} from "../apiService";

interface IUserAvatar {
    avatar:string;
}


export const updateUserAvatar = async (data:IUserAvatar) => {
    return await sendApiRequest('/user/profile/avatar', {
        method: "PUT",
        body: {...data}
    })
}
