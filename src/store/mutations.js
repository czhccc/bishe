import * as types from './mutation-types'

const mutations = {
	[types.USER_PHONE](state, user_phone) {
		state.user_phone = user_phone
	},

	[types.CHOOSE_ADDRESS](state, choose_address) {
		state.choose_address = choose_address
	}

}

export default mutations
