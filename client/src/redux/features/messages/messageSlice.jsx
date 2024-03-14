import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    infoMessage: '',
    successMessage: '',
    warningMessage: '',
    errorMessage: '',
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        SET_INFO_MESSAGE: (state, action) => { state.infoMessage = action.payload; },
        SET_SUCCESS_MESSAGE: (state, action) => { state.successMessage = action.payload; },
        SET_WARNING_MESSAGE: (state, action) => { state.warningMessage = action.payload; },
        SET_ERROR_MESSAGE: (state, action) => {
            state.errorMessage = action.payload;
            toast.error(state.errorMessage);
        },
        CLEAR_MESSAGES: (state) => {
            state.infoMessage= '';
            state.successMessage = '';
            state.warningMessage = '';
            state.errorMessage = '';
        }
    }
});

export const { SET_INFO_MESSAGE, SET_SUCCESS_MESSAGE, SET_WARNING_MESSAGE, SET_ERROR_MESSAGE, CLEAR_MESSAGES } = messageSlice.actions;

export const infoMessage = (state) => state.message.infoMessage;
export const successMessage = (state) => state.message.successMessage;
export const warningMessage = (state) => state.message.warningMessage;
export const errorMessage = (state) => state.message.errorMessage;
export const hasMessage = (state) => (state.message.infoMessage !== '' || state.message.successMessage !== '' || state.message.warningMessage !== '' || state.message.errorMessage !== '') ? true : false;

export default messageSlice.reducer;