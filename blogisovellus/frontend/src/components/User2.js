import React from 'react'
import { Panel } from 'react-bootstrap'

const User2 = ({ user }) => {
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title><h2>Käyttäjän "{user.name}" tiedot</h2></Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div>Käyttäjätunnus: {user.username}</div>
                    <div>ID: {user.id}</div>
                    <div>Salasana: {user.password}</div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default User2