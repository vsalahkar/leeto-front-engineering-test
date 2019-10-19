import React, {useState} from 'react'
import './App.css'
import UserContext from "./UserContext"
import SignIn from "./pages/SignIn"

function App() {
    const [user, setUser] = useState({})
    const [headers, setHeaders] = useState({})

    return (
        <main>
            <UserContext.Provider value={{user, setUser, headers, setHeaders}}>
                <SignIn/>
            </UserContext.Provider>
        </main>
    )
}

export default App
