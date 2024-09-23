import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Default",
    chats: [],
  },

  reducers: {
    changeName: (state, action) => {
     
      state.name = action.payload

      console.log(state.chats)
    },

    updateChats: (state, action) => {
      state.chats = action.payload
      
    }
  }
});


export const { changeName , updateChats } = userSlice.actions

export default userSlice.reducer