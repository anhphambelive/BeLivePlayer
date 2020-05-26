<template>
	<div class="be-phone-input" :id="idParent">
		<div class="form-group">
			<div class="be-select">
				<div class="ui-select input-border-secondary" @click="toggleSelect"
				     v-click-outside="clickedOutside"
				>
					<label class="label label-input">{{ label }}</label>
					<span class="selected text-input">
						{{ activeCountry ? activeCountry.name : defaultPlaceholder }}
					</span>
					<div :class="'list-search-options '  + (isExpandingList ? 'open' : '')"
					     @keydown="keyboardNav"
					     tabindex="0"
					     @keydown.esc="reset"
					     v-on:click.stop
					>
						<input class="input-search" autofocus ref="inputSearch" v-model="keySearch"
						       @input="searchAction()"
						/>
						<ul class="list-options" v-show="isExpandingList" v-if="listSearchOptions.length" ref="list">
							<li
									class="dropdown-item option"
									v-for="(pb, index) in listSearchOptions"
									:key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
									@click="choose(pb)"
									:class="getItemClass(index, pb.iso2)"
									@mousemove="selectedIndex = index"
							>
								<div class="iti-flag flag-item" v-if="enabledFlags" :class="pb.iso2.toLowerCase()"></div>
								<strong>{{ pb.name }}</strong>
								<span>+{{ pb.dialCode }}</span>
							</li>
						</ul>
						<div class="empty-result" v-show="isExpandingList" v-else>
							No data
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="form-group">
			<ValidationProvider rules="min:6|max:16" v-slot="{ errors }" name="Phone">
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-border-secondary input-group-text label-input phone-country">{{ activeCountry ? `${activeCountry.iso2} +${activeCountry.dialCode}` : null }}</span>
					</div>
					<input type="text" class="input-border-secondary form-control input-phone text-input"
					       ref="input"
					       v-model="phone"
					       :placeholder="placeholder"
					       :state="state"
					       :disabled="disabled"
					       @blur="onBlur"
					       @input="onInput"
					       :required="required"
					       @keydown="keyDownPress"
					       @keyup="keyUpPress"
					       placeholder="Phone number"
					       aria-describedby="phone-country" />
				</div>
				<ul class="list-validations" v-if="errors">
					<li v-if="!response.isValid && invalidMsg">{{ invalidMsg }}</li>
					<li v-for="error in errors">{{ error }}</li>
				</ul>
			</ValidationProvider>
		</div>
	</div>
</template>

<script>
	import BePhoneInput from "../assets/js/components/be-phone-input";
	export default BePhoneInput;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/be-phone-input";
</style>
