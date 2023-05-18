import { sendApiRequest } from '../apiService';

export type SignInYandex = {
    code: string
    redirect_uri: string
}

export const signInWithYandex = async (data: SignInYandex) => {
  return await sendApiRequest('/oauth/yandex', {
    method: 'POST',
    body: data
  });
};

