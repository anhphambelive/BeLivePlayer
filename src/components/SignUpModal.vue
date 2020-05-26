<template>
	<b-modal id="signUpModal" dialog-class="belive-modal-sm" content-class="belive-modal login-sign-up-modal"
	         centered
	         size="sm"
	         no-close-on-backdrop
	         no-close-on-esc
	         hide-footer
	         @hidden="resetData"
	>
		<template v-slot:modal-header="{ close }">
			<div class="logo-header header-login-modal text-center container-fluid">
				<b-img src="../../static/media/general/logo-with-text.svg" alt="logo" class="login-logo img-logo-modal"></b-img>
			</div>
			<b-button size="sm" variant="outline" @click="close()" class="btn-close-modal float-right"
				v-if="currentLayout === layoutModes.SIGN_UP && currentStep === signUpSteps.INPUT_SIGN_UP_FORM"
			>
				<b-img src="../../static/media/general/close.svg" alt="Close" @click="close()"></b-img>
			</b-button>
		</template>

		<template v-slot:default>
            <b-overlay
                :show="isShowLoading"
                opacity="0.6"
                spinner-small
            >
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.SIGN_UP && currentStep === signUpSteps.INPUT_SIGN_UP_FORM">
                    <div class="body-belive-modal">
                        <div class="form-login">
                            <BePhoneInput
                                class="be-phone-component"
                                :is-value-model-integer="true"
                                :default-placeholder="countrySelectDefaultPlaceholder"
                                :label="countrySelectLabel"
                                :is-reset-data="isResetData"
                                @data-reset-done="resetDataSuccess"
                                @input-phone="getInputPhoneSignUp">
                            </BePhoneInput>
                        </div>
                        <div class="error-validation" v-if="messageError">
                            {{ messageError }}
                        </div>
                    </div>
                    <div class="footer-belive-modal">
                        <hr class="hr-text" data-content="or sign in from">
                        <SocialLogin></SocialLogin>
                        <div class="login-action">
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase" :disabled="isLoadingBtn || invalid || checkRequiredFields(['DisplayName', 'PlainPassword', 'Password', 'KeepLogin'])" @click="verifyPhone" >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </ValidationObserver>
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.SIGN_UP && currentStep === signUpSteps.VERIFY_OTP">
                    <div class="body-belive-modal min-height-modal-body">
                        <div class="form-login">
                            <div class="form-group">
                                <ValidationProvider rules="numeric|min:6|max:6" v-slot="{ errors }" name="Verify Code">
                                    <input type="text" v-model="verifyOTP.otp" class="input-border-secondary form-control input-verification-code text-input" name="phone" placeholder="Verification Code" id="verification_code" />
                                    <ul class="list-validations" v-show="errors">
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </ValidationProvider>
                            </div>
                            <div class="guide-text guide-input-verification text-input">
                                Enter the 6-digit number sent to your device via SMS.
                            </div>
                            <div class="guide-text text-input">
								<span class="only-text" v-if="countdownTimeResendCode">
									Didn't receive a code
								</span>
                                <a href="javascript:void(0)" class="resend-code" @click="resendOtp" v-else>
                                    Didn't receive a code
                                </a>
                                <span class="countdown-time-resend badge badge-pill badge-primary" v-show="countdownTimeResendCode">
									{{ countdownTimeResendCode }}
								</span>
                            </div>
                        </div>
                        <div class="error-validation" v-if="messageError">
                            {{ messageError }}
                        </div>
                    </div>
                    <div class="footer-belive-modal">
                        <div class="login-action">
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase" @click="verifyOtp" :disabled="isLoadingBtn || invalid || !verifyOTP.otp">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </ValidationObserver>
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.SIGN_UP && currentStep === signUpSteps.INPUT_DISPLAY_NAME_PASSWORD">
                    <div class="body-belive-modal">
                        <div class="form-login">
                            <div class="form-group">
                                <ValidationProvider rules="required|min:3|max:16" v-slot="{ errors }" name="Display Name">
                                    <input type="text" v-model="signUp.DisplayName" class="input-border-secondary form-control input-username text-input" @keydown="keyDownPress" @keyup="keyUpPress" name="phone" placeholder="Display Name" id="social-register-username" />
                                    <ul class="list-validations" v-show="errors">
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </ValidationProvider>
                                <ValidationProvider rules="min:6|max:20" v-slot="{ errors }" name="Password">
                                    <be-password-field v-model="signUp.PlainPassword" :hide-prepend="true" ></be-password-field>
                                    <ul class="list-validations" v-if="errors">
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </ValidationProvider>
                            </div>
                            <div class="keep-login-action">
                                <input type="checkbox" class="remember-login" id="signup-remember-login" name="remember" v-model="signUp.KeepLogin">
                                <label for="signup-remember-login" class="checkbox-custom"></label>
                                <label for="signup-remember-login" class="keep-login text-input">Keep me logged in</label>
                            </div>
                        </div>
                        <div class="error-validation" v-if="messageError">
                            {{ messageError }}
                        </div>
                    </div>
                    <div class="footer-belive-modal">
                        <div class="login-action">
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase" @click="signUpUserInfo" :disabled="isLoadingBtn || invalid || checkRequiredFields(['Password', 'KeepLogin'])">
                                DONE
                            </button>
                        </div>
                    </div>
                </ValidationObserver>
            </b-overlay>
		</template>
	</b-modal>
</template>

<script>
	import SignUpModal from "../assets/js/components/sign-up-modal";
	export default SignUpModal;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/login_sign_up-modal";
</style>
