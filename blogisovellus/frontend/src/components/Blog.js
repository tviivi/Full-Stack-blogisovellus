import React from 'react'

const Blog = ({ blogs, removeBlog }) => (
    <div>
        <table>
            <tbody>
                {
                    blogs.map(blog =>
                        <tr key={blog.id}>
                            <td><button onClick={removeBlog(blog.id)}>Poista</button></td>
                            <td>{blog.subject}</td>
                            <td>- {blog.likes} tykkäystä</td>
                            <td><button>Tykkää</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div >
)

export default Blog