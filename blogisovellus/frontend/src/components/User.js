import React from 'react'
import { Panel } from 'react-bootstrap'

const User = ({ user }) => {
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h3"><h2>{user.name}</h2></Panel.Title>
                </Panel.Heading>
                <Panel.Body><div>Käyttäjätunnus: {user.username}</div>
                    <div>Blogit:</div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default User