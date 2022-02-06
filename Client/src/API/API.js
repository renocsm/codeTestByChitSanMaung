import axios from 'axios'
import {GetTokenLocalStorageForAuthorized}from '../Stores/Storage.js'


//  const URL = 'http://3.128.172.159/api/'
 const URL = 'https://localhost:44315/api/'
const token =  GetTokenLocalStorageForAuthorized();
 
 

export const API = axios.create({
    baseURL: `${URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token,
        'cache-control': 'no-cache'
    }
})

// get methods 
export const getData = async (URN) => {
    const response = await API.get(`${URN}`)
    if (response.data.status === 0) {
        return {
            message: response.data.message,
            status: response.data.status,
            data: response.data.data,
            ok: true
        }
    }
    else {
        return {
            message: response.data.message,
            status: response.data.status,
            failMessage: 'fail',
            ok: false
        }
    }
}

// post Methods  
export const postData = async (URN, RequestData) => {
    const response = await API.post(`${URN}`, RequestData)
    if (response.data.status === 0) {
        return {
            message: response.data.message,
            status: response.data.status,
            data: response.data ? response.data : [],
            ok: true
        }
    }
    else {
        return {
            message: response.data.message,
            status: response.data.status,
            failMessage: 'fail',
            ok: false
        }
    }
}