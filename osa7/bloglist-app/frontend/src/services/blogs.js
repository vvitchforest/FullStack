import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const comment = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  )
  return response.data
}

const deleteById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, update, comment, deleteById, setToken }
