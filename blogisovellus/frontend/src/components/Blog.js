import React from 'react'

const Blog = ({ blog, removeBlog }) => {
    return (
        <div className="blog">
            {blog.subject}
            : {blog.likes} tykkäystä
            <button>Tykkää</button>
            <button onClick={removeBlog(blog.id)}>Poista blogi</button>
        </div>
    )
}

export default Blog