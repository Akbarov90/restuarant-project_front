import {createAction} from '@reduxjs/toolkit'

// http://104.236.67.87:8087

export const apiCall = createAction('api/apiCall');

// auth
export const apiAuthLogin = 'api/auth/login';
export const apiAuthCreate = 'api/auth/create';
export const apiAuthUpdateId = 'api/auth/update/';
export const updateProfileLang = 'api/profile/updateLang/'
export const apiProfileRole = 'api/profile/role'
// profile
export const apiProfileData = 'api/profile/data';
// restaurant
export const apiRestaurantList = 'api/restaurant/list/';
export const apiRestaurantAdd = 'api/restaurant/add';
export const apiRestaurantUpdate = 'api/restaurant/update';
export const apiRestaurantDelete = 'api/restaurant/';
//category
export const apiCategoryList = 'api/category/list/';
export const apiCategoryAdd = 'api/category/add'
export const apiCategoryUpdate = 'api/category/update/'
export const apiCategoryDelete = 'api/category/'
//profile
export const apiProfileList = 'api/profile/list'
//product
export const apiProductList = "api/product/list/"
export const apiProductAdd =  "api/product/add"
export const apiProductUpdate =  "api/product/update/"
export const apiProductDelete = "api/product/delete/"
//foodCategory
export const apiFoodCategoryList = "api/foodCategory/list/"
export const apiFoodCategoryAdd = "api/foodCategory/add"
export const apiFoodCategoryUpdate = "api/foodCategory/update/"
export const apiFoodCategoryDelete = "api/foodCategory/delete/"
//company
export const apiCompanyList = 'api/firma/list'
export const apiCompanyAdd = 'api/firma/add'
export const apiCompanyUpdate = 'api/firma/update/'
export const apiCompanyDelete = 'api/firma/delete/'
//food
export const apiFoodList = 'api/food/list/'
export const apiFoodAdd = 'api/food/add'
export const apiFoodUpdate = 'api/food/update/'
export const apiFoodDelete = 'api/food/delete/'
// contract
export const apiContractList = 'api/contract/list' // ?firmaId=1
export const apiContractAdd = 'api/contract/add'
export const apiContractUpdate = 'api/contract/update/' // +id
export const apiContractDelete = 'api/contract/delete/' // +id
