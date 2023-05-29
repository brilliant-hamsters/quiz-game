import { sendApiRequestDefault } from '../apiService';

export type ServiceIdCallArgs = {
    redirect_uri: string
}

export const getServiceID = async (data: ServiceIdCallArgs) => {
  return await sendApiRequestDefault(
    `/oauth/yandex/service-id?redirect_uri=${data.redirect_uri}`,
    {
      method: 'GET',
      body: data,
    }
  )
};
