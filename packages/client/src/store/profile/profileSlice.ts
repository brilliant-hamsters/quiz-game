import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/methods/updateUserData';
import { updateUserAvatar } from '../../api/methods/updateAvatar';
import { updateUserPassword } from '../../api/methods/updateUserPassword';
import { IUserData } from '../../api/methods/updateUserData';
import { IUserPassword } from '../../api/methods/updateUserPassword';
import { getCurrentUser } from '../../api/methods/getCurrentUser';
import { useAppDispatch } from '..';

interface IInitState {
  user: Record<string, string> | null;
  isLoading: boolean;
  error: null | string
}

const initialState: IInitState = {
  user: null,
  isLoading: false,
  error: null
}

export const getUser = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue }) => {
    const result = await getCurrentUser()
    if (result.status === 401) {
      return rejectWithValue('Ошибка авторизации')
    }

    if (!result.ok) {
      return rejectWithValue('Информация о пользователе не получена.')
    }
    return await result.json()
  }
)

export const editUser = createAsyncThunk(
  'user/profile', 
  async (data: IUserData, {rejectWithValue, dispatch}) => {
  const result = await updateUserData(data);
  if (!result.ok) {
    return rejectWithValue('Невозможно выполнить запрос!');
  }
  dispatch(getUser())
  return ;
});


export const editAvatar = createAsyncThunk('user/profile/avatar', async (data: FormData, {rejectWithValue, dispatch}) => {
  const result = await updateUserAvatar(data);
  if(!result.ok) {
    return rejectWithValue('Невозможно загрузить аватар');
  }
  dispatch(getUser())
  return result;
});

export const editPass = createAsyncThunk('user/password', async (data: IUserPassword, {rejectWithValue}) => {
  const result = await updateUserPassword(data);
  const errPass = document.querySelector<HTMLSpanElement>('.errorMess');
  if(!result.ok) {
    if(errPass) {
      errPass.style.opacity = "1"
    }
    return rejectWithValue('Невозможно выполнить запрос');
  }
  if(errPass) {
    errPass.style.opacity = "0"
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
    .addCase(editUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = null 
    })
    .addCase(editUser.rejected, (state, { error }) => {
      state.isLoading = false
      state.error = error.message || 'Произошла неизвестная ошибка'
    })
  }
});

export default profileSlice.reducer;
