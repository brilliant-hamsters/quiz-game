import { sendApiRequestDefault } from '../apiService';

export type SignInYandex = {
    code: string
    redirect_uri: string
}

export const signInWithYandex = async (data: SignInYandex) => {
  return await sendApiRequestDefault('/oauth/yandex', {
    method: 'POST',
    body: data,
  })
};

