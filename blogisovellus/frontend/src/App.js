import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import LogoutForm from './components/LogoutForm'
import User from './components/User'
import { Table, Navbar, NavItem, Nav, Badge } from 'react-bootstrap'

const Home = ({ blogs }) => (
    <div>
        <h1>Tervetuloa BLOGIZIin</h1>
        <Table striped>
            <tbody>
                {blogs.map(blog =>
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blogs/${blog.id}`}>{blog.subject}</Link>
                        </td>
                        <td>
                            <Badge>{blog.likes}</Badge> tykkäystä
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
)

const Footer = () => (
    <em>
        Tämä teksti näkyy kaikilla sivuilla.
    </em>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            newSubject: '',
            newContent: '',
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
            this.notify(`Käyttäjätunnus tai salasana virheellinen`)
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    }

    logout = async (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        this.notify(`Kirjauduit ulos`)
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
        const blogById = (id) =>
            this.state.blogs.find(blog => blog.id === id)

        return (
            <Router>
                <div className="container">
                    <div>
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    BLOGIZI
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem href="#">
                                        <Link to="/">Etusivu</Link>
                                    </NavItem>
                                    <NavItem href="#">
                                        {this.state.user
                                            ? <Link to="/newblog">Uusi blogi</Link> : null}
                                        </NavItem>
                                    <NavItem href="#">
                                        {this.state.user
                                            ? <Link to="/user">Omat tiedot</Link>
                                            : <Link to="/login">Kirjaudu sisään</Link>
                                        }
                                    </NavItem>
                                    <NavItem href="#">
                                        {this.state.user
                                            ? <Link to="/logout">Kirjaudu ulos</Link> : null}
                                        </NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div>
                        <Notification message={this.state.notification} />
                    </div>
                    <Route exact path="/" render={() => <Home blogs={this.state.blogs} />} />
                    <Route exact path="/blogs/:id" render={({ match }) =>
                        <Blog blog={blogById(match.params.id)} removeBlog={this.removeBlog} likeBlog={this.likeBlog} />}
                    />
                    <Route exact path="/login" render={() => this.state.user ? <Redirect to="/" /> : <LoginForm visible={this.state.visible}
                        username={this.state.username}
                        password={this.state.password}
                        handleChange={this.handleLoginFieldChange}
                        handleSubmit={this.login}
                    />} />
                    <Route exact path="/logout" render={() => this.state.user ? <LogoutForm handleSubmit={this.logout} /> : <Redirect to="/" />} />
                    <Route exact path="/newblog" render={() =>
                        <BlogForm onSubmit={this.addBlog}
                            handleSubjectChange={this.handleSubjectChange}
                            handleContentChange={this.handleContentChange}
                            subjectValue={this.state.newSubject}
                            contentValue={this.state.newContent} />} />
                    <Route exact path="/user" render={() =>
                        <User user={this.state.user} />}
                    />
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App