//Это пример работы redux-toolkit + createAsyncThunk
//Это не до конца готовый слайс для авторизации, требуется добавить signOut, а также getUser (по аналогии с signIn),
// для получения данных авторизированного пользака

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/methods/updateUserData';

interface IUserData {
    first_name:string;
    second_name:string;
    display_name:string;
    login:string;
    email:string;
    phone:string;
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

export const editUser = createAsyncThunk('/user/profile' , async (data: IUserData, {rejectWithValue}) => {
  const result = await updateUserData(data);
if (!result.ok) {
  return rejectWithValue('Невозможно выполнить запрос!');
}

return {...result};
})


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editUser.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }),
    builder.addCase(editUser.fulfilled, (state , { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        user: payload.data
      }
    }),
    builder.addCase(editUser.rejected, (state, { error }) => {
      return {
        ...state,
        isLoading: true,
        error: error.message || 'Произошла неизвестная ошибка'
      }
    })
  }
});

export default profileSlice.reducer;
