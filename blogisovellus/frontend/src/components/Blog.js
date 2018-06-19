import React from 'react'
import { Table, FormGroup, FormControl, ControlLabel, Button, Panel, Badge } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h3"><h2>{blog.subject}</h2>
                        <em><h4>Tykkäykset: <Badge>{blog.likes}</Badge> | Kirjoittaja: {blog.user.name}</h4></em></Panel.Title>
                </Panel.Heading>
                <Panel.Body><div>{blog.content}</div>
                    <Button bsStyle="info" onClick={likeBlog(blog.id)}>Tykkää blogista</Button>
                    <Button bsStyle="primary" onClick={removeBlog(blog.id)}>Poista blogi</Button></Panel.Body>
            </Panel>


        </div>
    )
}

export default Blog