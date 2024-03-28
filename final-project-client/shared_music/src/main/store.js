import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';
import loginReducer from '../Login/loginSlice.js';
import songsReducer from '../Songs/SongsSlice';
import categoriesReducer from '../AllCategories/CategoriesSlice.js'
import usersReducer from '../Users/UsersSlice.js'
import sessionStorage from 'redux-persist/lib/storage/session';
import localStorage from 'redux-persist/es/storage';




const reducers = {
  login: loginReducer,
  songs: songsReducer, 
  categories:categoriesReducer,
  users:usersReducer,
};

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage: sessionStorage, // Initially use sessionStorage
  whitelist: ['login'],
  // blacklist:['addRecipe'],
};
const middleware = () => next => action => {
  if (action.type === 'login/rememberMeChecked' && action.payload) {
    persistConfig.storage = localStorage; 
  } else if (action.type === 'login/rememberMeUnchecked' && !action.payload) {
    persistConfig.storage = sessionStorage;
  }

  // Call the persistConfig update function (if your redux-persist version supports it)
    // persistConfig.updateConfig(persistConfig);
  

  return next(action);
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

export const persistor = persistStore(store);

