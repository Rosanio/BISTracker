import { useState } from "react"
import api from "./shared/utils/api"
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'

type LoginResponse = {
    token: string,
    expiration: Date
}

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response: AxiosResponse<LoginResponse> = await api.post('Authentication/login', {
            username: username,
            password: password,
        })
        Cookies.set('token', response.data.token)
        setIsAuthenticated(true)
    }

    const testAuthToken = async () => {
        const response = await api.get('WeatherForecast', null)
        console.log(response)
    }

    return (
        <div style={{ position: 'absolute', width: '400px', height: '300px', top: '50%', left: '50%', margin: '-150px 0 0 -200px' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>

            {isAuthenticated ? (
                <button onClick={testAuthToken}>Test</button>
            ) : null}
        </div>
    )
}

export default Login
