import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('renders content', () => {
        const blog = {
            subject: 'Jee testejä, jee!',
            content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            likes: 0
        }

        const blogComponent = shallow(<Blog blog={blog} />)
        console.log(blogComponent.debug)
        const contentDiv = blogComponent.find('.content')
        console.log(contentDiv.debug)

        expect(contentDiv.text()).toContain(blog.subject)
    })
})