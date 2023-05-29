import {sendApiRequestDefault} from "../apiService";

export const updateUserAvatar = async (data:FormData) => {
    return await sendApiRequestDefault('/user/profile/avatar', {
      method: 'PUT',
      body: data,
    })
}
