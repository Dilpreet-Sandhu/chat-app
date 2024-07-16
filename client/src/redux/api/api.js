import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/auth/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
  tagTypes: ["Chat", "User","Message"],
  endpoints: (builder) => {
    return {
      myChats: builder.query({
        query: () => ({
          url: "chats/my",
          credentials: "include",
        }),
        providesTags: ["Chat"],
      }),
      searchUsers: builder.query({
        query: (name) => ({
          url: `users/search?name=${name}`,
          credentials: "include",
        }),
        providesTags: ["User"],
      }),
      sendFriendRequest: builder.mutation({
        query: (data) => ({
          url: "users/sendReq",
          credentials: "include",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["User"],
      }),
      newGroup: builder.mutation({
        query: (data) => ({
          url: "chats/new",
          credentials: "include",
          method: "POST",
          body: data,
        }),
      }),
      notification: builder.query({
        query: () => ({
          url: "users/getNotif",
          credentials: "include",
        }),
        keepUnusedDataFor: 0,
      }),
      acceptRequest: builder.mutation({
        query: (data) => ({
          url: "users/acceptReq",
          credentials: "include",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Chat"],
      }),
      chatDetails: builder.query({
        query: ({ chatId, populate }) => {
          let url = `chats/${chatId}`;
          if (populate) {
            url += "?populate=true";
          }

          return {
            url: url,
            credentials: "include",
          };
        },
        providesTags: ["Chat"],
      }),
      getMessages: builder.query({
        query: ({ chatId, page }) => {
          return {
            url: `chats/messages/${chatId}?page=${page}`,
            credentials: "include",
          };
        },
        providesTags: ["Message"],
      }),
      sendAttachment : builder.mutation({
        query : (data) => ({
          url : `chats/send/attachment`,
          credentials : 'include',
          method : "POST",
          body : data
        })
      })
    };
  },
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
  useNotificationQuery,
  useAcceptRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentMutation
} = api;