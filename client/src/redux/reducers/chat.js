import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    notificationCount : 0
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
        }
    }
})

export const {incrementCount,resetCount} = chatSlice.actions;

export default chatSlice.reducer;