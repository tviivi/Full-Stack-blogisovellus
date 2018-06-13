import React from 'react'

const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div className="wrapper">
            {blog.subject}
            : {blog.likes} tykkäystä
                <button onClick={likeBlog(blog.id)}>Tykkää</button>
            <button onClick={removeBlog(blog.id)}>Poista blogi</button>
        </div>
    )
}

export default Blog