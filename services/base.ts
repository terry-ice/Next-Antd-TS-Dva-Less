/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
// import router from '../router';
// import store from '../store/index';
import { message } from 'antd'
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */

// axios.defaults.baseURL = 'http://192.168.1.67:8000' // 生产环境的baseURL

// if (process.env.NODE_ENV === 'production') {
//     axios.defaults.baseURL = 'http://192.168.1.67:8000' // 生产环境的baseURL
// }

const tip = (msg: string, cb: () => void) => {
	message.info(msg, 2, cb)
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
// 	router.replace('/login')
// }

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: string) => {
	console.log('errorHandle')
	console.log(status)
	console.log(other)
	// 状态码判断
	message.warning(other)

	// switch (status) {
	//     // 401: 未登录状态，跳转登录页
	//     case 401:
	//         toLogin();
	//         break;
	//     // 403 token过期
	//     // 清除token并跳转登录页
	//     case 403:
	//         tip('登录过期，请重新登录');
	//         localStorage.removeItem('token');
	//         store.commit('loginSuccess', null);
	//         setTimeout(() => {
	//             toLogin();
	//         }, 1000);
	//         break;
	//     // 404请求不存在
	//     case 404:
	//         tip('请求的资源不存在');
	//         break;
	//     default:
	//         console.log(other);
	// 	}
}

// console.log('查看env',process.env.BASE_URL);

// 创建axios实例
const instance = axios.create({
	// timeout: 1000 * 12
	// todo 读取env的地址
	//    baseURL:process.env.BASE_URL
})
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

// instance.interceptors.request.use(
//     config => {
//         console.log('拦截器', config)
//         // 登录流程控制中，根据本地是否存在token判断用户的登录情况
//         // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//         // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
//         // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
//         // const token = store.state.token;
//         // token && (config.headers.Authorization = token);

//         if (config.url && config.url.indexOf('/api-token-auth') !== -1) {
//             return config
//         } else {
//             const token = localStorage.getItem('token')
//             console.log(token)
//             if (!token) {
//                 tip('请先登录', toLogin)
//             } else {
//                 config.headers.Authorization = `Token ${token}`
//             }
//         }
//         return config
//     },
//     error => Promise.reject(error),
// )

// // 响应拦截器
// instance.interceptors.response.use(
//     // 请求成功
//     res => (res.status >= 200 && res.status < 300 ? Promise.resolve(res) : Promise.reject(res)),
//     // 请求失败
//     error => {
//         const { response } = error
//         if (response) {
//             // 请求已发出，但是不在2xx的范围
//             errorHandle(response.status, response.data.message)
//             return Promise.reject(response)
//         } else {
//             console.log('处理断网的情况')
//         }
//     },
// )

export default instance
