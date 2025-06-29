import type { CustomResponse, CustomError, User as UserType } from '../types/index'
import axios, { type AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

interface FetchProps {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object
}

export const lastText = (text: string): string => {
    return text.length > 45 ? text.substring(0, 45) + "..." : text;
};

export const fetchApi = async (props: FetchProps) => {

    try {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': ''
        }

        const checkToken = await checkAuth()

        if (checkToken) {
            const token = Cookies.get('token')
            headers['Authorization'] = 'Bearer ' + token
        }

        let data = {}

        if (props.data) {
            data = props.data
        }

        const res: AxiosResponse = await axios({
            url: props.url,
            method: props.method,
            data: data,
            headers: headers,
        })

        const response: CustomResponse | CustomError = {
            message: res.data.message,
            success: true,
            data: res.data,
            status: res.status,
            headers: res.headers
        }

        return response

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            const response: CustomResponse = {
                message: error.response?.data.message,
                success: false
            }

            if (error.response?.request.status === 401) {
                Cookies.remove('user')
                Cookies.remove('token')

                return response

            }

            return response
        } else if (error instanceof Error) {
            console.log(error)
        } else {
            console.log(error)
        }
    }
}

export const checkAuth = () => {
    const token = Cookies.get('token')
    const userStr = Cookies.get('user')

    if (!token || !userStr) {
        return false
    }

    try {
        const user = JSON.parse(userStr)

        // Optional: validate expected fields
        if (!user._id || !user.email || !user.username) {
            return false
        }

        return user
    } catch (err) {
        Cookies.remove('token')
        Cookies.remove('user')
        return false
    }
}

export const logout = async () => {
    Cookies.remove('token')
    Cookies.remove('user')
    return true
}


export const getPlainId = async (id: Object) => {
    return id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
}

// export const zodErrorResponse = async (err: Zod.ZodError) => {

//     let errorDetails: ErrorDetails[] = []

//     err.issues.map((val: any, i: number) => {

//         const data: ErrorDetails = {
//             field: val.path[0],
//             code: val.code,
//             message: val.message
//         }

//         errorDetails.push(data)
//     })

//     return CustomErrorResponse(errorDetails[0].message, 400, errorDetails)

// }

// export const CustomErrorResponse = (message: string, statusCode: number, errorDetail?: Array<ErrorDetails>) => {

//     const errorResponse: CustomError = {
//         success: false,
//         statusCode: statusCode,
//         message: message,
//         details: errorDetail
//     }

//     return NextResponse.json(errorResponse, {status: statusCode})
// }

// export const CustomSuccessResponse = (message: string, statusCode: number, data?: Array<[]> | object) => {
//     return NextResponse.json({
//         success: true,
//         message: message,
//         data: data
//     }, {status: statusCode})
// }

export const setCookies = async (key: string, value: string) => {
    Cookies.set(key, value)
}

export const emailToUsername = async (email: string) => {
    const [localPart] = email.split('@')
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    return `${localPart}${randomDigits}`
}

export const capitalizeFirstLetter = (val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}