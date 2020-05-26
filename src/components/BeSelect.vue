<template>
	<div class="be-select">
		<div class="ui-select input-border-secondary" @click="toggleSelect">
			<label class="label label-input">{{ label }}</label>
			<span class="selected text-input">
				{{ itemSelected ? itemSelected.text : defaultPlaceholder }}
			</span>
		</div>
		<div :class="'list-search-options '  + (isExpandingList ? 'open' : '')">
			<input class="input-search" autofocus ref="inputSearch" v-model="keySearch"
			       @input="searchAction()"
			/>
			<ul class="list-options" v-show="isExpandingList" >
				<li v-for="item in listSearchOptions" :class="'option ' + ((itemSelected && item.id === itemSelected.id) ? 'selected' : '')" @click="selectedOption(item)">{{ item.text }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BeSelect from "../assets/js/components/be-select";
	export default BeSelect;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/be-select";
</style>
