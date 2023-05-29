import { sendApiRequestForum } from '../apiService'

export const getMessages = async (id:number) => {
  return await sendApiRequestForum(`/themes/${id}/messages`)
}
