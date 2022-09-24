import { useState } from "react"
import api from "../shared/utils/api"

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState(null)

    // Taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateInputs()) {
          setError(null)
          try {
              let response = await api.post('Authentication/register', {
                username: username,
                password: password,
                email: email,
                role: 'User',
              })
              console.log(response)
          } catch(err) {
            setError(err)
          }
        }
    }

    const validateInputs = () => {
        if (!username || !password || !email || !confirmPassword) {
            setError('Please fill out all fields before submitting.')
            return false
        }
        if (!validateEmail(email)) {
            setError('Email address is invalid.')
            return false
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return false
        }
        return true
    }

    return (
        <div>
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
                            Email:
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Confirm Password:
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </label>
                    </div>
                    {error ? (
                        <p style={{color: 'red'}}>{error}</p>
                    ) : null}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Register
