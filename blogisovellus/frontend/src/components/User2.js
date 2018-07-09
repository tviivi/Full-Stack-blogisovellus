import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
                    Blogit: {user.blogs.map(blog =>
                        <li key={blog._id}>
                            <Link to={`/blogs/${blog._id}`}>{blog.subject}</Link>
                        </li>
                    )}
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default User2