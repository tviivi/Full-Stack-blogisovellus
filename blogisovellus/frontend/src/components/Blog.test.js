import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    // ei jostain syystä toimi?
    it('renders subject', () => {
        const blog = {
            subject: 'Jee',
            content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä'
        }
        console.log(blog)

        const blogComponent = shallow(<Blog blog={blog} />)
        console.log(blogComponent.debug())

        const subjectDiv = blogComponent.find('.subject')
        console.log(subjectDiv.debug())

        expect(subjectDiv.text()).toContain(blog.subject)
    })
})