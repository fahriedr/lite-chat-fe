import { Link } from "react-router-dom"

const NotFoundPage = () => {

    return(
        <div>
            <h1>Page not Found</h1>
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </div>
    )
}

export default NotFoundPage