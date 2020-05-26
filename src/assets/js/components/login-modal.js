import BeSelect from "../../../components/BeSelect";
import BePhoneInput from "../../../components/BePhoneInput";
import BePasswordField from "../../../components/BePasswordField";
import SocialLogin from "../../../components/SocialLogin";
import { COUNTRY_CODE } from '../../../ultis/CountryCode';
import helper from "../../../helpers/helper";
import {mapGetters} from "vuex";
import {LAYOUT_MODES, FORGOT_PASSWORD_STEPS, LOGIN_STEPS, SIGN_UP_STEPS} from "../../../configs/Settings";
import HelperMixins from "../../../mixins/HelperMixins";
import {SDK_API} from "../../../configs/APIs";
import {DEVICE_TYPES, STATUS_RESPONSES} from "../../../configs/SDK";
import {Encrypt} from "../../../ultis/AESCrypto";
import {STATUS_MESSAGES} from "../../../messages/System";
export default {
	name: "LoginModal",
	components: {
		BePasswordField,
		BeSelect,
		BePhoneInput,
		SocialLogin
	},
	mixins: [HelperMixins],
	data () {
		return {
            messageError: null,
            currentLayout: LAYOUT_MODES.LOGIN,
            currentStep: LOGIN_STEPS.INPUT_LOGIN_FORM,
            countdownTimeResendCode: 60,
            defaultCountdownTimeResendCode: 60,
            countdownTimeUnit: 1000,
            intervalCountdownResendCodeId: null,
            isResetLoginData: false,
            isResetForgotData: false,
            isShowLoading: false,
            isLoadingBtn: false,
			listCountryCodes: COUNTRY_CODE,
			formatListCountrySelect: {
				"id" : "{{code}}",
				"text" : "{{name}}",
			},
			countrySelectLabel: "Country/Region",
			countrySelectDefaultPlaceholder: "Select a country",
			login: {
                beliveId: null,
                phoneCountryPrefix: null,
                countryCode: null,
                plain_password: null,
                password: null,
                deviceUdid: null,
                deviceType: parseInt(DEVICE_TYPES.WEB),
                keepLogin: false,
			},

			forgotPasswordInfo: {
				phone: null,
				countryPrefix: null,
				countryCode: null,
                plain_password: null,
                password: null,
				passwordConfirm: null,
			},
            verifyOTP : {
                otpToken: null,
                otp: null
            },

			defaultPhoneValue: {
				countryCode: null,
				countryPrefix: null,
				phone: null
			}
		};
	},
	computed: {
		...mapGetters(['forgotPasswordSteps', 'layoutModes', 'loginSteps']),
	},
	watch: {
		login: {
			handler(val, oldVal){
				this.messageError = null;
			},
			deep: true
		},
		forgotPasswordInfo: {
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

	},
	methods: {
		resetData: function () {
			this.login = {
                beliveId: null,
                phoneCountryPrefix: null,
                countryCode: null,
                plain_password: null,
                password: null,
                deviceUdid: null,
                deviceType: parseInt(DEVICE_TYPES.WEB),
                keepLogin: false,
			};
			this.forgotPasswordInfo = {
                phone: null,
                countryPrefix: null,
                countryCode: null,
                plain_password: null,
                password: null,
                passwordConfirm: null,
			};
            this.verifyOTP = {
                otpToken: null,
                otp: null
            };
			this.isResetLoginData = true;
			this.isResetForgotData = true;
			this.messageError = null;
			this.currentLayout = LAYOUT_MODES.LOGIN;
			this.currentStep = LOGIN_STEPS.INPUT_LOGIN_FORM;
		},
		resetLoginDataSuccess: function() {
			this.isResetLoginData = false;
		},
		resetForgotDataSuccess: function() {
			this.isResetForgotData = false;
		},
		checkRequiredLoginFields: function (excludeFields = []) {
			return this.checkEmptyProperties(this.login, excludeFields);
		},
		checkRequiredForgotFields: function () {
			return (this.forgotPasswordInfo.countryPrefix === null || this.forgotPasswordInfo.countryPrefix === "" ||
				this.forgotPasswordInfo.countryCode === null || this.forgotPasswordInfo.countryCode === "" ||
				this.forgotPasswordInfo.phone === null || this.forgotPasswordInfo.phone === "");
		},
		getInputPhoneLogin: function(inputPhone) {
			this.login.phoneCountryPrefix = inputPhone.country.dialCode;
			this.login.countryCode = inputPhone.country.iso2;
			this.login.beliveId = inputPhone.originalPhone;
		},
		getInputPhoneForgot: function(inputPhone) {
			this.forgotPasswordInfo.countryPrefix = inputPhone.country.dialCode;
			this.forgotPasswordInfo.countryCode = inputPhone.country.iso2;
			this.forgotPasswordInfo.phone = inputPhone.originalPhone;
		},
		loginPhone: function () {
		    this.isShowLoading = true;
		    this.isLoadingBtn = true;
			this.messageError = null;
            this.login.password = Encrypt(this.login.plain_password);
            let dataLogin ={
                deviceType: this.login.deviceType,
                beliveId: this.login.beliveId,
                phoneCountryPrefix: this.login.phoneCountryPrefix,
                deviceUdid: this.login.deviceUdid,
                password: this.login.password,
            };
			let _this = this;
			this.$http.post(SDK_API.PHONE_LOGIN, dataLogin).then(response => { // login phone API
				if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
                    _this.$store.dispatch('userLogin', response.data.data);
                    let accessToken = response.data.data.accessToken;
                    if (_this.login.keepLogin) {
                        _this.$cookies.set("access_token", accessToken);
                    }
                    else {
                        _this.$cookies.set("access_token", accessToken, 0);
                    }
					_this.$cookies.remove("guest_token");
                    _this.$http.defaults.headers.common[
                        "Authorization"
                        ] = `Bearer ${accessToken}`;
                    this.$bvModal.hide("loginModal");
                    window.location.reload();
				}
				else {
					this.$toastr.e(response.data.message, "Error Login");
					_this.messageError = response.data.message;
				}
			}, (err) => {
				this.$toastr.e(err.response.data.message, "Error Login");
				_this.messageError = err.response.data.message;
			}).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
		},
		switchLayout: function (mode, step) {
			if (this.currentLayout === LAYOUT_MODES.LOGIN && mode === LAYOUT_MODES.FORGOT_PASSWORD && step === this.forgotPasswordSteps.INPUT_PHONE) {
				this.defaultPhoneValue.countryPrefix = this.login.phoneCountryPrefix;
				this.defaultPhoneValue.countryCode = this.login.countryCode;
				this.defaultPhoneValue.phone = this.login.beliveId;
			}
			this.currentLayout = mode;
			this.currentStep = step;
		},
		forgotPassword: function () {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
			this.messageError = null;
			let _this = this;
			let dataForgotPassword = {
                phoneCountryPrefix: this.forgotPasswordInfo.countryPrefix,
                phone: this.forgotPasswordInfo.phone
            };
			this.$http.post(SDK_API.FORGOT_PASSWORD, dataForgotPassword).then(response => { // forgot password api
				if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
					_this.verifyOTP.otpToken = response.data.data.otpToken;
                    _this.startCountdown();
					_this.switchLayout(LAYOUT_MODES.FORGOT_PASSWORD, FORGOT_PASSWORD_STEPS.VERIFY_OTP);
				}
				else {
					this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);
					_this.messageError = response.data.message;
				}
			}, (err) => {
				this.$toastr.e(err.response.data.message, STATUS_MESSAGES.ERROR);
				_this.messageError = err.response.data.message;
			}).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
		},
		verifyOtp: function (mode = LOGIN_STEPS.VERIFY_OTP) {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
			let _this = this;
			this.messageError = null;

			this.$http.post(SDK_API.VERIFY_OTP, this.verifyOTP).then(response => { // verify otp API
				if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
                    if (mode === LOGIN_STEPS.VERIFY_OTP) {
                       _this.loginPhone();
                    }
                    else {
                        _this.switchLayout(LAYOUT_MODES.FORGOT_PASSWORD, FORGOT_PASSWORD_STEPS.INPUT_NEW_PASSWORD);
                    }
				}
				else {
					let errMessage = response.data.message ? response.data.message : "OTP code is not correct, please check again!";
					this.$toastr.e(errMessage, "Error");
					_this.messageError = errMessage;
				}
			}, (err) => {
				let errMessage = err.response.data.message ? err.response.data.message : "OTP code is not correct, please check again!";
				this.$toastr.e(errMessage, "Error");
				_this.messageError = errMessage;
			}).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
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
        resetPassword: function () {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
			this.messageError = null;
			let _this = this;
	        this.forgotPasswordInfo.password = Encrypt(this.forgotPasswordInfo.plain_password);
			let data = {
				"otp": this.verifyOTP.otp,
				"otpToken" : this.verifyOTP.otpToken,
				"password" : this.forgotPasswordInfo.password,
			};
			this.$http.post(SDK_API.RESET_PASSWORD, data).then(response => { // reset password api
				if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
					// _this.switchLayout(LAYOUT_MODES.LOGIN, FORGOT_PASSWORD_STEPS.INPUT_PHONE);
					_this.login.plain_password = _this.forgotPasswordInfo.plain_password;
					_this.login.phoneCountryPrefix = _this.forgotPasswordInfo.countryPrefix;
					_this.login.countryCode = _this.forgotPasswordInfo.countryCode;
					_this.login.beliveId = _this.forgotPasswordInfo.phone;
					_this.loginPhone();
				}
				else {
					this.$toastr.e(response.data.message, "Reset password");
					_this.messageError = response.data.message;
				}
			}, (err) => {
				this.$toastr.e(err.response.data.message, "Reset password");
				_this.messageError = err.response.data.message;
			}).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
		},
        verifyPhoneLogin: function () {
            this.isShowLoading = true;
            this.isLoadingBtn = true;
            this.messageError = null;
            let _this = this;
            let dataVerify = {
                countryCode: this.login.countryCode,
                phone: this.login.beliveId,
                phonePrefix: this.login.phoneCountryPrefix
            };
            this.$http.post(SDK_API.VERIFY_PHONE, dataVerify).then(response => { // verify phone API
                if (response.data.code === STATUS_RESPONSES.SUCCESS && response.data.data.isExists) { // success get data
                    _this.verifyOTP.otpToken = response.data.data.otpToken;
                    this.switchLayout(LAYOUT_MODES.LOGIN, LOGIN_STEPS.VERIFY_OTP);
                }
                else {
                    this.$toastr.e(response.data.message, "Error");
                    _this.messageError = response.data.message;
                }
            }, (err) => {
                let errMessage = err.response.data.message ? err.response.data.message : "Please check again!";
                this.$toastr.e(errMessage, "Error");
                _this.messageError = errMessage;
            }).then(() => {
                _this.isShowLoading = false;
                _this.isLoadingBtn = false;
            });
        }
	}
}
