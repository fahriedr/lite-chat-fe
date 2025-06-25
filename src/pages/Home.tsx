import { useNavigate } from 'react-router-dom'
import ChatCard from '../components/Home/ChatCard'
import Loading from '../components/Loading'
import { checkAuth } from '../lib/helpers'
import { useUserStore } from '../stores/user'
import React from 'react'


export default function Home() {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState<boolean>(true)
    const { userAction } = useUserStore((state) => state)

    const checkUser = React.useCallback(async () => {
        const user = await checkAuth()
        
        if (!user) {
            navigate("/login")
        } else {
            userAction(user)
            setLoading(false)
        }
    }, [navigate, userAction])

    React.useEffect(() => {
        checkUser()
    }, [checkUser])

    if (loading) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <Loading />
            </div>
        )
    }

    return (
        <div className='w-full h-screen bg-white'>
            <ChatCard />
        </div>
    )
}
