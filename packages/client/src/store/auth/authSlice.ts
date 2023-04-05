import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from '../../api/methods/login'
import { getCurrentUser } from '../../api/methods/getCurrentUser'

interface IInitState {
  user: Record<string, string> | null
  isLoading: boolean
  error: null | string
  loggedIn: boolean
}

const initialState: IInitState = {
  user: null,
  isLoading: false,
  error: null,
  loggedIn: false,
}

export const signIn = createAsyncThunk(
  'auth/login',
  async (data: DataAuth, { rejectWithValue, dispatch }) => {
    const result = await login(data)
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос авторизации!')
    }
    dispatch(getUser())
    return
  }
)

export const getUser = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue }) => {
    const result = await getCurrentUser()
    if (result.status === 401) {
      return rejectWithValue(result.status)
    }

    if (!result.ok) {
      return rejectWithValue('Информация о пользователе не получена.')
    }
    return result
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.isLoading = true
      state.error = null
    }),
      builder.addCase(signIn.fulfilled, state => {
        state.error = null
        state.loggedIn = true
      }),
      builder.addCase(signIn.rejected, (state, { error }) => {
        console.log(error.message)
        state.loggedIn = false
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      }),
      builder.addCase(getUser.pending, state => {
        state.isLoading = true
        state.error = null
      }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.error = null
      }),
      builder.addCase(getUser.rejected, (state, { error }) => {
        console.log(error.message)
        if (error.message === '401') {
          state.loggedIn = false
        }
        state.loggedIn = false
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
        console.log(state.loggedIn)
      })
  },
})

export default authSlice.reducer
