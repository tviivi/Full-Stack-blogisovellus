import React from 'react'
import Blog from './components/Blog'
import Categories from './components/Categories'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import commentService from './services/comments'
import categoriesService from './services/categories'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import RegisterForm from './components/RegisterForm'
import UpdateBlogForm from './components/UpdateBlogForm'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import User from './components/User'
import User2 from './components/User2'
import {
  Table,
  Navbar,
  NavItem,
  Nav,
  Badge,
  Alert,
  Carousel,
  Glyphicon,
  Button
} from 'react-bootstrap'

const Home = ({ blogs, user }) => (
  <div>
    <div className="header">
      <h1>
        <center>Tervetuloa BLOGIZIin!</center>
      </h1>
    </div>

    <Carousel>
      <Carousel.Item>
        <img
          width={1140}
          height={500}
          alt="900x500"
          src="http://interpersonalwellness.com/wp-content/uploads/2016/02/life.jpeg"
        />
        <Carousel.Caption>
          <h3>Kirjoita omia blogeja</h3>
          <p>Voit raapustaa mistä aiheesta tahansa, vain taivas on rajana!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={1140}
          height={500}
          alt="900x500"
          src="https://www.one-mind-one-energy.com/images/what-is-life.jpg"
        />
        <Carousel.Caption>
          <h3>Lue muiden kirjoittamia blogeja</h3>
          <p>Inspiroidu, karta viisautta, verkostoidu!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={1140}
          height={500}
          alt="900x500"
          src="https://timedotcom.files.wordpress.com/2014/03/improving-life-health-hiking-nature.jpg"
        />
        <Carousel.Caption>
          <h3>Mikset kokeilisi samantien?</h3>
          <p>
            Rekisteröidy ja kirjaudu sisään päästäksesi BLOGIZIn avaraan
            maailmaan!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
)

const Blogs = ({ blogs, onChange, value }) => (
  <div>
    <center>
      <Link to="/mostpopular">
        <Button bsStyle="danger">
          <Glyphicon glyph="thumbs-up" /> Suosituimmat
        </Button>
      </Link>
      <Link to="/newest">
        <Button bsStyle="danger">
          <Glyphicon glyph="time" /> Uusimmat
        </Button>
      </Link>
      <Link to="/alphabet">
        <Button bsStyle="danger">
          <Glyphicon glyph="sort-by-alphabet" /> Aakkoset
        </Button>
      </Link>
    </center>
    <center>
      <Alert bsStyle="warning">
        <Glyphicon glyph="search" /> Etsi blogeja hakusanalla:
        <input onChange={onChange} value={value} />
      </Alert>
    </center>
    <div className="media-left">
      <img
        className="media-object"
        width={565}
        height={300}
        src="https://cdn-images-1.medium.com/max/2000/1*m1WYR2mEAwkXOL6XeizUfA.jpeg"
        alt="Responsive"
      />
    </div>
    <div className="media-left">
      <img
        className="media-object"
        width={565}
        height={300}
        src="http://majasdiary.com/wp-content/uploads/2017/01/life-spirit-feature-img.jpg"
        alt="Responsive"
      />
    </div>
    <Table striped>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.subject} <em>({blog.user.name})</em>
              </Link>
            </td>
            <td>
              <Badge>{blog.likes}</Badge> <Glyphicon glyph="thumbs-up" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

const Footer = () => (
  <div>
    <em>
      <center>© Viivi Tiihonen, 2018, Full-Stack -harjoitustyö</center>
    </em>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      comments: [],
      newSubject: '',
      newCategory: '',
      newContent: '',
      username: '',
      password: '',
      user: null,
      search: '',
      users: [],
      newName: '',
      newPassword: '',
      newUsername: '',
      newComment: '',
      categories: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      this.setState({ blogs })
    })
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
    userService.getAll().then(users => {
      this.setState({ users })
    })
    commentService.getAll().then(comments => {
      this.setState({ comments })
    })
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      commentService.setToken(user.token)
    }
    categoriesService.getAll().then(categories => this.setState({ categories }))
  }

  addBlog = () => {
    const category = this.state.categories.find(
      category => category.id === this.state.newCategory
    )
    const blogObject = {
      subject: this.state.newSubject,
      content: this.state.newContent,
      date: new Date(),
      likes: 0,
      category
    }
    if (blogObject.subject === '') {
      this.notify(`Syötä blogille otsikko ja sisältö`)
      return
    }
    blogService.create(blogObject).then(newSubject => {
      this.setState({
        blogs: this.state.blogs.concat(newSubject),
        newSubject: '',
        newContent: '',
        newCategory: ''
      })
    })
    this.notify(`Uusi blogi "${this.state.newSubject}" lisätty`)
  }

  addComment = id => {
    const blog = this.state.blogs.find(blog => blog.id === id)
    const commentObject = {
      content: this.state.newComment,
      date: new Date(),
      blog: blog,
      likes: 0,
      user: this.state.user
    }
    commentService.create(commentObject).then(newComment => {
      const newBlog = { ...blog, comments: blog.comments.concat(newComment) }
      const newBlogs = this.state.blogs
        .filter(b => b.id !== blog.id)
        .concat(newBlog)

      this.setState({
        blogs: newBlogs,
        newComment: ''
      })
    })

    this.notify(`Uusi kommentti "${this.state.newComment}" lisätty`)
  }

  addUser = event => {
    event.preventDefault()
    const userObject = {
      name: this.state.newName,
      username: this.state.newUsername,
      password: this.state.newPassword
    }
    userService.create(userObject).then(newName => {
      this.setState({
        users: this.state.users.concat(newName),
        newUsername: '',
        newPassword: ''
      })
    })
    this.notify(`Rekisteröityminen onnistui!`)
  }

  updateBlog = id => {
    const blog = this.state.blogs.find(blog => blog.id === id)
    const changedBlog = {
      ...blog,
      content: this.state.newContent,
      likes: 0
    }
    if (this.state.user.username === blog.user.username) {
      const ok = window.confirm(
        `Jos muokkaat blogia, sen tykkäykset nollaantuvat. Tallennetaanko blogin "${
          blog.subject
        }" muutokset silti?`
      )
      if (!ok) {
        return
      }
      blogService.update(id, changedBlog).then(response => {
        this.setState({
          blogs: this.state.blogs.map(blog =>
            blog.id !== id ? blog : changedBlog
          )
        })
        this.notify(`Blogia "${blog.subject}" muokattu onnistuneesti`)
      })
    }
  }

  login = async event => {
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

  logout = async event => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.notify(`Kirjauduit ulos`)
  }

  handleCommentChange = event => {
    this.setState({ newComment: event.target.value })
  }

  handleSubjectChange = event => {
    this.setState({ newSubject: event.target.value })
  }

  handleContentChange = event => {
    this.setState({ newContent: event.target.value })
  }

  handleCategoryChange = event => {
    this.setState({ newCategory: event.target.value })
  }

  handleNameChange = event => {
    this.setState({ newName: event.target.value })
  }

  handleUsernameChange = event => {
    this.setState({ newUsername: event.target.value })
  }

  handlePasswordChange = event => {
    this.setState({ newPassword: event.target.value })
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value })
  }

  removeBlog = id => () => {
    const blog = this.state.blogs.find(blog => blog.id === id)

    if (this.state.user.username === blog.user.username) {
      const ok = window.confirm(`Poistetaanko blogi "${blog.subject}"?`)
      if (!ok) {
        return
      }

      blogService.remove(id).then(response => {
        this.setState({
          blogs: this.state.blogs.filter(blog => blog.id !== id)
        })
        this.notify(`Blogi "${blog.subject}" poistettu`)
      })
    }
  }

  likeBlog = id => () => {
    const blog = this.state.blogs.find(blog => blog.id === id)
    const userByName = username =>
      this.state.users.find(user => user.username === username)

    if (
      blog.users.find(user => user === userByName(this.state.user.username).id)
    ) {
      this.notify(`Olet jo tykännyt tästä blogista!`)
    } else {
      const changedBlog = {
        ...blog,
        likes: blog.likes + 1,
        users: blog.users.concat(userByName(this.state.user.username).id)
      }
      if (this.state.user.username !== blog.user.username) {
        const ok = window.confirm(
          `Annetaanko tykkäys blogille "${blog.subject}"?`
        )
        if (!ok) {
          return
        }
        blogService.update(id, changedBlog).then(response => {
          this.setState({
            blogs: this.state.blogs.map(blog =>
              blog.id !== id ? blog : changedBlog
            )
          })
          this.notify(`Tykkäsit blogista "${blog.subject}"`)
        })
      }
    }
  }

  likeComment = (id, blogId) => () => {
    const blog = this.state.blogs.find(b => b.id === blogId)
    const comment = blog.comments.find(comment => comment.id === id)

    const userByName = username =>
      this.state.users.find(user => user.username === username)

    if (
      comment.users.find(
        user => user === userByName(this.state.user.username).id
      )
    ) {
      this.notify(`Olet jo tykännyt tästä kommentista!`)
    } else {
      const changedComment = {
        ...comment,
        likes: comment.likes + 1,
        users: comment.users.concat(this.state.user.id)
      }
      if (this.state.user.username === comment.user.username) {
        const ok = window.confirm(`Et voi tykätä omasta kommentistasi`)
      }
      if (this.state.user.username !== comment.user.username) {
        const ok = window.confirm(
          `Tykätäänkö kommentista "${comment.content}"?`
        )
        if (!ok) {
          return
        }
        commentService.update(id, changedComment).then(response => {
          const blog = this.state.blogs.find(blog => blog.id === blogId)
          const newComments = blog.comments
            .filter(comment => comment.id !== id)
            .concat(changedComment)
          const newBlogs = this.state.blogs.map(b =>
            b.id !== blogId ? b : { ...blog, comments: newComments }
          )
          this.setState({
            blogs: newBlogs
          })
          this.notify(`Tykkäsit kommentista "${comment.content}"`)
        })
      }
    }
  }

  notify = notification => {
    this.setState({ notification })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  render() {
    const blogById = id => this.state.blogs.find(blog => blog.id === id)

    const userById = id => this.state.users.find(user => user.id === id)

    const userByName = username =>
      this.state.users.find(user => user.username === username)

    const categoryById = id =>
      this.state.categories.find(category => category.id === id)

    const bySearchTerm = blog => {
      if (this.state.search.length === 0) {
        return true
      }
      return (
        blog.subject.toLowerCase().includes(this.state.search.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.state.search.toLowerCase())
      )
    }

    const blogsToShow = this.state.blogs.filter(bySearchTerm)
    const blogsToShowMostPopular = this.state.blogs
      .filter(bySearchTerm)
      .sort((a, b) => b.likes - a.likes)
    const blogsToShowAlphabet = this.state.blogs
      .filter(bySearchTerm)
      .sort((a, b) => a.subject.localeCompare(b.subject))
    const blogsToShowNewest = this.state.blogs
      .filter(bySearchTerm)
      .sort((a, b) => b.date.localeCompare(a.date))

    return (
      <Router>
        <div className="container">
          <div>
            <Navbar inverse>
              <Navbar.Header>
                <Navbar.Brand>BLOGIZI</Navbar.Brand>
              </Navbar.Header>
              <Nav className="color-me">
                <NavItem componentClass="span">
                  <Link className="link" to="/">
                    <Glyphicon glyph="home" /> Etusivu
                  </Link>
                </NavItem>
                <NavItem componentClass="span">
                  <Link className="link" to="/blogs">
                    <Glyphicon glyph="star" /> Blogit
                  </Link>
                </NavItem>
                <NavItem componentClass="span">
                  {this.state.user ? (
                    <Link className="link" to="/newblog">
                      <Glyphicon glyph="pencil" /> Uusi blogi
                    </Link>
                  ) : null}
                </NavItem>
                <NavItem componentClass="span">
                  <Link className="link" to="/categories">
                    <Glyphicon glyph="align-justify" /> Kategoriat
                  </Link>
                </NavItem>
                <NavItem componentClass="span">
                  {this.state.user ? (
                    <Link className="link" to="/user">
                      <Glyphicon glyph="user" /> Omat tiedot (
                      {this.state.user.username})
                    </Link>
                  ) : (
                    <Link className="link" to="/login">
                      <Glyphicon glyph="play" /> Kirjaudu sisään
                    </Link>
                  )}
                </NavItem>
                <NavItem componentClass="span">
                  {this.state.user ? (
                    <Link className="link" to="/logout">
                      <Glyphicon glyph="pause" /> Kirjaudu ulos
                    </Link>
                  ) : null}
                </NavItem>
                <NavItem componentClass="span">
                  {this.state.user ? null : (
                    <Link to="/register">
                      <Glyphicon glyph="plus-sign" /> Rekisteröidy
                    </Link>
                  )}
                </NavItem>
              </Nav>
            </Navbar>
          </div>
          <div>
            <Notification message={this.state.notification} />
          </div>
          <Route
            exact
            path="/"
            render={() => <Home user={this.state.user} />}
          />
          <Route
            exact
            path="/mostpopular"
            render={() => (
              <Blogs
                blogs={blogsToShowMostPopular}
                onChange={this.handleSearchChange}
                value={this.state.search}
              />
            )}
          />
          <Route
            exact
            path="/alphabet"
            render={() => (
              <Blogs
                blogs={blogsToShowAlphabet}
                onChange={this.handleSearchChange}
                value={this.state.search}
              />
            )}
          />
          <Route
            exact
            path="/newest"
            render={() => (
              <Blogs
                blogs={blogsToShowNewest}
                onChange={this.handleSearchChange}
                value={this.state.search}
              />
            )}
          />
          <Route
            exact
            path="/blogs"
            render={() => (
              <Blogs
                blogs={blogsToShow}
                onChange={this.handleSearchChange}
                value={this.state.search}
              />
            )}
          />
          <Route
            exact
            path="/blogs/:id"
            render={({ match, history }) => (
              <Blog
                blog={blogById(match.params.id)}
                removeBlog={this.removeBlog}
                likeBlog={this.likeBlog}
                user={this.state.user}
                addComment={this.addComment}
                contentValue={this.state.newComment}
                handleContentChange={this.handleCommentChange}
                match={match}
                users={this.state.users}
                likeComment={this.likeComment}
                history={history}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.state.user ? (
                <Redirect to="/" />
              ) : (
                <LoginForm
                  visible={this.state.visible}
                  username={this.state.username}
                  password={this.state.password}
                  handleChange={this.handleLoginFieldChange}
                  handleSubmit={this.login}
                />
              )
            }
          />
          <Route
            exact
            path="/logout"
            render={() =>
              this.state.user ? (
                <LogoutForm handleSubmit={this.logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/newblog"
            render={({ match, history }) =>
              this.state.user ? (
                <BlogForm
                  category={categoryById(match.params.id)}
                  handleSubjectChange={this.handleSubjectChange}
                  handleContentChange={this.handleContentChange}
                  handleCategoryChange={this.handleCategoryChange}
                  subjectValue={this.state.newSubject}
                  contentValue={this.state.newContent}
                  categoryValue={this.state.newCategory}
                  history={history}
                  match={match}
                  addBlog={this.addBlog}
                  notify={this.notify}
                  categories={this.state.categories}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={({ history }) => (
              <RegisterForm
                onSubmit={this.addUser}
                handleNameChange={this.handleNameChange}
                handleUsernameChange={this.handleUsernameChange}
                handlePasswordChange={this.handlePasswordChange}
                nameValue={this.state.newName}
                usernameValue={this.state.newUsername}
                passwordValue={this.state.newPassword}
                history={history}
                addUser={this.addUser}
                notify={this.notify}
              />
            )}
          />
          <Route
            exact
            path="/user"
            render={() => <User user={userByName(this.state.user.username)} />}
          />
          <Route
            exact
            path="/categories"
            render={() => (
              <Categories
                categories={this.state.categories}
                blogs={this.state.blogs}
              />
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={({ match }) => <User2 user={userById(match.params.id)} />}
          />
          <Route
            exact
            path="/updateblog/:id"
            render={({ match, history }) => (
              <UpdateBlogForm
                onSubmit={this.updateBlog}
                updateBlog={this.updateBlog}
                handleSubjectChange={this.handleSubjectChange}
                handleContentChange={this.handleContentChange}
                subjectValue={this.state.newSubject}
                contentValue={this.state.newContent}
                blog={blogById(match.params.id)}
                match={match}
                history={history}
              />
            )}
          />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
