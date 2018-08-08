import React from 'react'
import { Button, Panel, Badge, Glyphicon, FormControl, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog, history, removeBlog, likeBlog, user, contentValue, handleContentChange, addComment, match, users, likeComment }) => {
    const hide = user ? { display: user.username !== blog.user.username ? '' : 'none' } : { display: user ? '' : 'none' }
    const hide2 = user ? { display: user.username === blog.user.username ? '' : 'none' } : { display: user ? '' : 'none' }
    const hide3 = { display: user ? '' : 'none' }

    const onSubmit = (event) => {
        event.preventDefault()
        if (contentValue === "") {
            window.confirm(`Unohdit syöttää kommentille sisällön!`)
            return
        }
        addComment(match.params.id)
    }

    const userById = (id) =>
        users.find(user => user.id === id)

    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title><h2 className="subject">{blog.subject} </h2>{blog.date}
                        <div><em>Tykkäykset: <Badge>{blog.likes}</Badge> | Kirjoittaja: <Link to={`/users/${blog.user._id}`}>{blog.user.name}</Link></em></div></Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div style={hide}>
                        <Button bsStyle="info" onClick={likeBlog(blog.id)}><Glyphicon glyph="thumbs-up" /> Tykkää blogista</Button>
                    </div>
                    <div style={hide2}>
                        <Link to="/blogs"><Button bsStyle="primary" onClick={removeBlog(blog.id)}><Glyphicon glyph="trash" /> Poista blogi</Button></Link>
                        <Link to={`/updateblog/${blog.id}`}><Button bsStyle="info"><Glyphicon glyph="edit" /> Muokkaa blogia</Button></Link>
                    </div>
                    <div>{blog.content.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br /></span>
                    })}</div>
                </Panel.Body>
            </Panel >
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title>Kommentit</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div>
                        {blog.comments.map(comment =>
                            <div key={comment._id}>
                                <Panel bsStyle="info">
                                    <b>{comment.date}</b>
                                    <div className="comment"><Link to={`/users/${comment.user}`}>{userById(comment.user).name}</Link>: <em>{comment.content}</em></div>
                                    <div className="comment" style={hide}><Button bsStyle="primary" onClick={likeComment(comment._id)}><Glyphicon glyph="thumbs-up" /> Tykkää kommentista</Button> {comment.likes} tykkäystä</div>
                                </Panel>
                            </div>
                        )}
                        <div style={hide3}>
                            <Panel bsStyle="info">
                                <form onSubmit={onSubmit}>
                                    <FormGroup controlId="formControlsTextarea">
                                        <div>
                                            <FormControl style={{ height: '100px' }} componentClass="textarea" placeholder="Kirjoita oma kommenttisi"
                                                value={contentValue}
                                                onChange={handleContentChange} />
                                        </div>
                                        <Button bsStyle="info" type="submit"><Glyphicon glyph="pencil" /> Kommentoi</Button>
                                    </FormGroup>
                                </form>
                            </Panel>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        </div >
    )
}

export default Blog