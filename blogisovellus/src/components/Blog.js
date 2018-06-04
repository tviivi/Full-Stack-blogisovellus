import React from 'react'

const Blog = ({ blog }) => {
    return (
        <li className="blog">
            {blog.subject}
        </li>
    )
}

export default Blog