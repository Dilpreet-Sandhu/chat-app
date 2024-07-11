import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isNewGroup : false,
    isNotification : false,
    isAddMember : false,
    isMobile : false,
    isSearch :false,
    isFileMenu :false,
    isDeleteMenu : false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatId:"",
        groupChat:false
    }
}




const miscSlice = createSlice({
    name : "misc",
    initialState,
    reducers : {
        setNewGroup(state,action) {
            state.isNewGroup = action.payload
        },
        setIsNotification(state,action) {
            state.isNotification = action.payload
        },
        setAddMember(state,action) {
            state.isAddMember = action.payload
        },
        setIsMobile(state,action) {
            state.isMobile = action.payload
        },
        setIsSearch(state,action) {
            state.isSearch = action.payload
        },
        setIsFileMenu(state,action) {
            state.isFileMenu = action.payload
        },
        setIsDeleteMenu(state,action) {
            state.isDeleteMenu = action.payload
        },
        setuploadingLoader(state,action) {
            state.uploadingLoader = action.payload
        },
        setSelectedDeleteChat(state,action){
            state.selectedDeleteChat = action.payload;
        }
    }
   
    
})
export const {
    setAddMember,
    setIsDeleteMenu,
    setIsFileMenu,
    setIsMobile,
    setIsNotification,
    setIsSearch,
    setNewGroup,
    setSelectedDeleteChat,
    setuploadingLoader
} = miscSlice.actions;
export default miscSlice.reducer;