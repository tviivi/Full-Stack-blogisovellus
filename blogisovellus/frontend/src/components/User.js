import React from 'react'

const User = ({ user }) => {
    return (
        <div>
                <div>Nimi: {user.name}</div>
                <div>Käyttäjätunnus: {user.username}</div>
        </div>
    )
}

export default User