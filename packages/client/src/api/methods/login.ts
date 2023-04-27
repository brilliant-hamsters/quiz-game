import { sendApiRequest } from '../apiService';

interface ILoginData {
  login: string;
  password: string
}

export const login = async (data: ILoginData) => {
  return await sendApiRequest('/auth/signin', {
    method: 'POST',
    body: { ...data }
  });
};
