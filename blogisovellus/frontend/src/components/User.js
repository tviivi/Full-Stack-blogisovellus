import React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <div className="userstyle">
            <Panel bsStyle="warning">
                <Panel.Heading className="panel-heading">
                    <Panel.Title><h2><Glyphicon glyph="user" /> Käyttäjän "{user.name}" tiedot</h2></Panel.Title>
                </Panel.Heading>
                <Panel.Body className="panel-body">
                    <h4><div>Käyttäjätunnuksesi: <b>{user.username}</b></div></h4>
                    <div><h4>Kirjoittamasi blogit:</h4> {user.blogs.map(blog =>
                        <div key={blog._id}>
                            <Glyphicon glyph="list-alt" /> <Link to={`/blogs/${blog._id}`}>{blog.subject}</Link>
                        </div>
                    )}</div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default User