import React from 'react'
import { Button, Panel, Badge, Glyphicon, FormControl, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog, removeBlog, likeBlog, user, onSubmit, contentValue, handleContentChange, addComment, match }) => {
    const hide = { display: user ? '' : 'none' }
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title><h2>{blog.subject}</h2>{blog.date}
                        <div><em>Tykkäykset: <Badge>{blog.likes}</Badge> | Kirjoittaja: <Link to={`/users/${blog.user._id}`}>{blog.user.name}</Link></em></div></Panel.Title>
                </Panel.Heading>
                <Panel.Body><div>{blog.content}</div>
                    <div style={hide}>
                        <Button bsStyle="info" onClick={likeBlog(blog.id)}><Glyphicon glyph="thumbs-up" /> Tykkää blogista</Button>
                        <Link to="/blogs"><Button bsStyle="primary" onClick={removeBlog(blog.id)}><Glyphicon glyph="trash" /> Poista blogi</Button></Link>
                        <Link to={`/updateblog/${blog.id}`}><Button bsStyle="info"><Glyphicon glyph="edit" /> Muokkaa blogia</Button></Link>
                    </div>
                </Panel.Body>
            </Panel>
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
                                    <div className="comment">{comment.user}: <em>{comment.content}</em></div>
                                </Panel>
                            </div>
                        )}
                        <Panel bsStyle="info">
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                addComment(match.params.id);
                            }}>
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
                </Panel.Body>
            </Panel>
        </div >
    )
}

export default Blog