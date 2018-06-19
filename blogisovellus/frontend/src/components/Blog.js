import React from 'react'

const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div>
                <h2>{blog.subject}</h2>
                <div>{blog.likes} tykkäystä </div>
                <button onClick={likeBlog(blog.id)}>Tykkää blogista</button>
                <button onClick={removeBlog(blog.id)}>Poista blogi</button>
        </div>
    )
}

export default Blog