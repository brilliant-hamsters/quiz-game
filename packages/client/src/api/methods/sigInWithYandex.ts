import { sendApiRequest } from '../apiService';

export type SigInYandex = {
    code: string
    redirect_uri: string
}

export const sigInWithYandex = async (data: SigInYandex) => {
  return await sendApiRequest('/oauth/yandex', {
    method: 'POST',
    body: data
  });
};

