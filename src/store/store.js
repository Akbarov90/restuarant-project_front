import { configureStore } from '@reduxjs/toolkit'
import api from './middleware/api'
import auth from './auth/auth'
import status from './status/status'
import restaurants from './restaurants/restaurants'
import category from './category/category'
import product from './product/product'
import foodCategory from './category/foodCategory/foodCategory'
import company from './company/company'
import food from './food/food'
import contract from './contract/contract'

export default configureStore({
    reducer: {
        auth,
        status,
        restaurants,
        category,
        product,
        foodCategory,
        company,
        food,
        contract,
    },
    middleware: [api],
})
