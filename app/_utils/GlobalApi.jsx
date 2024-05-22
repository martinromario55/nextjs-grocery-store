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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCategory,
  getSliders,
}
