import React from 'react'

const Blog = ({ blogs, removeBlog }) => (
    <div>
        <table>
            <tbody>
                {
                    blogs.map(blog =>
                        <tr key={blog.id}>
                            <td><button onClick={removeBlog(blog.id)}>poista</button></td>
                            <td>{blog.subject}</td>
                            <td>{blog.likes} likes</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div >
)

export default Blog