export default {
	name: "InputRegexMixins",
	data() {
		return {
			ctrlDown: false
		};
	},
	props: {
		regex: {
			type: String,
			default: "[a-zA-Z0-9_]+"
		}
	},
	created() {
	},
	methods: {
		keyDownPress(e) {
			let ctrlKey = 17,
				cmdKey = 91,
				vKey = 86,
				cKey = 67,
				xKey = 88,
				aKey = 65;
			
			let keyCode = e.keyCode || e.which;
			
			// Detect when user press Ctrl C or Ctrl V:
			if (keyCode == ctrlKey || keyCode == cmdKey) this.ctrlDown = true;
			if (
				this.ctrlDown &&
				(keyCode == vKey ||
					keyCode == cKey ||
					keyCode == xKey ||
					keyCode == aKey)
			)
				return;
			
			// Don't validate the input if below arrow, delete and backspace keys were pressed
			if (
				keyCode != 37 &&
				keyCode != 38 &&
				keyCode != 39 &&
				keyCode != 40 &&
				keyCode != 46 &&
				keyCode != 8 &&
				keyCode != 9
			) {
				// Left / Up / Right / Down Arrow, Delete / Tab keys;
				let keyCharacter = e.key;
				let pattern = new RegExp(this.regex);
				if (
					this.regex !== undefined &&
					this.regex !== null &&
					this.regex !== ""
				) {
					let res = pattern.test(keyCharacter);
					if (!res) {
						e.preventDefault();
						return false;
					}
				}
			}
		},
		keyUpPress(e) {
			let ctrlKey = 17,
				cmdKey = 91;
			let keyCode = e.keyCode || e.which;
			if (keyCode == ctrlKey || keyCode == cmdKey) this.ctrlDown = false;
		}
	}
};
