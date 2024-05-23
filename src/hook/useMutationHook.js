import { useMutation } from 'react-query';
import *  as UserService from '../services/UserServices' 

export const useMuttionHooksLogin = (type) => {
    console.log("type",type)
    const mutation = useMutation({
        mutationFn:data => UserService.loginUser(data)
    })
    return mutation
}
export const useMuttionHooksRegister = (type) => {
    console.log("type",type)
    const mutation = useMutation({
        mutationFn:data => UserService.registerUser(data)
    })
    return mutation
}