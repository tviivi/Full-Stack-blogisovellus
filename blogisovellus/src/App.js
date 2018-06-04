import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            newBlog: 'Uusi blogi',
            error: null
        }
    }

    componentDidMount() {
        blogService
            .getAll()
            .then(response => {
                this.setState({ blogs: response })
            })
    }

    addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            subject: this.state.newBlog,
            content: 'testi',
            date: new Date(),
            likes: 0
        }
        blogService
            .create(blogObject)
            .then(newBlog => {
                this.setState({
                    blogs: this.state.blogs.concat(newBlog),
                    newBlog: ''
                })
            })
            .catch(error => {
                this.setState({
                    error: 'tähän tulee ehkä joskus error-viesti'
                })
                setTimeout(() => {
                    this.setState({ error: null })
                }, 5000)
            })
    }

    handleBlogChange = (event) => {
        this.setState({ newBlog: event.target.value })
    }

    render() {
        return (
            <div>
                <h1>Blogisi</h1>
                <Notification message={this.state.error} />
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