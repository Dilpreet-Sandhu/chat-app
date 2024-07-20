import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/auth/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
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
        invalidatesTags : ["Chat"]
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
        keepUnusedDataFor : 0,
      }),
      sendAttachment : builder.mutation({
        query : (data) => ({
          url : `chats/send/attachment`,
          credentials : 'include',
          method : "POST",
          body : data
        })
      }),
      myGroups: builder.query({
        query: () => ({
          url: "chats/my/grps",
          credentials: "include",
        }),
        providesTags: ["Chat"],
      }),
      availableFriends : builder.query({
        query : (chatId) =>{
            let url = `users/getMyFriends`;

            if (chatId) url += `?chatId=${chatId}`

            return {
              url : url,
              credentials:"include"
            }
        },
        providesTags:["Chat"]
      }),
      renameGroup : builder.mutation({
        query : ({chatId,newName}) => ({
          url : `chats/${chatId}`,
          method : "PUT",
          credentials:"include",
          body : {newName}
        }),
        invalidatesTags:["Chat"]
      }),
      removeMember : builder.mutation({
        query : ({chatId,userId}) => ({
            url : `chats/remove`,
            method : "PUT",
            credentials:"include",
            body : {chatId,userId}
        }),
        invalidatesTags:["Chat"]
      }),
      addMember : builder.mutation({
        query : ({members,chatId}) => ({
          url : `chats/add`,
          method: 'PUT',
          credentials:"include",
          body:{members,chatId}
        })
      }),
      deleteGroup : builder.mutation({
        query : ({id}) => ({
            url : `chats/${id}`,
            method : "DELETE",
            credentials:"include",
        }),
        invalidatesTags:["Chat"]
      }),
      leaveGroup: builder.mutation({
        query : ({chatId}) => ({
          url : `chats/leave/${chatId}`,
          method:"PUT",
          credentials:"include"
        }),
        invalidatesTags:["Chat"]
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
  useSendAttachmentMutation,
  useMyGroupsQuery ,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveMemberMutation,
  useAddMemberMutation,
  useDeleteGroupMutation,
  useLeaveGroupMutation
} = api;
