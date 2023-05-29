import { sendApiRequestDefault } from '../apiService';

export const logout = async () => {
  return await sendApiRequestDefault('/auth/logout', {
    method: 'POST',
  })
};
