import {sendApiRequest} from "../apiService";

export const updateUserAvatar = async (data:FormData) => {
    return await sendApiRequest('/user/profile/avatar', {
        method: "PUT",
        body: {...data}
    })
}
