import React from 'react'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div>
                <h2>{blog.subject}</h2><em><h4>Tykkäykset: {blog.likes} | Kirjoittaja: {blog.user.name}</h4></em>
                <div>{blog.content}</div>
                <Button bsStyle="info" onClick={likeBlog(blog.id)}>Tykkää blogista</Button>
                <Button bsStyle="primary" onClick={removeBlog(blog.id)}>Poista blogi</Button>
        </div>
    )
}

export default Blog