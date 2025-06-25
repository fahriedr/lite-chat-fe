import axios, { type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";

// Define interfaces for type safety
export interface FetchProps {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: any;
}

// const navigate = useNavigate();


export const swrFetcher = async (props: FetchProps) => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        const token = Cookies.get('token');

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res: AxiosResponse = await axios({
            url: props.url,
            method: props.method,
            data: props.data || {},
            headers: headers
        });

        return res.data

    } catch (error: any) {

        if(error.response.status === 401) {
            Cookies.remove('user');
            Cookies.remove('token');
            // navigate('/login')
        } else {
            throw new Error(
                error.response?.data.message ||
                error.message ||
                'An error occurred'
            );
        }
    }
};