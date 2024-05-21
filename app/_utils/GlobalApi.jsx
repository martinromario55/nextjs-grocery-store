import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const getCategory = () => axiosClient.get('/categories?populate=*')

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCategory,
}
