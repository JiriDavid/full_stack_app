import axios from "axios"
import toast from "react-hot-toast"

axios.defaults.baseURL= "http://localhost:4000/api/v1"
axios.defaults.withCredentials = true

const responseBody = (response) => response.data

axios.interceptors.response.use((config) => {
  const token = localStorage.getItem("brokangToken")
  
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use( async (response) => response, (err) => {
  const { data, status} = err.response;
  switch(status){
    case 400:
       toast.error(data.message)
       break
    case 403:
      toast.error("You are not allowed to do that")
        break
    default:
      break    
  }
  return Promise.reject(err.response)
})

const request = {
  get: (url, params) => axios.get(url, {params}).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url, body) => axios.post(url,).then(responseBody)
}

const Account = {
  login: (data) => request.post("/user/login", data),
  loadUser: () => request.get("/user/loadUser"),
  logoutUser: () => request.post("/user/logout", {}),
  registerUser: (data) => request.post("/user/register", data)
}

const agent = {
  Account
}

export default agent