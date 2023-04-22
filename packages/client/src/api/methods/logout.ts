import { sendApiRequest } from '../apiService';

export const logout = async () => {
  return await sendApiRequest('/auth/logout', {
    method: 'POST',
  });
};
