import { DataAuth } from '../../typings/appTypes';
import { sendApiRequestDefault } from '../apiService';

export const login = async (data: DataAuth) => {
  return await sendApiRequestDefault('/auth/signin', {
    method: 'POST',
    body: data,
  })
};
