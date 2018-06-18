import React from 'react'

const LogoutForm = ({ handleSubmit }) => {
    return (
        <div>
            <h3>Haluatko varmasti kirjautua ulos sovelluksesta?</h3>
            <form onSubmit={handleSubmit}>
                <button type="submit">Kirjaudu ulos</button>
            </form>
        </div>
    )
}

export default LogoutForm