import { sendApiRequest } from '../apiService';

export const login = async (data: DataAuth) => {
  return await sendApiRequest('/auth/signin', {
    method: 'POST',
    body: { ...data }
  });
};
