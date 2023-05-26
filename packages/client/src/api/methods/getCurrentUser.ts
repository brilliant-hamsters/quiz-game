import { sendApiRequestDefault } from '../apiService';

export const getCurrentUser = async () => {
  return await sendApiRequestDefault('/auth/user')
};
