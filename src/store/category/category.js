import {createSlice} from '@reduxjs/toolkit'
import {apiCall, apiCategoryList, apiCategoryAdd, apiCategoryUpdate, apiCategoryDelete} from "../../view/admin/config";

const category = createSlice({
    name: 'category',
    initialState: {
        isLoading: false,
        loading: false,
        category: [],
        data: '',
        pageCount: 0
    },
    reducers: {
        onGetStart: (state) => {
            state.loading = false
            state.isLoading = true
        },
        onAddStart: (state)=>{
            state.isLoading = false
            state.loading = true
        },
        onFail: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.data = action.payload
        },
        getCategorySuccess: (state,action) => {
            state.loading = false
            state.isLoading = false
            state.category = action.payload.data.data
            state.pageCount = action.payload.data.count
            state.category.sort((a,b)=>{
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1
                return 0
            })
        },
        addCategorySuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload.message
        },
        updateCategorySuccess:(state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload.message
        },
        deleteCategorySuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload.message
        }
    }
})

export const getCategory = (params) => apiCall({
    url: apiCategoryList,
    method: 'get',
    params: params,
    onStart: category.actions.onGetStart.type,
    onSuccess: category.actions.getCategorySuccess.type,
    onFail: category.actions.onFail.type
})

export const addCategory = (data) => apiCall({
    url: apiCategoryAdd,
    method: 'post',
    data,
    onStart: category.actions.onAddStart.type,
    onSuccess: category.actions.addCategorySuccess.type,
    onFail: category.actions.onFail.type
})

export const updateCategory = (data) => apiCall({
    url: apiCategoryUpdate,
    method: 'post',
    data,
    onStart: category.actions.onAddStart.type,
    onSuccess: category.actions.updateCategorySuccess.type,
    onFail: category.actions.onFail.type
})
export const deleteCategory = (id) => apiCall({
    url: apiCategoryDelete + id,
    method: 'post',
    onStart: category.actions.onGetStart.type,
    onSuccess: category.actions.deleteCategorySuccess.type,
    onFail: category.actions.onFail.type
})

export default category.reducer