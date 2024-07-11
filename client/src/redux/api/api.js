import {createApi,fetchBaseQuery,} from '@reduxjs/toolkit/query/react';
import { server } from '../../components/auth/config';


const api = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({baseUrl : `${server}`}),
    tagTypes : ["Chat","Search"],
    endpoints : (builder) => {
        return {
            myChats : builder.query({
                query : () => ({
                    url : "chats/my",
                    credentials : "include"
                }),
                providesTags : ["Chat"]
            }),
            searchUsers : builder.query({
                query : (name) => ({
                    url : `users/search?name=${name}`,
                    credentials : "include"
                }),
                providesTags:["Search"]

            })
        }
    }
});


export default api;
export const {useMyChatsQuery,useLazySearchUsersQuery} = api;