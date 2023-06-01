import { sendApiRequestForum } from "../apiService";


export const getByTheme = async () => {
  return await sendApiRequestForum('/theme', {
    method: 'GET',
  })
};
