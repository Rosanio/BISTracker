import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const defaults = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/',
    headers: () => ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }),
    error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong. PANIC!!!',
        status: 503,
        data: {},
    },
}

const api = (method: string, url: string, variables: any) =>
    new Promise<AxiosResponse>((resolve, reject) => {
        axios({
            url: `${defaults.baseURL}${url}`,
            method,
            headers: defaults.headers(),
            params: method === 'get' ? variables : undefined,
            data: method !== 'get' ? variables : undefined,
        }).then(
            response => {
                resolve(response)
            },
            error => {
                if (error.response) {
                    reject(error.response.data.error)
                } else {
                    reject(defaults.error)
                    console.log(error)
                    console.log(`${defaults.baseURL}${url}`)
                }
            },
        )
    })

export default {
    get: (url: string, variables: any) => api('get', url, variables),
    post: (url: string, variables: any) => api('post', url, variables),
    put: (url: string, variables: any) => api('put', url, variables),
    patch: (url: string, variables: any) => api('patch', url, variables),
    delete: (url: string, variables: any) => api('delete', url, variables),
}
