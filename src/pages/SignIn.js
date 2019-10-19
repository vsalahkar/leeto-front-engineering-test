import React, {useState, useContext, Fragment} from 'react'
import axios from 'axios'
import Configuration from '../../configuration'
import UserContext from '../UserContext'

function SignIn() {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const {setUser, setHeaders} = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const result = await axios.post(`${Configuration.apiUrl}/auth/sign_in`, {
                email: emailInput,
                password: passwordInput
            })

            setUser(result.data.data)
            setHeaders(result.headers)
        } catch (error) {
            console.error('Authentication failed', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Professional email
                    <input type="email" value={emailInput} name="email"
                           onChange={(event) => setEmailInput(event.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <input type="password" value={passwordInput} name="password"
                           onChange={(event) => setPasswordInput(event.target.value)}/>
                </label>
            </div>
            <button type="submit" onClick={handleSubmit}>Sign in</button>
        </form>
    )
}

export default SignIn
