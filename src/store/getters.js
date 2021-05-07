const getters = {
	cartLength(state) {
		return state.cartList.length
	},
	cartList(state) {
		return state.cartList
	},
	
	
	getUserPhone(state) {
		return state.user_phone
	},
	getUserAmount(state) {
		return state.user_amount
	},

	getChooseAddress(state) {
		return state.choose_address
	}
}

export default getters
