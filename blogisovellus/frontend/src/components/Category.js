import React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  console.log(category)
  return (
    <div>
      <Panel bsStyle="warning">
        <Panel.Heading>
          <Panel.Title>
            <h2>
              <Glyphicon glyph="align-justify" /> Kategoria "{category.content}"
            </h2>
          </Panel.Title>
          <Panel.Body>
            <h4>Kategoriassa olevat blogit:</h4>
            {category.blogs.map(blog => (
              <li key={blog._id}>
                <Link to={`/blogs/${blog._id}`}>{blog.subject}</Link>
              </li>
            ))}
            <li>
              Jostain syystä kategorioissa olevat blogit ei välity tänne asti,
              en kerennyt selvittää, miksi :(
            </li>
          </Panel.Body>
        </Panel.Heading>
      </Panel>
    </div>
  )
}

export default Category
