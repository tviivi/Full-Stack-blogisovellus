import React from 'react'
import Blog from './components/Blog'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: props.blogs,
            newBlog: 'Uusi blogi'
        }
    }

    addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            subject: this.state.newBlog,
            content: 'testi',
            date: new Date().new,
            id: this.state.blogs.length + 1,
            likes: 0
        }
        const blogs = this.state.blogs.concat(blogObject)

        this.setState({
            blogs: blogs,
            newBlog: ''
        })
    }

    handleBlogChange = (event) => {
        this.setState({ newBlog: event.target.value })
    }

    render() {
        return (
            <div>
                <h1>Blogisi</h1>
                <ul>
                    {this.state.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
                </ul>
                <form onSubmit={this.addBlog}>
                    <input
                        value={this.state.newBlog}
                        onChange={this.handleBlogChange} />
                    <button type="submit">Lisää uusi</button>
                </form>
            </div>
        )
    }
}

export default App