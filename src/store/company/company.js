import {createSlice} from '@reduxjs/toolkit'
import {apiCall, apiCompanyAdd, apiCompanyUpdate, apiCompanyDelete, apiCompanyList} from "../../view/admin/config";

const company = createSlice({
    name: 'company',
    initialState: {
        isLoading: false,
        loading: false,
        company: [],
        dataCompany: '',
        pageCount: 1
    },
    reducers:{
        onGetStart: (state) => {
            state.isLoading = true
        },
        onAddStart:(state)=>{
            state.loading = true
        },
        onFail: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.dataCompany = action.payload
        },
        getCompanySuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.company = action.payload.data.data
            state.pageCount = action.payload.data.count
            state.company.sort((a,b)=>{
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1
                return 0
            })
        },
        addCompanySuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.dataCompany = action.payload.message
        },
        updateCompanySuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.dataCompany = action.payload.message
        },
        deleteCompanySuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.dataCompany = action.payload.message
        }
    }
})

export const getCompany = (params) => apiCall({
    url: apiCompanyList,
    method: 'get',
    params: params,
    onStart: company.actions.onGetStart.type,
    onSuccess: company.actions.getCompanySuccess.type,
    onFail: company.actions.onFail.type
})

export const addCompany = (data) => apiCall({
    url: apiCompanyAdd,
    method: 'post',
    data,
    onStart: company.actions.onAddStart.type,
    onSuccess: company.actions.addCompanySuccess.type,
    onFail: company.actions.onFail.type
})

export const updateCompany = (data) => apiCall({
    url: apiCompanyUpdate + data.restaurantId,
    method: 'post',
    data,
    onStart: company.actions.onAddStart.type,
    onSuccess: company.actions.updateCompanySuccess.type,
    onFail: company.actions.onFail.type
})

export const deleteCompany = (id) => apiCall({
    url: apiCompanyDelete + id,
    method: 'post',
    onStart: company.actions.onGetStart.type,
    onSuccess: company.actions.deleteCompanySuccess.type,
    onFail: company.actions.onFail.type
})

export default company.reducer