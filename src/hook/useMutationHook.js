import { useMutation } from 'react-query';
import *  as UserService from '../services/UserServices' 
import *  as ProductService from '../services/ProductServices' 

export const useMuttionHooksLogin = (type) => {
    const mutation = useMutation({
        mutationFn:data => UserService.loginUser(data)
    })
    return mutation
}
export const useMuttionHooksRegister = (type) => {
    const mutation = useMutation({
        mutationFn:data => UserService.registerUser(data)
    })
    return mutation
}
export const useMuttionHooksUpdateUser = (type) => {
    const mutation = useMutation({
        mutationFn:(data)=> {
            const {id,access_token, ...rests} = data
            return UserService.updateUser(id,rests,access_token)
        }
    })
    return mutation
}
export const useMuttionHooksCreateProduct = (type) => {
    const mutation = useMutation({
        mutationFn:data => 
            ProductService.createProduct(data)
    })
    return mutation
}
export const useMuttionHooksUpdateProduct = (type) => {
    const mutation = useMutation({
        mutationFn:(data)=>  {
            const {id,access_token, ...rests} = data
            return ProductService.updateProduct(id,rests?.data,access_token)
        }
    })
    return mutation
}

export const useMuttionHooksDeletedProduct = (type) => {
    const mutation = useMutation({
        mutationFn:(data)=>  {
            const {id,access_token} = data
            return ProductService.deleteProduct(id,access_token)
        }
    })
    return mutation
}
export const useMuttionHooksDeletedUser = (type) => {
    const mutation = useMutation({
        mutationFn:(data)=>  {
            const {id,access_token} = data
            return UserService.deleteUser(id,access_token)
        }
    })
    return mutation
}
// Create user Admin
export const useMuttionHooksCreateUser = (type) => {
    const mutation = useMutation({
        mutationFn:data => 
            UserService.createUser(data)
    })
    return mutation
}