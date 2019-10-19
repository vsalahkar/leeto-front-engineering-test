import React, {useState} from 'react'
import axios from 'axios'
import Configuration from '../configuration'
import './App.css'

function App() {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [data, setData] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const result = await axios.post(`${Configuration.apiUrl}/auth/sign_in`, {
                email: emailInput,
                password: passwordInput
            })
            setData(result.data)
            console.log(result)
        } catch (error) {
            console.error('Authentication failed', error)
        }
    }

    return (
        <main>
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
        </main>
    )
}

export default App
