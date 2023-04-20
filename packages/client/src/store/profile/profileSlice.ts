import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/methods/updateUserData';
import { updateUserAvatar } from '../../api/methods/updateAvatar';
import { updateUserPassword } from '../../api/methods/updateUserPassword';
import { IUserData } from '../../api/methods/updateUserData';
import { IUserPassword } from '../../api/methods/updateUserPassword';

interface IInitState {
  user: IUserData | null;
  isLoading: boolean;
  error: null | string
}

const initialState: IInitState = {
  user: null,
  isLoading: false,
  error: null
}

export const editUser = createAsyncThunk('user/profile' , async (data: IUserData, {rejectWithValue}) => {
  const result = await updateUserData(data);
  if (!result.ok) {
    return rejectWithValue('Невозможно выполнить запрос!');
  }

return await result.json();
});

export const editAvatar = createAsyncThunk('user/profile/avatar', async (data: FormData, {rejectWithValue}) => {
  const result = await updateUserAvatar(data);
  if(!result.ok) {
    return rejectWithValue('Невозможно загрузить аватар');
  }

  return result;
});

export const editPass = createAsyncThunk('user/password', async (data: IUserPassword, {rejectWithValue}) => {
  const result = await updateUserPassword(data);
  if(!result.ok) {
    return rejectWithValue('Невозможно выполнить запрос');
  }

  return;
});


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editPass.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(editPass.fulfilled, (state) => {
      state.isLoading = false
      state.error = null
    })
    .addCase(editPass.rejected, (state, { error }) => {
      state.isLoading = false
      state.error = error.message || 'Произошла неизвестная ошибка'
    })
    .addCase(editAvatar.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(editAvatar.fulfilled, (state) => {
      state.isLoading = false
      state.error = null
    })
    .addCase(editAvatar.rejected, (state, { error }) => {
      state.isLoading = false
      state.error = error.message || 'Произошла неизвестная ошибка'
    })
    .addCase(editUser.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(editUser.fulfilled, (state , { payload }) => {
      state.isLoading = false
      state.error = null
      state.user = payload.data
    })
    .addCase(editUser.rejected, (state, { error }) => {
      state.isLoading = false
      state.error = error.message || 'Произошла неизвестная ошибка'
    })
  }
});

export default profileSlice.reducer;
