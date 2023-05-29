import { Message } from '../../typings/appTypes'
import { sendApiRequestForum } from '../apiService'

export const sendMessage = async (data: Message) => {
  return await sendApiRequestForum(`/themes/${data.themeId}`, {
    method: 'POST',
    body: data,
  })
}
