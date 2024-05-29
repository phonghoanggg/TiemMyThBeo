import { useMutation } from 'react-query';
import *  as UserService from '../services/UserServices' 

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
            UserService.updateUser(id,rests,access_token)
        }
    })
    return mutation
}