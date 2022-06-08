import {createSlice} from '@reduxjs/toolkit'
import {apiCall, apiRestaurantList, apiRestaurantAdd, apiRestaurantDelete, apiRestaurantUpdate} from '../../view/admin/config'

const restaurants = createSlice ({
    name: 'restaurants',
    initialState: {
        isLoading : false,
        loading: false,
        status: {},
        data: '',
        resData: [],
        pageCount: 1
    },
    reducers:{
        onGetStart:(state)=>{
          state.isLoading = true
        },
        onAddStart:(state)=>{
            state.loading = false
            state.loading = true
        },
        onFail:(state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload
        },
        getRestaurantSuccess:(state,action)=>{
            console.log(action.payload)
            state.loading = false
            state.isLoading = false
            state.resData = action.payload.data.data
            state.pageCount = action.payload.data.count
            state.resData.sort((a,b)=>{
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1;
                return 0
            })
        },
        addRestaurantSuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload.message
        },
        updateRestaurantSuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload.message
        },
        deleteSuccess: (state,action)=>{
            state.loading = false
            state.isLoading = false
            state.data = action.payload.message
        }
    }
})

export const getRestaurantList = (page) => apiCall({
    url: apiRestaurantList,
    method: 'get',
    params: page,
    onStart: restaurants.actions.onGetStart.type,
    onSuccess: restaurants.actions.getRestaurantSuccess.type,
    onFail: restaurants.actions.onFail.type
})

export const addRestaurant = (data) => apiCall({
    url: apiRestaurantAdd,
    method: 'post',
    data,
    onStart: restaurants.actions.onAddStart.type,
    onSuccess: restaurants.actions.addRestaurantSuccess.type,
    onFail: restaurants.actions.onFail.type
})

export const updateRestaurant = (data) => apiCall({
    url: apiRestaurantUpdate,
    method: 'post',
    data,
    onStart: restaurants.actions.onAddStart.type,
    onSuccess: restaurants.actions.updateRestaurantSuccess.type,
    onFail: restaurants.actions.onFail.type
})

export const deleteRestaurant = (id) => apiCall({
    url: apiRestaurantDelete + id,
    method: 'post',
    onStart: restaurants.actions.onGetStart.type,
    onSuccess: restaurants.actions.deleteSuccess.type,
    onFail: restaurants.actions.onFail.type
})

export default restaurants.reducer