import { sendApiRequest } from '../apiService';

export const getCurrentUser = async () => {
  return await sendApiRequest('/auth/user');
};
