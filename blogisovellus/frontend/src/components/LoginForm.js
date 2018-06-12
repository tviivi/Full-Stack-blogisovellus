import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    käyttäjätunnus
            <input
                        value={username}
                        onChange={handleChange}
                        name="username"
                    />
                </div>
                <div>
                    salasana
            <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    )
}

export default LoginForm