import React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'

const User = ({ user }) => {
    return (
        <div className="userstyle">
            <Panel bsStyle="warning">
                <Panel.Heading>
                    <Panel.Title><h2><Glyphicon glyph="user" /> Käyttäjän "{user.name}" tiedot</h2></Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div>Käyttäjän nimi: {user.name}</div>
                    <div>Käyttäjätunnus: {user.username}</div>
                    {/* <div>Blogit: {user.blogs.map(blog => <tr key={blog.id}> <td>{blog.subject}</td></tr>)}</div> */}
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default User