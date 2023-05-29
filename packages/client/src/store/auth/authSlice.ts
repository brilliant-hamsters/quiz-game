import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from '../../api/methods/login'
import { getCurrentUser } from '../../api/methods/getCurrentUser'
import { signup } from '../../api/methods/signup'
import { DataAuth, DataRegister } from '../../typings/appTypes'
import { logout } from '../../api/methods/logout'
import { ServiceIdCallArgs, getServiceId } from '../../api/methods/getServiceId'
import { SignInYandex, signInWithYandex } from '../../api/methods/sigInWithYandex'
interface IInitState {
  user: Record<string, string> | null
  isLoading: boolean
  error: null | string
  loggedIn: boolean
  serviceId: ServiceIdCallArgs | null,
  verificate: boolean
}

const initialState: IInitState = {
  user: null,
  isLoading: false,
  error: null,
  loggedIn: false,
  serviceId: null,
  verificate: false
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
    return await result.json()
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

export const logOut = createAsyncThunk(
  'auth/logout',
    async (_, { rejectWithValue }) => {
      const result = await logout();
      if(!result.ok) {
        return rejectWithValue('Произошла непредвиденная ошибка')
      }
      return
    }
  )

  export const serviceID = createAsyncThunk(
    'oauth/yandex/service-id',
    async(data: ServiceIdCallArgs, { rejectWithValue }) => {
      const result = await getServiceId({redirect_uri: data.redirect_uri});
      if(!result.ok) {
        return rejectWithValue('Произошла непредвиденная ошибка')
      }

      return await result.json()
    }
  )

  export const sigInYandex = createAsyncThunk(
    'oauth/yandex',
    async (data:SignInYandex, { rejectWithValue , dispatch }) => {
      const result = await signInWithYandex(data);

      if(!result.ok) {
        return rejectWithValue('Произошла ошибка');
      }
      
      return dispatch(getUser())
    } 
  )

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
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
      .addCase(logOut.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logOut.fulfilled, state => {
        state.error = null     
        state.isLoading = false
        state.loggedIn = false
        state.verificate = false
      })
      .addCase(logOut.rejected, (state, { error }) => {
        state.loggedIn = false
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
      .addCase(serviceID.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(serviceID.fulfilled, state => {
        state.error = null     
        state.isLoading = false
        state.loggedIn = true
        state.verificate = true
      })
      .addCase(serviceID.rejected, (state, { error }) => {
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
      .addCase(sigInYandex.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sigInYandex.fulfilled, state => {
        state.error = null     
        state.isLoading = false
        state.verificate = false
      })
      .addCase(sigInYandex.rejected, (state, { error }) => {
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
  },
})

export default authSlice.reducer
