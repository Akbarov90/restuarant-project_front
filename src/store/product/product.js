import {createSlice} from "@reduxjs/toolkit";
import {apiCall, apiProductAdd, apiProductUpdate, apiProductDelete, apiProductList} from "../../view/admin/config";

const product = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        loading: false,
        product: [],
        dataProduct: '',
        pageCount: 1
    },
    reducers: {
        onGetStart: (state) => {
            state.isLoading = true
        },
        onAddStart: (state)=>{
            state.loading = true
        },
        onFail: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataProduct = action.payload
        },
        getProductSuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.product = action.payload.data.data
            state.pageCount = action.payload.data.count
            state.product.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
        },
        addProductSuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataProduct = action.payload.message
        },
        updateProductSuccess: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataProduct = action.payload.message
        },
        deleteProduct: (state, action) => {
            state.loading = false
            state.isLoading = false
            state.dataProduct = action.payload.message
        },
        filter:(state,action)=>{
            // console.log(action.payload)
            state.isLoading = false
            state.product = action.payload.data
        }
    }
})

//actions
export const getProduct = (params) => apiCall({
    url: apiProductList,
    method: 'get',
    params: params,
    onStart: product.actions.onGetStart.type,
    onSuccess: product.actions.getProductSuccess.type,
    onFail: product.actions.onFail.type
})

export const addProduct = (data) => apiCall({
    url: apiProductAdd,
    method: 'post',
    data,
    onStart: product.actions.onAddStart.type,
    onSuccess: product.actions.addProductSuccess.type,
    onFail: product.actions.onFail.type
})

export const updateProduct = (data) => apiCall({
    url: apiProductUpdate + data.idRes,
    method: 'post',
    data,
    onStart: product.actions.onAddStart.type,
    onSuccess: product.actions.updateProductSuccess.type,
    onFail: product.actions.onFail.type
})

export const deleteProduct = (id) => apiCall({
    url: apiProductDelete + id,
    method: 'post',
    onStart: product.actions.onGetStart.type,
    onSuccess: product.actions.deleteProduct.type,
    onFail: product.actions.onFail.type
})

export const filterProduct = (data, restaurantId) => apiCall({
    url: 'api/product/filter',
    method: 'post',
    data,
    params: restaurantId,
    onStart: product.actions.onGetStart.type,
    onSuccess: product.actions.filter.type,
    onFail: product.actions.onFail.type
})

export default product.reducer