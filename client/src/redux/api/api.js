import {createApi,fetchBaseQuery,} from '@reduxjs/toolkit/query/react';
import { server } from '../../components/auth/config';


const api = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({baseUrl : `${server}`}),
    tagTypes : ["Chat","User"],
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
                providesTags:["User"]

            }),
            sendFriendRequest : builder.mutation({
                query : (data) => ({
                    url : 'users/sendReq',
                    credentials:"include",
                    method : "PUT",
                    body : data
                }),
                invalidatesTags:["User"]
            }),
            newGroup : builder.mutation({
                query : (data) => ({
                    url : "chats/new",
                    credentials : "include",
                    method : "POST",
                    body : data,
                    
                    
                })
            }),
            notification : builder.query({
                query : () => ({
                    url : 'users/getNotif',
                    credentials:"include",
                    
                    
                }),
                keepUnusedDataFor : 0
                
            }),
            acceptRequest : builder.mutation({
                query : (data) => ({
                    url : "users/acceptReq",
                    credentials : "include",
                    method : "PUT",
                    body : data,
                    
                    
                }),
                invalidatesTags : ["Chat"]
            })
        }
    }
});


export default api;
export const {useMyChatsQuery,useLazySearchUsersQuery,useSendFriendRequestMutation,useNotificationQuery,useAcceptRequestMutation} = api;