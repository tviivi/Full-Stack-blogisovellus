import React from 'react'
import { Glyphicon, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Categories = ({ categories, blogs, category }) => {
  console.log(categories)
  return (
    <div>
      <h2>Olemassaolevat kategoriat</h2>
      <Table striped>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>
                <Glyphicon glyph="align-justify" />
                <Link to={`/categories/${category.id}`}>
                  {category.content}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Categories
