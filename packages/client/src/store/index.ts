import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import leaderboardReducer from './leaderboard/leaderboardSlice';
import forumReducer from './forum/forumSlice'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  leaderboard: leaderboardReducer,
  forum: forumReducer,
})

const persistConfig = {
  key: 'root',
  whitelist: ['auth', 'profile', 'leaderboard'],
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers)

let store: any

export const createStore = (initialStore?: any) => {
  store = configureStore({
    preloadedState: initialStore,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: false,
      })
    },
  })
  return store
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
