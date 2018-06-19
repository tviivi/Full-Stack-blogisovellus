import React from 'react'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div>
                <h2>{blog.subject}</h2>
                <li>Kirjoittaja: {blog.user.name}</li>
                <li>{blog.likes} tykkäystä </li>
                <Button bsStyle="info" onClick={likeBlog(blog.id)}>Tykkää blogista</Button>
                <Button bsStyle="primary" onClick={removeBlog(blog.id)}>Poista blogi</Button>
        </div>
    )
}

export default Blog