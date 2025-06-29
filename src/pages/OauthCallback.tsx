import { useNavigate, useSearchParams } from "react-router-dom";
import { setCookies } from "../lib/helpers";
import { useEffect } from "react";

const OauthCallback = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const user = searchParams.get("user")
    const token = searchParams.get("token")

    const settingCookie = async () => {

        if (!token || !user) {
            navigate("/login")
        }

        await setCookies('token', token!)
        await setCookies('user', user!)

        navigate("/home")
    }

    useEffect(() => {
     settingCookie()
    }, [])

    return (
        <>
            <h1>Loading...</h1>
        </>
    )
}

export default OauthCallback