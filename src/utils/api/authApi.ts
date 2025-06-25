import { fetchApi } from "../../lib/helpers"

interface LoginProps {
    data: {
        email: string,
        password: string
    } 
}

interface RegisterProps {
    data: {
        fullname: string,
        username: string,
        password: string,
        confirmPassword: string,
        email: string,
    }
}


export const loginApi = async (props: LoginProps) => {

    const res  = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/user/login`,
        method: 'POST',
        data: props.data
    })

    return res

}

export const registerApi = async (props: RegisterProps) => {

    const res = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/user/register`,
        method: 'POST',
        data: props.data
    })

    return res
}