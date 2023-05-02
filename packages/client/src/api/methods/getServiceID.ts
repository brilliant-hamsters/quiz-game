import { sendApiRequest } from '../apiService';

export type ServiceID = {
    redirect_uri: string
}

export const getServiceID = async (data: ServiceID) => {
  return await sendApiRequest('/oauth/yandex/service-id', {
    method: 'GET',
    body: data
  });
};
