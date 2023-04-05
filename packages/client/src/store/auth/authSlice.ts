import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from '../../api/methods/login'
import { getCurrentUser } from '../../api/methods/getCurrentUser'
import { signup } from '../../api/methods/signup'

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
      return rejectWithValue('Ошибка авторизации')
    }

    if (!result.ok) {
      return rejectWithValue('Информация о пользователе не получена.')
    }
    return  await result.json()
  }
)

export const signUp = createAsyncThunk(
  'auth/signup',
  async (data: DataRegister, { rejectWithValue, dispatch }) => {
    const result = await signup(data)
    if (!result.ok) {
      return rejectWithValue('В процессе регистрации произошла ошибка')
    }
    dispatch(getUser())
    return
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
    })
      .addCase(signIn.fulfilled, state => {
        state.error = null
        state.loggedIn = true
      })
      .addCase(signIn.rejected, (state, { error }) => {
        console.log(error)
        state.loggedIn = false
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
     .addCase(getUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.error = null
        console.log(state.user)
      })
      .addCase(getUser.rejected, (state, { error }) => {
        console.log(error)
        if (error.message === 'Ошибка авторизации') {
          state.loggedIn = false
        }
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
      .addCase(signUp.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, state => {
        state.loggedIn = true
        state.isLoading = false
        state.error = null
      })
      .addCase(signUp.rejected, (state, { error }) => {
        console.log(error)
        state.loggedIn = false
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
  },
})

export default authSlice.reducer
