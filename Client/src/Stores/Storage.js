export const setTokenLocalStorage = (value) => {
    localStorage.setItem('token', value)
}
export const GetTokenLocalStorage = async () => {
    return await localStorage.getItem('token')
}

export const GetTokenLocalStorageForAuthorized=()=>{
        return localStorage.getItem('token')
}

export const setTokenSessionStorage = (value) => {
    localStorage.setItem('token', value)
}
export const GetTokenSessionStorage = async () => {
    return await localStorage.getItem('token')
}

export const Login = async (value) => {

    // sessionStorage
    sessionStorage.setItem('token', value.token)
    sessionStorage.setItem('adminID', value.adminID)
    // localStorage
    localStorage.setItem('token', value.token)
    localStorage.setItem('adminID', value.adminID)
}

export const Logout = () => {

    // sessionStorage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('adminID')

    // localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('adminID')

}