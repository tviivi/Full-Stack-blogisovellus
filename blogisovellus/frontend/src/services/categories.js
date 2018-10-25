import axios from 'axios'
const baseUrl = '/api/categories'

const getAll = () => {
    console.log("menee")
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default { getAll, create }