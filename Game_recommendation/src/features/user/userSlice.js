import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    name: '',
    token: ''
};

const userSlice = createSlice({
    name: 'user',  
    initialState,

    reducers:{
        setName: (state, action) => {
            state.name = action.payload
        },
        
        login: (state, action) => {
            state.token = action.payload
        },

        logout: (state) => {
            state.name = '';
            state.token = ''
        },

    },


});


export const { setName, login, logout } = userSlice.actions;
export default userSlice.reducer;