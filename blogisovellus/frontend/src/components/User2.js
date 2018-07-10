import React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User2 = ({ user }) => {
    return (
        <div>
            <div className="media-left">
                <img className="media-object" width={1140} src="http://cdn-img.health.com/sites/default/files/styles/1220x200/public/styles/main/public/live-life-to-the-fullest-178808529.jpg?itok=vYiAIiVQ"
                    alt="Responsive"></img>
            </div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title><h2><Glyphicon glyph="user" /> Käyttäjän "{user.name}" tiedot</h2></Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div>Käyttäjätunnus: <b>{user.username}</b></div>
                    Käyttäjän kirjoittamat blogit: {user.blogs.map(blog =>
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