import BeSelect from "../../../components/BeSelect";
import BePhoneInput from "../../../components/BePhoneInput";
import BePasswordField from "../../../components/BePasswordField";
import SocialLogin from "../../../components/SocialLogin";
import { COUNTRY_CODE } from '../../../ultis/CountryCode';
import HelperMixins from "../../../mixins/HelperMixins";
import InputRegexMixin from "../../../mixins/InputRegexMixin";
import {SDK_API} from "../../../configs/APIs";
import {mapGetters} from "vuex";
import {LAYOUT_MODES, SIGN_UP_STEPS} from "../../../configs/Settings";
import {DEVICE_TYPES, STATUS_RESPONSES} from "../../../configs/SDK";
import {Encrypt} from "../../../ultis/AESCrypto";
import {STATUS_MESSAGES, SYSTEM_MESSAGES} from "../../../messages/System";

export default {
	name: "SignUpModal",
	components: {
		BeSelect,
		BePasswordField,
		BePhoneInput,
		SocialLogin
	},
	mixins: [HelperMixins, InputRegexMixin],
	data () {
		return {
			listCountryCodes: COUNTRY_CODE,
			formatListCountrySelect: {
				"id" : "{{code}}",
				"text" : "{{name}}",
			},
			countrySelectLabel: "Country/Region",
			countrySelectDefaultPlaceholder: "Select a country",
			currentLayout: LAYOUT_MODES.SIGN_UP,
			currentStep: SIGN_UP_STEPS.INPUT_SIGN_UP_FORM,
            isShowLoading: false,
            isLoadingBtn: false,
			signUp: {
                DeviceType: parseInt(DEVICE_TYPES.WEB),
                BeliveId: null,
                CountryCode: null,
                PhoneCountryPrefix: null,
                DisplayName: null,
                PlainPassword: null,
                Password: null,
                KeepLogin: false
			},
            verifyOTP: {
                otpToken: null,
                otp: null
			},
			userInfo: null,
			messageError: null,
			countdownTimeResendCode: 60,
			defaultCountdownTimeResendCode: 60,
			countdownTimeUnit: 1000,
			intervalCountdownResendCodeId: null,
			isResetData: false,
		};
	},
	computed: {
		...mapGetters(['layoutModes', 'signUpSteps']),
	},
	watch: {
		signUp: {
			handler(val, oldVal){
				this.messageError = null;
			},
			deep: true
		},
        verifyOTP: {
			handler(val, oldVal){
				this.messageError = null;
			},
			deep: true
		}
	},
	created() {
	},
	mounted() {
		this.startCountdown();
	},
	methods: {
		resetData: function () {
			this.signUp = {
                DeviceType: null,
                BeliveId: null,
                PhoneCountryPrefix: null,
                CountryCode: null,
                DisplayName: null,
                PlainPassword: null,
                Password: null,
                KeepLogin: false
			};
			this.verifyOTP = {
                otpToken: null,
                otp: null
			};
			this.userInfo = null;
			this.messageError = null;
			this.isResetData = true;
		},
        /**
         *
         * @param excludeFields
         * @returns {boolean}
         */
		checkRequiredFields: function (excludeFields = []) {
			return this.checkEmptyProperties(this.signUp, excludeFields);
		},
		getInputPhoneSignUp: function(inputPhone) {
			this.signUp.PhoneCountryPrefix = inputPhone.country.dialCode;
			this.signUp.CountryCode = inputPhone.country.iso2;
			this.signUp.BeliveId = inputPhone.originalPhone;
		},
		resetDataSuccess: function() {
			this.isResetData = false;
		},
        resendOtp: function () {
            if (this.countdownTimeResendCode)
                return false;
            this.messageError = null;
            let _this = this;

            this.$http.post(SDK_API.SEND_OTP, this.verifyOTP).then(response => { // resend otp API
                if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
                    _this.startCountdown();
                }
                else {
                    this.$toastr.e(response.data.message, "Error Verify");
                    _this.messageError = response.data.message;
                }
            });
        },
        startCountdown: function () {
            let _this = this;
            this.clearIntervalCountdown();
            this.countdownTimeResendCode = this.defaultCountdownTimeResendCode;
            this.intervalCountdownResendCodeId = setInterval(function () {
                if (_this.countdownTimeResendCode > 0)
                    _this.countdownTimeResendCode--;
            }, _this.countdownTimeUnit)
        },
        clearIntervalCountdown: function () {
            clearInterval(this.intervalCountdownResendCodeId);
            this.intervalCountdownResendCodeId = null;
        },
        switchLayout: function (mode, step) {
            this.currentLayout = mode;
            this.currentStep = step;
        },
        verifyPhone: function() {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
            this.messageError = null;
            let _this = this;
            let dataVerify = {
                countryCode: this.signUp.CountryCode,
                phone: this.signUp.BeliveId,
                phonePrefix: this.signUp.PhoneCountryPrefix
            };
            this.$http.post(SDK_API.VERIFY_PHONE, dataVerify).then(response => { // verify phone API
                if (response.data.code === STATUS_RESPONSES.SUCCESS && !response.data.data.isExists) { // success get data
                    _this.verifyOTP.otpToken = response.data.data.otpToken;
                    this.switchLayout(LAYOUT_MODES.SIGN_UP, SIGN_UP_STEPS.VERIFY_OTP);
                }
                else if (response.data.code === STATUS_RESPONSES.SUCCESS && response.data.data.isExists) {
                    this.$toastr.e(SYSTEM_MESSAGES.NUMBER_REGISTERED, STATUS_MESSAGES.ERROR);
                    _this.messageError = SYSTEM_MESSAGES.NUMBER_REGISTERED;
                }
                else {
                    this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);
                    _this.messageError = response.data.message;
                }
            }, (err) => {
                let errMessage = err.response.data.message ? err.response.data.message : "Please check again!";
                this.$toastr.e(errMessage, STATUS_MESSAGES.ERROR);
                _this.messageError = errMessage;
            }).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
        },

		signUpUserInfo: function () {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
			this.messageError = null;
			let _this = this;
			this.signUp.Password = Encrypt(this.signUp.PlainPassword);
			let dataSignUp = new FormData();
            dataSignUp.append('DeviceType', this.signUp.DeviceType);
            dataSignUp.append('BeliveId', this.signUp.BeliveId);
            dataSignUp.append('PhoneCountryPrefix', this.signUp.PhoneCountryPrefix);
            dataSignUp.append('CountryCode', this.signUp.CountryCode);
            dataSignUp.append('DisplayName', this.signUp.DisplayName);
            dataSignUp.append('Password', this.signUp.Password);

			this.$http.post(SDK_API.PHONE_REGISTER, dataSignUp).then(response => { // register API
				if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
                    _this.userInfo = response.data.data;
                    if (_this.signUp.KeepLogin) {
                        _this.$cookies.set("access_token", _this.userInfo.accessToken);
                    }
                    else {
                        _this.$cookies.set("access_token", _this.userInfo.accessToken, 0);
                    }
					
					_this.$cookies.remove("guest_token");
                    this.$store.dispatch('userLogin',  _this.userInfo);
                    this.$bvModal.hide("signUpModal");
					window.location.reload();
				}
				else {
					this.$toastr.e(response.data.message, "Error Sign Up");
					_this.messageError = response.data.message;
				}
			}, (err) => {
				this.$toastr.e(err.response.data.message, "Error Sign Up");
				_this.messageError = err.response.data.message;
			}).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
		},
		verifyOtp: function () {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
			this.messageError = null;
			let _this = this;
			this.$http.post(SDK_API.VERIFY_OTP, this.verifyOTP).then(response => { // verify otp API
				if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
                    this.switchLayout(LAYOUT_MODES.SIGN_UP, SIGN_UP_STEPS.INPUT_DISPLAY_NAME_PASSWORD);
				}
				else {
				    _this.countdownTimeResendCode = 0;
                    _this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);
					_this.messageError = response.data.message;
				}
			}, (err) => {
				let errMessage = err.response.data.message ? err.response.data.message : "OTP code is not correct, please check again!";
				this.$toastr.e(errMessage, STATUS_MESSAGES.ERROR);
				_this.messageError = errMessage;
			}).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
		},
	}
}
