<template>
	<b-modal id="loginModal" dialog-class="belive-modal-sm" content-class="belive-modal login-sign-up-modal"
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
				v-if="(currentLayout === layoutModes.LOGIN && currentStep === loginSteps.INPUT_LOGIN_FORM) || (currentLayout === layoutModes.FORGOT_PASSWORD && currentStep === forgotPasswordSteps.INPUT_PHONE)"
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
                <!-- Login -->
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.LOGIN && currentStep === loginSteps.INPUT_LOGIN_FORM">
                    <div class="body-belive-modal">
                        <div class="form-login">
                            <BePhoneInput
                                class="be-phone-component"
                                :is-value-model-integer="true"
                                :default-placeholder="countrySelectDefaultPlaceholder"
                                :label="countrySelectLabel"
                                :is-reset-data="isResetLoginData"
                                @data-reset-done="resetLoginDataSuccess"
                                @input-phone="getInputPhoneLogin">
                            </BePhoneInput>
                            <div class="form-group">
                                <ValidationProvider rules="min:6|max:20" v-slot="{ errors }" name="Password">
                                    <be-password-field v-model="login.plain_password" :hide-prepend="true" ></be-password-field>
                                    <ul class="list-validations" v-if="errors">
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </ValidationProvider>
                            </div>
                            <div class="keep-login-action">
                                <input type="checkbox" class="remember-login" id="remember-login" name="remember" v-model="login.keepLogin">
                                <label for="remember-login" class="checkbox-custom"></label>
                                <label for="remember-login" class="keep-login text-input">Keep me logged in</label>
                            </div>
                        </div>
                        <div class="error-validation" v-if="messageError">
                            {{ messageError }}
                        </div>
                    </div>
                    <div class="footer-belive-modal">
                        <hr class="hr-text" data-content="or sign in from">
                        <SocialLogin></SocialLogin>
                        <div class="login-action">
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase" :disabled="isLoadingBtn || invalid || checkRequiredLoginFields(['deviceUdid', 'keepLogin', 'password'])" @click="loginPhone">
                                Log In
                            </button>
                        </div>
                        <div class="forgot-password-action">
                            <a href="javascript:void(0)" class="forgot-password text-input" @click="switchLayout(layoutModes.FORGOT_PASSWORD, forgotPasswordSteps.INPUT_PHONE)">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                </ValidationObserver>

                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.LOGIN && currentStep === loginSteps.VERIFY_OTP">
                    <div class="body-belive-modal min-height-modal-body">
                        <div class="form-login">
                            <div class="form-group mb-1">
                                <ValidationProvider rules="numeric|min:6|max:6" v-slot="{ errors }" name="OTP number">
                                    <input type="text" v-model="verifyOTP.otp" class="input-border-secondary form-control input-verification-code text-input" name="phone" placeholder="OTP number" id="verification_code" />
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
                                LOGIN
                            </button>
                        </div>
                        <div class="forgot-password-action">
                            <a href="javascript:void(0)" class="forgot-password text-input" @click="switchLayout(layoutModes.FORGOT_PASSWORD, forgotPasswordSteps.INPUT_PHONE)">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                </ValidationObserver>
                <!-- End Login -->

                <!-- Forgot Password -->
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.FORGOT_PASSWORD && currentStep === forgotPasswordSteps.INPUT_PHONE">
                    <div class="body-belive-modal min-height-modal-body">
                        <div class="form-login">
                            <BePhoneInput
                                class="be-phone-component"
                                :is-value-model-integer="true"
                                :default-placeholder="countrySelectDefaultPlaceholder"
                                :label="countrySelectLabel"
                                :is-reset-data="isResetForgotData"
                                :default-phone-value="defaultPhoneValue"
                                @data-reset-done="resetForgotDataSuccess"
                                @input-phone="getInputPhoneForgot">
                            </BePhoneInput>
                        </div>
                        <div class="error-validation" v-if="messageError">
                            {{ messageError }}
                        </div>
                    </div>
                    <div class="footer-belive-modal">
                        <div class="login-action">
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase"  :disabled="isLoadingBtn || invalid || checkRequiredForgotFields()" @click="forgotPassword">
                                Send OTP
                            </button>
                        </div>
                        <div class="forgot-password-action">
                            <a href="javascript:void(0)" class="forgot-password text-input" @click="switchLayout(layoutModes.LOGIN, loginSteps.INPUT_LOGIN_FORM)">
                                Back to login?
                            </a>
                        </div>
                    </div>
                </ValidationObserver>
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.FORGOT_PASSWORD && currentStep === forgotPasswordSteps.VERIFY_OTP">
                    <div class="body-belive-modal min-height-modal-body">
                        <div class="form-login">
                            <div class="form-group mb-1">
                                <ValidationProvider rules="numeric|min:6|max:6" v-slot="{ errors }" name="OTP Number">
                                    <input type="text" v-model="verifyOTP.otp" class="input-border-secondary form-control input-verification-code text-input" name="phone" placeholder="OTP Number" id="fgp_verification_code" />
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
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase" @click="verifyOtp(forgotPasswordSteps.VERIFY_OTP)" :disabled="isLoadingBtn || invalid || !verifyOTP.otp">
                                NEXT
                            </button>
                        </div>
                    </div>
                </ValidationObserver>
                <ValidationObserver v-slot="{ invalid }" v-show="currentLayout === layoutModes.FORGOT_PASSWORD && currentStep === forgotPasswordSteps.INPUT_NEW_PASSWORD">
                    <div class="body-belive-modal min-height-modal-body">
                        <div class="form-login">
                            <div class="form-group">
                                <ValidationProvider rules="min:6|max:20" v-slot="{ errors }" name="New Password">
                                    <be-password-field v-model="forgotPasswordInfo.plain_password" placeholder="New Password" :hide-prepend="true"></be-password-field>
                                    <ul class="list-validations" v-if="errors">
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider rules="min:6|max:20|confirmed:New Password" v-slot="{ errors }" name="Re-type New Password">
                                    <be-password-field v-model="forgotPasswordInfo.passwordConfirm" placeholder="Re-type New Password" :hide-prepend="true"></be-password-field>
                                    <ul class="list-validations" v-show="errors">
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </ValidationProvider>
                            </div>
                            <div class="keep-login-action">
                                <input type="checkbox" class="remember-login" id="fgp-remember-login" name="remember" v-model="login.keepLogin">
                                <label for="fgp-remember-login" class="checkbox-custom"></label>
                                <label for="fgp-remember-login" class="keep-login text-input">Keep me logged in</label>
                            </div>
                        </div>
                        <div class="error-validation" v-if="messageError">
                            {{ messageError }}
                        </div>
                    </div>
                    <div class="footer-belive-modal">
                        <div class="login-action">
                            <button class="btn input-rounded bg-linear-primary btn-login w-100 text-uppercase" @click="resetPassword" :disabled="isLoadingBtn || invalid || !forgotPasswordInfo.plain_password">
                                DONE
                            </button>
                        </div>
                    </div>
                </ValidationObserver>
                <!-- End Forgot Password -->
            </b-overlay>
		</template>
	</b-modal>
</template>

<script>
	import LoginModal from "../assets/js/components/login-modal";
	export default LoginModal;
</script>

<style lang="scss">
	@import "../assets/scss/components/login_sign_up-modal";
</style>
