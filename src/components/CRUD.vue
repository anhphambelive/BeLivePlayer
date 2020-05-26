<template>
	<div class="crud-custom">
		<h3 class="title-page mb-4" v-if="title">
			{{ title }}
		</h3>
		<div v-if="show">
			<slot name="form-content"></slot>
			<slot name="form-actions">
				<b-button @click="onSubmit" class="mr-2" type="submit" variant="primary"
				>Submit
				</b-button>
				<b-button @click="onReset" type="reset" variant="danger"
				>Reset
				</b-button>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "CRUD",
		props: {
			title: {
				type: String,
				default: null
			},
			formData: {
				type: Object,
				default: function () {
					return {
						name: ""
					};
				}
			}
		},
		data() {
			return {
				show: true
			};
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.formData));
			},
			onReset(evt) {
				evt.preventDefault();
				alert(2);
			}
		}
	};
</script>

<style scoped></style>
