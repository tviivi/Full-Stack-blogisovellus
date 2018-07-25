import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    console.log("create")
    const request = axios.post(baseUrl, newObject)
    console.log(newObject)
    return request.then(response => response.data)
}

export default { getAll, create }