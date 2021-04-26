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
	}
}

export default getters
