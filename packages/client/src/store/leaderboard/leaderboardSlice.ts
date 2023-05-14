import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TGetLeaderboardPayload, getLeaderboard } from '../../api/methods/getLeaderboard'
import { updateLeaderboard } from '../../api/methods/updateLeaderboard'
import { TLeaderboardItem } from '../../typings/appTypes'

interface IInitialState {
  leaderboard: Record<'data', TLeaderboardItem>[];
  isLoading: boolean;
  error: null | string
}

const initialState: IInitialState = {
  leaderboard: [],
  isLoading: false,
  error: null
}

export const getLeaderboardData = createAsyncThunk(
  'leaderboard/fetchLeaderboardData',
  async (data: TGetLeaderboardPayload, {rejectWithValue}) => {
    const result = await getLeaderboard(data);
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос!');
    }
    return await result.json();
  });

export const updateLeaderboardData = createAsyncThunk(
  'leaderboard/updateLeaderboardData',
  async (data: TLeaderboardItem, {fulfillWithValue, rejectWithValue}) => {
    const result = await updateLeaderboard(data);
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос!');
    }

    fulfillWithValue('OK')
  });

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardData.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getLeaderboardData.fulfilled, (state, action) => {
        state.leaderboard = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getLeaderboardData.rejected, (state, { error }) => {
        console.log(error)
        state.isLoading = false
      })
      .addCase(updateLeaderboardData.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateLeaderboardData.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(updateLeaderboardData.rejected, (state, { error }) => {
        console.log(error)
        state.isLoading = false
      })
  }
});

export default leaderboardSlice.reducer;
