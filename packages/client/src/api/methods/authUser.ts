import { sendApiRequestForum } from '../apiService'

export const authUser = async (id: number) => {
  return await sendApiRequestForum('/authUser', {
    method: 'POST',
    body: { userId: id },
  })
}
