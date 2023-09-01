import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
	name: "messagesSlice",
	initialState: {
		messages: [],
	},
	reducers: {
		addMessage(state, action) {
			if (state.messages.length === 100) {
				state.messages.shift();
			}
			if (action.payload.message !== "") {
				state.messages.push({
					socketId: action.payload.socketId,
					message: action.payload.message,
				});
			}
			// console.log(state);
		},
	},
});

export const { reducer, actions } = messagesSlice;
