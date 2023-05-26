import { Theme } from '../../typings/appTypes'
import { sendApiRequestForum } from '../apiService'

export const createTheme = async (data:Theme) => {
  return await sendApiRequestForum('/themes', {
    method: 'POST',
    body: data,
  })
}
