import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = ({ blogs }) => (
    <div> <h1>Tervetuloa BLOGIZIin</h1>
        <ul>
            {blogs.map(blog =>
                <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.subject}</Link>
                </li>
            )}
        </ul>
    </div>
)

const NewBlog = () => (
    <div> <h2>New Blog</h2> </div>
)

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
            user: null,
            page: 'home'
        }
    }

    // toPage = (page) => (event) => {
    //     event.preventDefault()
    //     this.setState({ page })
    // }

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

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    removeBlog = (id) => () => {
        const blog = this.state.blogs.find(blog => blog.id === id)
        const ok = window.confirm(`Poistetaanko blogi "${blog.subject}"?`)
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

    likeBlog = (id) => () => {
        const blog = this.state.blogs.find(blog => blog.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }
        const ok = window.confirm(`Annetaanko tykkäys blogille "${blog.subject}"?`)
        if (!ok) {
            return
        }

        blogService
            .update(id, changedBlog)
            .then(response => {
                this.setState({
                    blogs: this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
                })
                this.notify(`Tykkäsit blogista "${blog.subject}"`)
            })
    }

    notify = (notification) => {
        this.setState({ notification })
        setTimeout(() => {
            this.setState({ notification: null })
        }, 5000)
    }

    render() {
        // const content = () => {
        //     if (this.state.page === 'home') {
        //         return <Home />
        //     } else if (this.state.page === 'blogs') {
        //         return <Blogs />
        //     } else if (this.state.page === 'user') {
        //         return <User />
        //     } else if (this.state.page === 'newblog') {
        //         return <NewBlog />
        //     }
        // }

        const blogById = (id) =>
            this.state.blogs.find(blog => blog.id === id)

        const loginForm = () => {
            return (
                <div>
                    <Togglable buttonLabel="Kirjaudu sisään">
                        <LoginForm
                            visible={this.state.visible}
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleLoginFieldChange}
                            handleSubmit={this.login}
                        />
                    </Togglable>
                </div>
            )
        }

        const blogForm = () => (
            <div>
                <ul>
                    {this.state.blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} removeBlog={this.removeBlog} likeBlog={this.likeBlog} />
                    )}
                </ul>

                <Togglable buttonLabel="Uusi blogi" ref={component => this.BlogForm = component}>
                    <BlogForm
                        onSubmit={this.addBlog}
                        subjectValue={this.state.newSubject}
                        contentValue={this.state.newContent}
                        handleSubjectChange={this.handleSubjectChange}
                        handleContentChange={this.handleContentChange}
                    />
                </Togglable>

                <form onSubmit={this.logout}>
                    <button type="submit">Kirjaudu ulos</button>
                </form>
            </div>
        )

        return (
            <div>
                {/* <a href="" onClick={this.toPage('home')}>Etusivu</a> &nbsp;
                <a href="" onClick={this.toPage('blogs')}>Blogisi</a> &nbsp;
                <a href="" onClick={this.toPage('newblog')}>Lisää uusi blogi</a> &nbsp;
                <a href="" onClick={this.toPage('user')}>Omat tiedot</a> &nbsp;
                {content()}
                
                <Notification message={this.state.notification} />
                {this.state.user === null ?
                    loginForm() :
                    <div>
                        <p>Tervetuloa {this.state.user.name}!</p>
                        {blogForm()}
                    </div>
                } */}

                <Router>
                    <div>
                        <div>
                            <Link to="/">Etusivu</Link> &nbsp;
                            <Link to="/newblog">Uusi blogi</Link> &nbsp;
                        </div>
                        <Route exact path="/" render={() => <Home blogs={this.state.blogs} />} />
                        <Route exact path="/blogs/:id" render={({ match }) =>
                            <Blog blog={blogById(match.params.id)} removeBlog={this.removeBlog} likeBlog={this.likeBlog} />}
                        />
                        <Route exact path="/newblog" render={() =>
                            <BlogForm onSubmit={this.addBlog} handleSubjectChange={this.handleSubjectChange} handleContentChange={this.handleContentChange} subjectValue={this.state.newSubject} contentValue={this.state.newContent} />} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App