import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as messagesSliceReducer } from "./slices/messages.slice";
import { reducer as userFormReducer } from "./slices/userForm.slice";

const reducers = combineReducers({
	messagesSlice: messagesSliceReducer,
	userFormSlice: userFormReducer,
});

export const store = configureStore({
	reducer: {
		reducers,
	},
});
