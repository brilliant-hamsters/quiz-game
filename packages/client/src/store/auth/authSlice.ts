//Это пример работы redux-toolkit + createAsyncThunk
//Это не до конца готовый слайс для авторизации, требуется добавить signOut, а также getUser (по аналогии с signIn),
// для получения данных авторизированного пользака

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../../api/methods/login'

interface IAuthData {
  login: string,
  password: string
}

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

export const signIn = createAsyncThunk('auth/login', async (data: IAuthData, {rejectWithValue}) => {
  const result = await login(data);
  if (!result.ok) {
    return rejectWithValue('Невозможно выполнить запрос авторизации!');
  }

  return;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }),
    builder.addCase(signIn.fulfilled, (state) => {
      return {
        ...state,
        isLoading: false,
        error: null
      }
    }),
    builder.addCase(signIn.rejected, (state, { error }) => {
      return {
        ...state,
        isLoading: true,
        error: error.message || 'Произошла неизвестная ошибка'
      }
    })
  }
});

export default authSlice.reducer;
