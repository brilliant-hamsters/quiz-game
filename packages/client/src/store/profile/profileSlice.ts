import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/methods/updateUserData';
import { updateUserAvatar } from '../../api/methods/updateAvatar';
import { updateUserPassword } from '../../api/methods/updateUserPassword';
interface IUserData {
    first_name:string;
    second_name:string;
    display_name:string;
    login:string;
    email:string;
    phone:string;
}

interface IUserPassword {
  oldPassword:string;
  newPassword:string;
}
interface IInitState {
  user: Record<string, string> | null;
  avatar: Record<string, File> | null;
  password: Record<string, string> | null;
  isLoading: boolean;
  error: null | string
}

const initialState: IInitState = {
  user: null,
  avatar:null,
  password: null,
  isLoading: false,
  error: null
}

export const editUser = createAsyncThunk('user/profile' , async (data: IUserData, {rejectWithValue}) => {
  const result = await updateUserData(data);
  if (!result.ok) {
    return rejectWithValue('Невозможно выполнить запрос!');
  }

return {...result};
});

export const editAvatar = createAsyncThunk('user/profile/avatar', async (data: FormData, {rejectWithValue}) => {
  const result = await updateUserAvatar(data);
  if(!result.ok) {
    return rejectWithValue('Невозможно загрузить аватар');
  }

  return { ...result}
});

export const editPass = createAsyncThunk('user/password', async (data: IUserPassword, {rejectWithValue}) => {
  const result = await updateUserPassword(data);
  if(!result.ok) {
    return rejectWithValue('Невозможно выполнить запрос');
  }

  return { ...result}
});


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editPass.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }),
    builder.addCase(editPass.fulfilled, (state , { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
      }
    }),
    builder.addCase(editPass.rejected, (state, { error }) => {
      return {
        ...state,
        isLoading: true,
        error: error.message || 'Произошла неизвестная ошибка'
      }
    })
    builder.addCase(editAvatar.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }),
    builder.addCase(editAvatar.fulfilled, (state , { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
      }
    }),
    builder.addCase(editAvatar.rejected, (state, { error }) => {
      return {
        ...state,
        isLoading: true,
        error: error.message || 'Произошла неизвестная ошибка'
      }
    })
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
