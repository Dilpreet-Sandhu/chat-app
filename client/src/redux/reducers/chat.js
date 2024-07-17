import { createSlice } from "@reduxjs/toolkit"
import { getOrSaveFromLocalStorage } from "../../lib/feautres";
import { NEW_MESSAGE_ALERT } from "../../utils/constants";


const initialState = {
    notificationCount : 0,
    newMessageAlert : getOrSaveFromLocalStorage({get :true,key : NEW_MESSAGE_ALERT}) ||[]
}


const chatSlice = createSlice({
    name : "chat",
    initialState,
    reducers : {
        incrementCount : (state,action) => {
            state.notificationCount += 1;
        },
        resetCount : (state,action) => {
            state.notificationCount = 0
        },
        setNewMessageAlert: (state,action) => {
            let index = state.newMessageAlert.findIndex(item => item.chatId == action.payload.chatId);

            if (index > -1) {
                state.newMessageAlert[index].count += 1;
            }
            else {
                state.newMessageAlert.push({
                    chatId : action.payload.chatId,
                    count : 1
                })
            }
        },
        removeNewMessageAlert(state,action) {
            state.newMessageAlert = state.newMessageAlert.filter(item => item.chatId !== action.payload.chatId)
        }
    }
})

export const {incrementCount,resetCount,setNewMessageAlert,removeNewMessageAlert} = chatSlice.actions;

export default chatSlice.reducer;