import { createSlice } from '@reduxjs/toolkit'
import {
    apiCall,
    apiContractAdd,
    apiContractDelete,
    apiContractList,
    apiContractUpdate,
} from '../../view/admin/config'

const contract = createSlice({
    name: 'contract',
    initialState: {
        loading: false,
        contract: [],
        error: false,
        data: '',
    },
    reducers: {
        onStart: state => {
            state.loading = true
            state.error = false
        },
        onFail: state => {
            state.loading = false
            state.error = true
        },
        getContractSuccess: (state, { payload }) => {
            state.loading = false
            state.contract = payload.data
            state.contract.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
            state.error = false
        },
        addContractSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload.message
            state.error = false
        },
        deleteContractSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload.message
            state.error = false
        },
        updateContractSuccess: (state, { payload }) => {
            state.loading = false
            state.data = payload.message
            state.error = false
        },
    },
})

export const getContract = params =>
    apiCall({
        url: apiContractList,
        method: 'get',
        params,
        onStart: contract.actions.onStart.type,
        onFail: contract.actions.onFail.type,
        onSuccess: contract.actions.getContractSuccess.type,
    })

export const addContract = data =>
    apiCall({
        url: apiContractAdd,
        method: 'post',
        data,
        onStart: contract.actions.onStart.type,
        onFail: contract.actions.onFail.type,
        onSuccess: contract.actions.addContractSuccess.type,
    })

export const deleteContract = id =>
    apiCall({
        url: apiContractDelete + id,
        method: 'post',
        onStart: contract.actions.onStart.type,
        onFail: contract.actions.onFail.type,
        onSuccess: contract.actions.deleteContractSuccess.type,
    })

export const updateContract = data =>
    apiCall({
        url: apiContractUpdate + data.urlId,
        method: 'post',
        data,
        onStart: contract.actions.onStart.type,
        onFail: contract.actions.onFail.type,
        onSuccess: contract.actions.updateContractSuccess.type,
    })

export default contract.reducer
