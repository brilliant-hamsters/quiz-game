import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  Message,
  MessagesList,
  Theme,
  ThemesList,
} from '../../typings/appTypes'
import { getThemesList } from '../../api/methods/getThemesList'
import { createTheme } from '../../api/methods/createTheme'
import { getMessages } from '../../api/methods/getMessages'
import { sendMessage } from '../../api/methods/sendMessage'

interface IInitState {
  isLoading: boolean
  error: null | string
  loggedIn: boolean
  themesList: ThemesList
  messages: MessagesList
}

const initialState: IInitState = {
  isLoading: false,
  error: null,
  loggedIn: false,
  themesList: [],
  messages: [],
}

export const getThemesListData = createAsyncThunk(
  'forum/getThemesList',
  async (_, { rejectWithValue }) => {
    const result = await getThemesList()
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос!')
    }
    return await result.json()
  }
)

export const getMessageOfTheme = createAsyncThunk(
  'forum/getMessage',
  async (id: number, { rejectWithValue }) => {
    const result = await getMessages(id)
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос!')
    }
    return await result.json()
  }
)

export const createNewTheme = createAsyncThunk(
  'forum/createTheme',
  async (data: Pick<Theme, 'theme'>, { rejectWithValue }) => {
    const result = await createTheme(data)
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос!')
    }
    return await result.json()
  }
)

export const sendNewMessage = createAsyncThunk(
  'forum/sendMessage',
  async (data: Message, { rejectWithValue }) => {
    const result = await sendMessage(data)
    if (!result.ok) {
      return rejectWithValue('Невозможно выполнить запрос!')
    }
    return await result.json()
  }
)

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getThemesListData.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getThemesListData.fulfilled, (state, action) => {
        state.themesList = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getThemesListData.rejected, (state, { error }) => {
        console.log(error)
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
      .addCase(getMessageOfTheme.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getMessageOfTheme.fulfilled, (state, action) => {
        state.messages = action.payload
        state.error = null
      })
      .addCase(getMessageOfTheme.rejected, (state, { error }) => {
        console.log(error)
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
      .addCase(createNewTheme.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createNewTheme.fulfilled, (state, action) => {
        state.themesList = [action.payload, ...state.themesList]
        state.error = null
      })
      .addCase(createNewTheme.rejected, (state, { error }) => {
        console.log(error)
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
      .addCase(sendNewMessage.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.themesList = [action.payload, ...state.messages]
        state.error = null
      })
      .addCase(sendNewMessage.rejected, (state, { error }) => {
        console.log(error)
        state.isLoading = false
        state.error = error.message || 'Произошла неизвестная ошибка'
      })
  },
})

export default forumSlice.reducer
