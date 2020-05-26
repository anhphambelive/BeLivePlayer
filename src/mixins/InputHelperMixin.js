export default {
	name: "Input Helper Mixins",
	data() {
		return {
			maxLengthInput: 800,
			regex: null,
			stringInput: ""
		};
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
				// Left / Up / Right / Down Arrow, Delete/ tab keys;
				let stringInput = this.stringInput;
				if (
					e.target.selectionEnd == e.target.selectionStart &&
					this.maxLengthInput <= stringInput.length
				) {
					e.preventDefault();
					return false;
				}
				
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
			if (keyCode === 8) {
				let stringTmp = this.stringInput;
				let cursorPositionStart = this.getPositionCursorInString(
					stringTmp,
					e.target.selectionStart
				);
				if (cursorPositionStart > 0) {
					if (e.target.selectionEnd == e.target.selectionStart) {
						e.preventDefault();
						this.string = this.removeCharacter(
							stringTmp,
							cursorPositionStart - 1
						);
					}
				}
			}
		},
		keyUpPress(e) {
			let ctrlKey = 17,
				cmdKey = 91;
			let keyCode = e.keyCode || e.which;
			if (keyCode == ctrlKey || keyCode == cmdKey) this.ctrlDown = false;
		},
		getPositionCursorInString(str, currentCursorPosition) {
			let partSliceString = str.slice(0, currentCursorPosition); // Get part string after slice from cursor => partSliceString = (0123
			return currentCursorPosition - partSliceString.length; // Get the position of cursor in string number => result = 3
		},
		removeCharacter(str, char_pos) {
			let part1 = str.substring(0, char_pos);
			let part2 = str.substring(char_pos + 1, str.length);
			return part1 + part2;
		}
	}
};
