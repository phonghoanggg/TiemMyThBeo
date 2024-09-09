import axios from "axios";

export const axiosJWT = axios.create() 

export const getAllProduct = async(query, limit) => {
    if (query) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?${query}`)
        return res.data
    } else {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
        return res.data
    }
}
export const createProduct= async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data)
    return res.data
}
export const getDetailProduct= async(id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}

export const updateProduct= async(id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data)
    return res.data
}
export const deleteProduct = async(id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`,{
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteManyProduct = async(data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`,data,{
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const getAllType = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-allType-product`)
    return res.data
}