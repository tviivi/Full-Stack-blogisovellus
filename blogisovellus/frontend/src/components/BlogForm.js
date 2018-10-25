import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'

const BlogForm = ({ categories, handleSubjectChange, handleContentChange, subjectValue, contentValue, history, addBlog, notify }) => {

    const onSubmit = (event) => {
        event.preventDefault()
        if (subjectValue === "" || contentValue === "") {
            notify(`Syötä blogille otsikko ja sisältö`)
            return
        }
        console.log(categories)
        addBlog(event)
        history.push('/blogs')
    }

    return (
        <div className="bg-img">
            <h2>Lisää uusi blogi</h2>

            <form onSubmit={onSubmit}>
                <FormGroup controlId="formControlsTextarea">
                    <div>
                        <ControlLabel>Blogin aihe:</ControlLabel>
                        <FormControl type="text" placeholder="Blogin aihe"
                            value={subjectValue}
                            onChange={handleSubjectChange} />
                    </div>
                    <div>
                        <ControlLabel>Blogin sisältö:</ControlLabel>
                        <FormControl style={{ height: '150px' }} componentClass="textarea" placeholder="Blogin sisältö"
                            value={contentValue}
                            onChange={handleContentChange} />
                    </div>
                    <div>
                        <FormGroup controlId="formControlsSelect">
                            <div><ControlLabel>Kategoria:</ControlLabel></div>
                            {categories.map(category => <div key={category._id}>{category.content}</div>)}
                            <FormControl componentClass="select" placeholder="Kategoria">
                                {categories.map(category =>
                                <div key={category._id}><option value="select">{category.content}</option></div>)}
                            </FormControl>
                        </FormGroup>
                    </div>
                    <Button bsStyle="primary" type="submit"><Glyphicon glyph="pencil" /> Lisää uusi</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default BlogForm