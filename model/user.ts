import { getUser } from '../services/api'

// const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const model = {
	namespace: 'user',
	state: {
		name: 'hopperhuang',
		count: 0,
		init: false,
		user: {}
	},
	reducers: {
		// caculate(state, payload) {
		// 	const { count } = state
		// 	const { delta } = payload
		// 	return { ...state, count: count + delta }
		// }
		add(state) {
			return { ...state, count: state.count + 1 }
		},
		get(state, payload) {
			console.log(payload)

			return { ...state, user: payload.user }
		}
	},
	effects: {
		*getUser(action, { put }) {
			//   yield delay(2000);
			//   yield put({ type: 'caculate', delta: 1 });
			console.log('!!!!!!!!', action)

			const a = yield getUser()
			console.log(a)

			yield put({ type: 'get', user: a })
			// console.log('effects', a)
		}
	}
}

export default model
