import {mapGetters} from "vuex";

export default {
	name: "SidebarMenu",
	components: {},
	props: {
		menuActive: {
			type: String,
			default: "profile"
		}
	},
	data() {
		return {
			listMenus : {
				profile : {
					name: 'Profile',
					url: 'Profile'
				},
				my_library : {
					name: 'My Library',
					url: 'MyLibrary'
				},
				analytics : {
					name: 'Analytics',
					url: 'Analytics'
				},
			}
		};
	},
	computed: {
		...mapGetters(["user"]),
	},
	mounted() {
	},
	methods: {
		toggleSidebar: function () {
			$('#sidebar, #content').toggleClass('active');
			$('.collapse.in').toggleClass('in');
			$('a[aria-expanded=true]').attr('aria-expanded', 'false');
		},
	}
};
