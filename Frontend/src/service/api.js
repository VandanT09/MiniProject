import axios from 'axios'

const url = 'http://localhost:8000'

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data)
  } catch (error) {
    console.log(`Error will adding the user API `, error.message)
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(`${url}/users`)
    return response.data
  } catch (error) {
    console.log('Error while getting the users ', error.message)
  }
}

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data)
  } catch (error) {
    console.log('Error while setting the conversation ', error.message)
  }
}


export const getConversation = async (data) => {
  try {
    const response = await axios.post(`${url}/conversation/get`, data)
    return response.data
  } catch (error) {
    console.log('Error while getting the conversation ', error.message)
  }
}


export const newMessage = async (data) => {
  try {
    await axios.post(`${url}/message/add`, data)
  } catch (error) {
    console.log('Error while calling the new message api ', error.message)
  }
}


export const getMessages = async (id) => {
  try {
    const response = await axios.get(`${url}/message/get/${id}`)
    return response.data
  } catch (error) {
    console.log('Error while getting the messages ', error.message)
  }
}


export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/file/upload`, data)
  } catch (error) {
    console.log('Error while uploading the file ', error.message)
  }
}