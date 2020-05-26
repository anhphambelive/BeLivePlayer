export default {
	/**
	 * Check browser support local storage
	 *
	 * @param type
	 * @returns {boolean}
	 */
	storageAvailable: function (type) {
		try {
			var storage = window[type],
				x = "__storage_test__";
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return false;
		}
	}
};
