import axios from 'axios'

// ES6 Promise的封装
export function request(options) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例对象
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000/api/h8',
      timeout: 5000
    })

    // 过滤器(拦截器)
    instance.interceptors.response.use(res => {
      return res.data
    })

    // 通过实例发送网络请求
    instance(options)
      .then(res => {
        resolve(res)
      }).catch(err => {
      reject(err)
    })
  })
}

export function request_POST(url, options={}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: 'http://49.234.93.13:8555'+url,
      data: options,
      // timeout: 5000,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// ES6 Promise的封装
export function request_GET(url, options={}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'http://49.234.93.13:8555'+url,
      params: options,
      // timeout: 5000,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
