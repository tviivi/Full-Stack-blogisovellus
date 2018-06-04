import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            newSubject: 'Uusi blogi',
            newContent: 'Uusi sisältö',
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
            subject: this.state.newSubject,
            content: this.state.newContent,
            date: new Date(),
            likes: 0
        }
        blogService
            .create(blogObject)
            .then(newSubject => {
                this.setState({
                    blogs: this.state.blogs.concat(newSubject),
                    newSubject: '',
                    newContent: ''
                })
            })
            //this.notify(`Uusi blogi otsikolla ${newSubject}$ lisätty`)
    }

    handleSubjectChange = (event) => {
        this.setState({ newSubject: event.target.value })
    }

    handleContentChange = (event) => {
        this.setState({ newContent: event.target.value })
    }

    removeBlog = (id) => () => {
        const blog = this.state.blogs.find(blog => blog.id === id)
        const ok = window.confirm(`Poistetaanko ${blog.subject}`)
        if (!ok) {
            return
        }

        blogService
            .remove(id)
            .then(response => {
                this.setState({
                    blogs: this.state.blogs.filter(blog => blog.id !== id)
                })
                this.notify(`${blog.subject} poistettu`)
            })
    }

    notify = (notification) => {
        this.setState({ notification })
        setTimeout(() => {
            this.setState({ notification: null })
        }, 5000)
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
                    <div>
                        <input
                            value={this.state.newSubject}
                            onChange={this.handleSubjectChange} />
                    </div>
                    <div>
                        <input
                            value={this.state.newContent}
                            onChange={this.handleContentChange} />
                    </div>
                    <button type="submit">Lisää uusi</button>
                </form>
            </div>
        )
    }
}

export default App