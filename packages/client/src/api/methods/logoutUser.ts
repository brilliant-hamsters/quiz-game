import { sendApiRequestForum } from '../apiService'

export const logouthUser = async (id: number) => {
  return await sendApiRequestForum('/authUser', {
    method: 'DELETE',
    body: { userId: id },
  })
}
