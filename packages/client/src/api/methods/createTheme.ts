import { Theme } from '../../typings/appTypes'
import { sendApiRequestForum } from '../apiService'

export const createTheme = async (data: Pick<Theme, 'theme'>) => {
  return await sendApiRequestForum('/themes', {
    method: 'POST',
    body: data,
  })
}
