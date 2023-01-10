import { useSelector } from "react-redux"
import { selectLoginPayload, selectUserInfo } from "./authenticationSlice"
import { Link } from "react-router-dom"

const Welcome = () => {
    const loginPayload = useSelector(selectLoginPayload)
    const userInfo = useSelector(selectUserInfo)

    const welcome = loginPayload ? `Welcome ${userInfo.lastName} ${userInfo.firstName}!` : 'Welcome!'
    const tokenAbbr = `${loginPayload.accessToken.value.slice(0, 9)}...`

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/regionAnatomiquesList">Go to the Users List</Link></p>
        </section>
    )

    return content
}
export default Welcome