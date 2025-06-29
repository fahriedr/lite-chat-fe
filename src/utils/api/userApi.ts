import { fetchApi } from "../../lib/helpers"
import type { User } from "../../types"


export const getProfileApi = async () => {
    const res  = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/profile`,
        method: 'GET'
    })

    const data: User = res?.data.data

    return data
}

export const getUsers = async (query: string) => {
    const res = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/user/search/${query}`,
        method: 'GET'
    })

    const data: User[] | [] = res?.data.data

    return data
}

export const getUserProfile = async (email: string) => {
    const res = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/user/profile?email=${email}`,
        method: 'GET'
    })

    const data: User[] | [] = res?.data.data

    return data
}