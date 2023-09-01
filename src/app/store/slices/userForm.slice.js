import { createSlice } from "@reduxjs/toolkit";

export const userForm = createSlice({
	name: "userForm",
	initialState: {
		username: "",
		gender: "",
		socketId: "",
		success: false,
	},
	reducers: {
		setUser(state, action) {
			state.username = action.payload.username;
            state.gender = action.payload.gender;
            state.socketId = action.payload.socketId;
            state.success = action.payload.success;
            console.log(state)
		},
	},
});

export const { reducer, actions } = userForm;
