const getters = {
	isShowInThisRelease(state) {
		return state.isShowInThisRelease
	},
	layoutModes(state) {
		return state.layoutModes
	},
	forgotPasswordSteps(state) {
		return state.forgotPasswordSteps
	},
	loginSteps(state) {
		return state.loginSteps
	},
	signUpSteps(state) {
		return state.signUpSteps
	},
};

export default getters;
