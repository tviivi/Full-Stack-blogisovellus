import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

axios.get('http://localhost:3001/blogs').then(response => {
  const blogs = response.data
  console.log(blogs)
})

const blogs = [
    {
        id: 1,
        subject: 'Kissablogi',
        content: 'Skfpsdkf lnadkfökak dfam dflsf.',
        date: '2017-12-10T17:30:31.098Z',
        likes: 0
    },
    {
        id: 2,
        subject: 'Näin huollat autoasi',
        content: 'Psdof. SJsdjflashoåsdnfnm!',
        date: '2017-12-10T18:39:34.091Z',
        likes: 0
    },
    {
        id: 3,
        subject: 'Kauneusvinkit',
        content: 'Dpspdjfösäv åjrnådff yqw8 jspdfkjsdfn.',
        date: '2017-12-10T19:20:14.298Z',
        likes: 0
    }
]

ReactDOM.render(
    <App blogs={blogs} />,
    document.getElementById('root')
)