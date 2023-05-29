import { sendApiRequestForum } from '../apiService'

export const getThemesList = async () => {
  return await sendApiRequestForum('/themes')
}
