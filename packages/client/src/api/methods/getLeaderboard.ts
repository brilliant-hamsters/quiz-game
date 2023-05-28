import { sendApiRequest, TEAM_NAME, RATING_FIELDNAME } from '../apiService'

export type TGetLeaderboardPayload = {
  cursor: number;
  limit: number;
}

export const getLeaderboard = async ({ cursor, limit }: TGetLeaderboardPayload) => {
  return await sendApiRequest(`/leaderboard/${TEAM_NAME}`, {
    method: 'POST',
    body: {
      cursor,
      limit,
      ratingFieldName: RATING_FIELDNAME,
    }
  });
};
