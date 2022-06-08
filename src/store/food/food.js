import {createSlice} from "@reduxjs/toolkit";
import {apiCall, apiFoodAdd, apiFoodDelete, apiFoodList, apiFoodUpdate} from "../../view/admin/config";

const food = createSlice({
    name: 'food',
    initialState: {
        isLoading: false,
        loading: false,
        food: [],
        dataFood: '',
        pageCount: 1,
    },
    reducers: {
        onGetStart: (state) => {
            state.isLoading = true
        },
        onAddStart:(state)=>{
            state.loading = true
        },
        onFail: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFood = action.payload
        },
        getFoodSuccess: (state, action) => {
            console.log()
            state.loading = false
            state.isLoading = false
            state.food = action.payload.data.data
            state.pageCount = action.payload.data.count
            state.food.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
        },
        addFoodSuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFood = action.payload.message
        },
        updateFoodSuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFood = action.payload.message
        },
        deleteFoodSuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFood = action.payload.message
        }
    }
})

export const getFood = (params) => apiCall({
    url: apiFoodList,
    method: 'get',
    params: params,
    onStart: food.actions.onGetStart.type,
    onSuccess: food.actions.getFoodSuccess.type,
    onFail: food.actions.onFail.type
})

export const addFood = (data) => apiCall({
    url: apiFoodAdd,
    method: 'post',
    data,
    onStart: food.actions.onAddStart.type,
    onSuccess: food.actions.addFoodSuccess.type,
    onFail: food.actions.onFail.type
})

export const updateFood = (data) => apiCall({
    url: apiFoodUpdate + data.iD,
    method: 'post',
    data,
    onStart: food.actions.onAddStart.type,
    onSuccess: food.actions.updateFoodSuccess.type,
    onFail: food.actions.onFail.type

})

export const deleteFood = (id) => apiCall({
    url: apiFoodDelete + id,
    method: 'post',
    onStart: food.actions.onGetStart.type,
    onSuccess: food.actions.deleteFoodSuccess.type,
    onFail: food.actions.onFail.type
})
export default food.reducer