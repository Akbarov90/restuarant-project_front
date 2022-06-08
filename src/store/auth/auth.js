import {createSlice} from "@reduxjs/toolkit";
import {
    apiAuthLogin, apiAuthCreate, apiCall, apiProfileData, apiAuthUpdateId, apiProfileList, updateProfileLang, apiProfileRole
} from "../../view/admin/config";

import {Base64} from "js-base64";

const auth = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        success: false,
        status: {},
        data: '',
        error: '',
        user: [],
        profileData: {},
        signUpData: {},
        role: [],
        roleProfile: [],
        userInfo: {},
        checkCode: '',
        roleSupperAdmin: false,
        roleAdmin: false,
        roleUser: false,
        language: 1,
    },
    reducers: {
        loginStart: (state, action) => {
            state.isLoading = true;
            state.error = false
        },
        loginFail: (state, action) => {
            state.error = true;
            state.isLoading = false;
            state.status = action.payload
            state.checkCode = action.payload?.message
            console.log(action.payload)
        },
        loginSuccess: (state, action) => {
            localStorage.setItem('posToken', Base64.encode(action.payload.data.accessToken));
            state.success = true;
            state.isLoading = false;
            state.data = action.payload.message
        },
        getProfileData: (state, action) => {
            state.isLoading = false
            state.role = action.payload.data.roles
            if (state.role.length !== 0) {
                state.role.sort((a, b) => {
                    if (a.id < b.id) return 1
                    if (a.id > b.id) return -1
                    return 0
                })
            } else return state.role
            if (state.role[0].id === 3) {
                state.roleSupperAdmin = true
                state.roleAdmin = undefined
                state.roleUser = undefined
            } else if (state.role[0].id === 2) {
                state.roleAdmin = true
                state.roleSupperAdmin = undefined
                state.roleUser = undefined
            } else if (state.role[0].id === 1) {
                state.roleUser = true
                state.roleAdmin = undefined
                state.roleSupperAdmin = undefined
            }
            state.profileData = action.payload.message;
            state.language = action.payload.data.language;
            state.userInfo = action.payload.data
            localStorage.setItem('Authority', Base64.encode(JSON.stringify((action.payload))))
        },
        roleData: (state, action) => {
            state.isLoading = true
            state.roleAdmin = false
            state.roleSupperAdmin = false
            state.roleUser = false
        },
        loadingFalse: (state) => {
            state.isLoading = false
            state.checkCode = ''
        },
        updatePassSuccess: (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.data = action.payload?.message
        },
        roleProfileSuccess: (state, action) => {
            state.isLoading = false
            state.roleProfile = action.payload.data
        },
        signUpSuccess: (state, action) => {
            console.log(action.payload)
            state.signUpData = action.payload?.message
            state.isLoading = false
            state.data = action.payload
        },
        getUserSuccess: (state, action) => {
            console.log(action.payload.data)
            state.isLoading = false
            state.user = action.payload?.data
            state.user.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
        },
        updateUser: (state, action) => {
            state.isLoading = false
            state.data = action.payload.message
            state.checkCode = action.payload?.message
        },
        updateLangSuccess: (state, action) => {
            state.isLoading = false
            state.language = action.payload.data.language
            state.data = action.payload
            state.userInfo = action.payload.data
            localStorage.setItem('Authority', Base64.encode(JSON.stringify((action.payload))))
        }
    }
});

export const loginStart = (data) => apiCall({
    url: apiAuthLogin,
    method: 'post',
    data,
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.loginSuccess.type,
    onFail: auth.actions.loginFail.type,
});

export const signUpStart = (data) => apiCall({
    url: apiAuthCreate,
    method: 'post',
    data,
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.signUpSuccess.type,
    onFail: auth.actions.loginFail.type
})

export const getProfile = () => apiCall({
    url: apiProfileData,
    method: 'get',
    onStart: auth.actions.roleData.type,
    onSuccess: auth.actions.getProfileData.type,
    onFail: auth.actions.loginFail.type
});

export const getUser = () => apiCall({
    url: apiProfileList,
    method: 'get',
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.getUserSuccess.type,
    onFail: auth.actions.loginFail.type
})

export const roleUser = () => apiCall(({
    url: apiProfileRole,
    method: 'get',
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.roleProfileSuccess.type,
    onFail: auth.actions.loginFail.type
}))

export const updateUser = (data) => apiCall({
    url: apiAuthUpdateId + data.id,
    method: 'post',
    data,
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.updateUser.type,
    onFail: auth.actions.loginFail.type
})

export const updateLang = (data) => apiCall({
    url: updateProfileLang + data,
    method: 'post',
    data,
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.updateLangSuccess.type,
    onFail: auth.actions.loginFail.type
})

export const updatePass = (currentPass, newPass) => apiCall({
    url: 'api/profile/updatePass',
    method: 'post',
    params: {currentPass, newPass},
    onStart: auth.actions.loginStart.type,
    onSuccess: auth.actions.updatePassSuccess.type,
    onFail: auth.actions.loginFail.type
})

export const {loadingFalse, getProfileData} = auth.actions;
export default auth.reducer