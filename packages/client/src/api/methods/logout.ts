import { sendApiRequest } from '../apiService';

export const logout = async () => {
  return await sendApiRequest('/auth/signin', {
    method: 'POST',
  });
};
