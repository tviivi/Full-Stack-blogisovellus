import React from 'react'

const User = ({ user }) => {
    return (
        <div>
                <h3>Nimi: {user.name}</h3>
                <div>Käyttäjätunnus: {user.username}</div>
        </div>
    )
}

export default User