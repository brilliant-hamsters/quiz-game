import { sendApiRequestForum } from "../apiService";

type Theme = {
    theme: string 
}

export const updateTheme = async (data:Theme) => {
  return await sendApiRequestForum('/theme', {
    method: 'PUT',
    body: data
  })
};
