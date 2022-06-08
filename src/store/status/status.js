import {createSlice} from '@reduxjs/toolkit'

const status = createSlice({
    name: 'status',
    initialState: {
        status: {},
        type: false
    },
    reducers: {
       statusTrue: (state,action)=>{
           // console.log(action.payload)
           state.status = action.payload?.code ? action.payload : action.payload?.response?.status ? action.payload?.response : action.payload.message;
           state.type = true
           // console.log(state.status)
       },
       statusFalse:(state)=>{

           state.status = {};
           state.type = false
       }
    }
});

export const {statusTrue, statusFalse} = status.actions;
export default status.reducer