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
            state.name = action.payload;
        },
        
        login: (state, action) => {
            state.token = action.payload;
        },

        logout: (state) => {
            state.name = '';
            state.token = '';
        },

        // Новый редуктор для регистрации
        register: (state, action) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
    },
});

export const { setName, login, logout, register } = userSlice.actions;
export default userSlice.reducer;
