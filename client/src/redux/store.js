import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import api from './api/api';
import miscSlice from './reducers/misc';
import chatSlice from './reducers/chat'
const store = configureStore({
    reducer: {
        auth : authSlice,
        misc : miscSlice,
        chat : chatSlice,
        [api.reducerPath] : api.reducer,
    },
    middleware : (defaultMiddleware) => [...defaultMiddleware(),api.middleware]
})

export default store;