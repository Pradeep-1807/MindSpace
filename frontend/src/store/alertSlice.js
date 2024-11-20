import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    title: '',
    message: '',
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        createAlert: (state, action) => {
            state.status = action.payload.status; 
            state.title = action.payload.title; 
            state.message = action.payload.message; 
        },
        deleteAlert: (state) => {
            state.status = false; 
            state.title = ""; 
            state.message = ""; 
        },
    },
});

export const { createAlert , deleteAlert } = alertSlice.actions;

export default alertSlice.reducer;
