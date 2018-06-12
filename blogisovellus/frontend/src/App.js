import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            newSubject: '',
            newContent: '',
            error: null,
            username: '',
            password: '',
            user: null
        }
    }

    componentDidMount() {
        blogService
            .getAll()
            .then(blogs => {
                this.setState({ blogs })
            })
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            blogService.setToken(user.token)
        }
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

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({ username: '', password: '', user })
        } catch (exception) {
            this.setState({
                error: 'käyttäjätunnus tai salasana virheellinen',
            })
            this.notify(`Käyttäjätunnus tai salasana virheellinen`)
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    }

    logout = async (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
    }

    handleSubjectChange = (event) => {
        this.setState({ newSubject: event.target.value })
    }

    handleContentChange = (event) => {
        this.setState({ newContent: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
        const loginForm = () => {
            const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
            const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

            return (
                <div>
                    <div style={hideWhenVisible}>
                        <button onClick={e => this.setState({ loginVisible: true })}>Kirjaudu sisään</button>
                    </div>
                    <div style={showWhenVisible}>
                        <ul>
                            <LoginForm
                                visible={this.state.visible}
                                username={this.state.username}
                                password={this.state.password}
                                handleChange={this.handleLoginFieldChange}
                                handleSubmit={this.login}
                            />
                        </ul>
                        <button onClick={e => this.setState({ loginVisible: false })}>Takaisin</button>
                    </div>
                </div>
            )
        }

        const blogForm = () => (
            <div>
                <ul>
                    <Blog blogs={this.state.blogs} removeBlog={this.removeBlog} />
                </ul>
                <form onSubmit={this.addBlog}>
                    <div>
                        Blogin aihe:
                        <input
                            value={this.state.newSubject}
                            onChange={this.handleSubjectChange} />
                    </div>
                    <div>
                        Blogin sisältö:
                        <input
                            value={this.state.newContent}
                            onChange={this.handleContentChange} />
                    </div>
                    <button type="submit">Lisää uusi</button>
                </form>
                <form onSubmit={this.logout}>
                    <button type="submit">Kirjaudu ulos</button>
                </form>
            </div>
        )

        return (
            <div>
                <h1>Tervetuloa BLOGIZIin</h1>
                <Notification message={this.state.notification} />
                {this.state.user === null ?
                    loginForm() :
                    <div>
                        <p>Tervetuloa {this.state.user.name}!</p>
                        {blogForm()}
                    </div>
                }
            </div>
        )
    }
}

export default App