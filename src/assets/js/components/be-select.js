export default {
	name: "BeSelect",
	data () {
		return {
			isExpandingList: false,
			itemSelected: null,
			keySearch: "",
			listSearchOptions: [],
		}
	},
	props: {
		listItems: {
			type: Array,
			default: function () {
				return [];
			}
		},
		defaultPlaceholder: {
			type: String,
			default: "Please select one..."
		},
		label: {
			type: String,
			default: "Be Select"
		},
		formatList: {
			type: Object,
			default: function () {
				return {
					"id": "{{id}}",
					"text": "{{text}}",
				}
			}
		},
		value: {
			required: false,
		}
	},
	computed: {
		listOptions: function () {
			let _this = this;
			let list = [];
			this.listItems.map(data => {
				let tmp = {
					id: (_this.formatList.id) ? _this.formatOptionHtml(_this.formatList.id, data) : null,
					text: (_this.formatList.text) ? _this.formatOptionHtml(_this.formatList.text, data) : null,
					attrs: data,
				};
				list.push(tmp);
			});
			return list;
		},
	},
	watch: {
		isExpandingList: function (val) {
			if (val)
				this.$nextTick(() => {
					this.$refs.inputSearch.focus()
				});
			else {
				this.keySearch = "";
				this.searchAction();
			}
		}
	},
	mounted() {
		this.listSearchOptions = JSON.parse(JSON.stringify(this.listOptions));
	},
	methods: {
		toggleSelect: function () {
			this.isExpandingList = !this.isExpandingList;
		},
		selectedOption: function (item) {
			this.itemSelected = item;
			this.$emit('input', this.itemSelected); // emit v-model
			this.toggleSelect();
		},
		resolveData(obj, path){
			path = path.split('.');
			let current = obj;
			while(path.length) {
				if(typeof current !== 'object') return undefined;
				current = current[path.shift()];
			}
			return current;
		},
		formatOptionHtml (str, data) {
			if (str !== null && str !== '') {
				let result = '';
				let preStr = str.split("{{");
				if (preStr.length > 0) {
					let afterStr = preStr[1].split("}}");
					let dataObj = this.resolveData(data, afterStr[0]);
					result = preStr[0] + dataObj + afterStr[1];
				}
				else result = eval(preStr);
				return result;
			}
			return str;
		},
		searchAction: function () {
			this.$emit('search-keywords', this.keySearch);
			let searchKey = this.keySearch.trim();
			this.listSearchOptions = this.listOptions.filter( item => {
				return item.text != undefined && item.text != null ? item.text.toUpperCase().match(new RegExp('.*' + searchKey.toUpperCase() + '.*')) : false;
			});
		},
	},
}