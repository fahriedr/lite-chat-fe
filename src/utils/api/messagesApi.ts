import { fetchApi } from "../../lib/helpers"

interface MessageProps {
    data: {
        userId: string,
        message: string
    }
}


export const getConversationsApi = async () => {

    const res  = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/conversations`,
        method: 'GET'
    })

    return res

}

export const getMessagesApi = async (receiverId: string) => {
    
    const res = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/messages/list/${receiverId}`,
        method: 'GET'
    })

    return res
}

export const sendMessageApi = async (props: MessageProps) => {

    const res = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/messages/send`,
        method: 'POST',
        data: props.data
    })

    return res
}

export const updateMessageStatusApi = async (messageId: string) => {
    const res = await fetchApi({
        url: `${import.meta.env.VITE_API_URL}/messages/update-status`,
        method: 'POST',
        data: {
            messageId: messageId
        }
    })

    return res
}