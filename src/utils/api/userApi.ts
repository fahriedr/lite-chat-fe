import { fetchApi } from "../../lib/helpers"
import type { User } from "../../types"


export const getProfileApi = async () => {
    const res  = await fetchApi({
        url: '/api/profile',
        method: 'GET'
    })

    const data: User = res?.data.data

    return data
}

export const getUsers = async (query: string) => {
    const res = await fetchApi({
        url: `/api/users/search?query=${query}`,
        method: 'GET'
    })

    const data: User[] | [] = res?.data.data

    return data
}