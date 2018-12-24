import React from 'react'
import { Glyphicon, Table } from 'react-bootstrap'

const Categories = ({ categories, blogs }) => {
  return (
    <div>
      <h2>Olemassaolevat kategoriat</h2>
      <Table striped>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>
                <Glyphicon glyph="align-justify" /> {category.content}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Categories
