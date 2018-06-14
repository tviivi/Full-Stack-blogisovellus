import React from 'react'

const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div className="wrapper">
            <div className="content">
                {blog.subject}
            </div>
            <div className="others">
                - {blog.likes} tykkäystä 
                {/* <button onClick={likeBlog(blog.id)}>Tykkää</button>
                <button onClick={removeBlog(blog.id)}>Poista blogi</button> */}
            </div>
        </div>
    )
}

export default Blog