import React from 'react'
import { Button, Panel, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog, removeBlog, likeBlog, user }) => {
    const hide = { display : user ? '' : 'none'}
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title><h2>{blog.subject}</h2>{blog.date}
                        <div><em>Tykkäykset: <Badge>{blog.likes}</Badge> | Kirjoittaja: {blog.user.name}</em></div></Panel.Title>
                </Panel.Heading>
                <Panel.Body><div>{blog.content}</div>
                    <div style={hide}>
                        <Button bsStyle="info" onClick={likeBlog(blog.id)}>Tykkää blogista</Button>
                        <Link to="/"><Button bsStyle="primary" onClick={removeBlog(blog.id)}>Poista blogi</Button></Link>
                        <Link to={`/updateblog/${blog.id}`}><Button bsStyle="info">Muokkaa blogia</Button></Link>
                    </div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default Blog