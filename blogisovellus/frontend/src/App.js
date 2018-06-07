import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            newSubject: '',
            newContent: '',
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
        this.notify(`Uusi blogi "${this.state.newSubject}" lisätty`)
    }

    handleSubjectChange = (event) => {
        this.setState({ newSubject: event.target.value })
    }

    handleContentChange = (event) => {
        this.setState({ newContent: event.target.value })
    }

    removeBlog = (id) => () => {
        const blog = this.state.blogs.find(blog => blog.id === id)
        const ok = window.confirm(`Poistetaanko blogi "${blog.subject}"`)
        if (!ok) {
            return
        }

        blogService
            .remove(id)
            .then(response => {
                this.setState({
                    blogs: this.state.blogs.filter(blog => blog.id !== id)
                })
                this.notify(`Blogi "${blog.subject}" poistettu`)
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
                <Notification message={this.state.notification} />
                <ul>
                    <Blog blogs={this.state.blogs} removeBlog={this.removeBlog} />
                </ul>
                <form onSubmit={this.addBlog}>
                    <div>
                        Blogin aihe:
                        <input
                            value={this.state.newSubject}
                            onChange={this.handleSubjectChange}/>
                    </div>
                    <div>
                        Blogin sisältö:
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