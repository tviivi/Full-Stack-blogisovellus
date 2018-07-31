import React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <div className="userstyle">
            <Panel bsStyle="warning">
                <Panel.Heading>
                    <Panel.Title><h2><Glyphicon glyph="user" /> Käyttäjän "{user.name}" tiedot</h2></Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div>Käyttäjätunnuksesi: <b>{user.username}</b></div>
                    <div>Kirjoittamasi blogit: {user.blogs.map(blog =>
                        <li key={blog._id}>
                            <Link to={`/blogs/${blog._id}`}>{blog.subject}</Link>
                        </li>
                    )}</div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default User