import { sendApiRequestDefault, TEAM_NAME, RATING_FIELDNAME } from '../apiService'
import { TLeaderboardItem } from '../../typings/appTypes'

export const updateLeaderboard = async (data: TLeaderboardItem) => {
  return await sendApiRequestDefault('/leaderboard', {
    method: 'POST',
    body: {
      data,
      ratingFieldName: RATING_FIELDNAME,
      teamName: TEAM_NAME,
    },
  })
};
