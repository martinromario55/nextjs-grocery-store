import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const getCategory = () => axiosClient.get('/categories?populate=*')

const getSliders = () =>
  axiosClient.get('/sliders?populate=*').then(res => {
    // console.log(res.data.data)
    return res.data.data
  })

const getCategoryList = () =>
  axiosClient.get('/categories?populate=*').then(res => {
    return res.data.data
  })

const getAllProducts = () =>
  axiosClient.get('/products?populate=*').then(res => {
    return res.data.data
  })

const registerUser = (username, email, password) =>
  axiosClient.post('/auth/local/register', {
    username,
    email,
    password,
  })

const signInUser = (email, password) =>
  axiosClient.post('/auth/local', {
    identifier: email,
    password,
  })

const addToCart = (data, jwt) =>
  axiosClient.post('/user-carts', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(`/user-carts?filters[userId][$eq]=${userId}&populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then(resp => {
      return resp.data.data
    })
    .catch(error => {
      console.log(error)
      throw new Error('Something went wrong!')
    })

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  registerUser,
  signInUser,
  addToCart,
  getCartItems,
}
