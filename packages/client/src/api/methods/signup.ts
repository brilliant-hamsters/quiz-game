import { DataRegister } from '../../typings/appTypes';
import { sendApiRequest } from '../apiService';

export const signup = async (data: DataRegister) => {
  return await sendApiRequest('/auth/signup', {
    method: 'POST',
    body: data
  });
};
