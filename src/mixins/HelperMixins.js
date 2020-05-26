import {MOBILE_APP_URL, MOBILE_OS} from "../configs/SDK";
import moment from "moment";
import {SYSTEM_MESSAGES} from "../messages/System";
export default {
	name: "Helper Mixins",
	data() {
		return {
			isMobileLayoutSize: false
		};
	},
	created() {
	},
	methods: {
		pad: function (num) {
			return ("0" + num).slice(-2);
		},
		formatStreamTime: function (secs) {
			let minutes = Math.floor(secs / 60);
			secs = secs % 60;
			let hours = Math.floor(minutes / 60);
			minutes = minutes % 60;
			return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
			// return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
		},
		formatNumberToString: function (number) {
			let newValue = number;
			if (number >= 1000) {
				let suffixes = ["", "k", "m", "b", "t"];
				let suffixNum = Math.floor(("" + number).length / 3);
				let shortValue = "";
				for (let precision = 2; precision >= 1; precision--) {
					shortValue = parseFloat(
						(suffixNum != 0
								? number / Math.pow(1000, suffixNum)
								: number
						).toPrecision(precision)
					);
					let dotLessShortValue = (shortValue + "").replace(
						/[^a-zA-Z 0-9]+/g,
						""
					);
					if (dotLessShortValue.length <= 2) {
						break;
					}
				}
				if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
				newValue = shortValue + suffixes[suffixNum];
			}
			return newValue;
		},
		checkEmptyProperties(obj, excludeFields = []) {
			for (let key in obj) {
				if (excludeFields.indexOf(key) === -1 && (obj[key] === null || obj[key] === ""))
				    return true;
			}
			return false;
		},

		/**
		 * Determine the mobile operating system.
		 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
		 *
		 * @returns {String}
		 */
		getMobileOperatingSystem: function () {
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			// Windows Phone must come first because its UA also contains "Android"
			if (/windows phone/i.test(userAgent)) {
				return MOBILE_OS.WINDOW_PHONE;
			}

			if (/android/i.test(userAgent)) {
				return MOBILE_OS.ANDROID;
			}

			// iOS detection from: http://stackoverflow.com/a/9039885/177710
			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				return MOBILE_OS.iOS;
			}

			return MOBILE_OS.UN_KNOWN;
		},

		/**
		 *
		 * @returns {boolean}
		 */
		checkBrowserSupportWebRTC: function () {
			var isWebRTCSupported = navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia ||
				window.RTCPeerConnection;

			if (!isWebRTCSupported || window.navigator.userAgent.indexOf("Edge") > -1) {
				return false;
			}
			else {
				return true;
			}
		},
		copyUrl: function (copyElement) {
			let inputCopy = document.querySelector(copyElement);
			inputCopy.setAttribute("type", "text");
			inputCopy.select();
			try {
				let successful = document.execCommand("copy");
				let msg = successful ? "successful" : "unsuccessful";
				alert("Your url stream was copied " + msg);
			} catch (err) {
				alert("Oops, unable to copy");
			}

			inputCopy.setAttribute("type", "hidden");
			window.getSelection().removeAllRanges();
		},

		/**
		 * Check device using:
		 */
		checkDeviceUsing: function() {
			let deviceUsing = this.getMobileOperatingSystem();
			console.log("Device Using", deviceUsing);
			if (deviceUsing === MOBILE_OS.ANDROID || deviceUsing === MOBILE_OS.iOS)
				this.openMobileApp(MOBILE_APP_URL[deviceUsing]);
		},

        /**
         *
         * @param app
         */
		openMobileApp: function (app) {
			let now = new Date().valueOf();
			setTimeout(function () {
				window.location = app.DOWNLOAD_URL;
			}, 25);
			window.location = app.APP_INSTALLED_URL;
		},
		
		/**
		 *
		 * @param timeString
		 * @param formatTime
		 * @returns {string}
		 */
        formatUTCZulu: function (timeString, formatTime = "YYYY-MM-DD HH:mm:ss") {
            let timeArray = timeString.split("T");
            if (timeArray.length === 2) {
                var resTime = timeArray[0].split("/").reverse().join("-").concat("T", timeArray[1]);
                var timestamp = new Date(resTime);
                return moment(timestamp).format(formatTime);
            }
            return SYSTEM_MESSAGES.INVALID_DATE;
        },
		
		/**
		 *
		 */
		onResize() {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			
			if (window.innerWidth >= 992) {
				this.isMobileLayoutSize = false
			} else {
				this.isMobileLayoutSize = true
			}
			
			this.$root.$emit(`resize-browser`, this.isMobileLayoutSize);
		},
		
		/**
		 *
		 * @param num
		 * @returns {string}
		 */
		formatCurrency(num) {
			return (
				num
					.toFixed(0) // always two decimal digits
					.replace('.', ',') // replace decimal point character with ,
					.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
			) // use . as a separator
		},
	}
};
