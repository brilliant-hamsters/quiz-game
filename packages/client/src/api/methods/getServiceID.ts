import { sendApiRequest } from '../apiService';

export type ServiceIdCallArgs = {
    redirect_uri: string
}

export const getServiceID = async (data: ServiceIdCallArgs) => {
  return await sendApiRequest(`/oauth/yandex/service-id?redirect_uri=${data.redirect_uri}`, {
    method: 'GET',
    body: data
  });
};
