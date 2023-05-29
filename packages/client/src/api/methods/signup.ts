import { DataRegister } from '../../typings/appTypes';
import { sendApiRequestDefault } from '../apiService';

export const signup = async (data: DataRegister) => {
  return await sendApiRequestDefault('/auth/signup', {
    method: 'POST',
    body: data,
  })
};
