import {createSlice} from "@reduxjs/toolkit"
import {apiCall, apiFoodCategoryList, apiFoodCategoryAdd, apiFoodCategoryUpdate, apiFoodCategoryDelete} from '../../../view/admin/config'

const foodCategory = createSlice({
    name: "foodCategory",
    initialState: {
        isLoading: false,
        loading: false,
        foodCategory: [],
        dataFoodCategory: '',
        error: false,
        pageCount: 1
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
            state.error = action.payload
        },
        getFoodCategorySuccess: (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.isLoading = false
            state.foodCategory = action.payload.data.data
            state.pageCount = action.payload.data.count
            state.foodCategory.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
        },
        addFoodCategorySuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFoodCategory = action.payload.message
        },
        updateFoodCategorySuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFoodCategory = action.payload.message
        },
        deleteFoodCategorySuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataFoodCategory = action.payload.message
        }
    }
})

export const getFoodCategory = (params) => apiCall({
    url: apiFoodCategoryList,
    method: "get",
    params: params,
    onStart: foodCategory.actions.onGetStart.type,
    onSuccess: foodCategory.actions.getFoodCategorySuccess.type,
    onFail: foodCategory.actions.onFail.type
})

export const addFoodCategory = (data) => apiCall({
    url: apiFoodCategoryAdd,
    method: "post",
    data,
    onStart: foodCategory.actions.onAddStart.type,
    onSuccess: foodCategory.actions.addFoodCategorySuccess.type,
    onFail: foodCategory.actions.onFail.type
})

export const updateFoodCategory = (data) => apiCall({
    url: apiFoodCategoryUpdate,
    method: "post",
    data,
    onStart: foodCategory.actions.onAddStart.type,
    onSuccess: foodCategory.actions.updateFoodCategorySuccess.type,
    onFail: foodCategory.actions.onFail.type
})

export const deleteFoodCategory = (id) => apiCall({
    url: apiFoodCategoryDelete + id,
    method: "post",
    onStart: foodCategory.actions.onGetStart.type,
    onSuccess: foodCategory.actions.deleteFoodCategorySuccess.type,
    onFail: foodCategory.actions.onFail.type
})


export default foodCategory.reducer