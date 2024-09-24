import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Default",
    serverChats: [],
  },

  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;

      console.log("server Chats include",state.serverChats)
    },

    updateChats: (state, action) => {
      state.serverChats = action.payload;
      console.log("Redux Store has been updated with Messages from local Server")
    },
  },
});

export const { changeName, updateChats } = userSlice.actions;

export default userSlice.reducer;
