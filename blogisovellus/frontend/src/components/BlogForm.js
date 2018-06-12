import React from 'react'

const BlogForm = ({ onSubmit, handleSubjectChange, handleContentChange, subjectValue, contentValue }) => {
    return (
        <div>
            <h2>Lisää uusi blogi</h2>

            <form onSubmit={onSubmit}>
                <div>
                    Blogin aihe:
                        <input
                        value={subjectValue}
                        onChange={handleSubjectChange} />
                </div>
                <div>
                    Blogin sisältö:
                        <input
                        value={contentValue}
                        onChange={handleContentChange} />
                </div>
                <button type="submit">Lisää uusi</button>
            </form>
        </div>
    )
}

export default BlogForm