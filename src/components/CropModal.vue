<template>
	<div class="modal fade" id="cropModal" tabindex="-1"
	     role="dialog" aria-labelledby="cropModalLabel" aria-hidden="true"
	     data-backdrop="static" data-keyboard="false"
	>
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
					<div class="container-crop-image">
						<vue-cropper
								ref="cropper"
								:src="imgSource"
								:aspect-ratio="1 / 1"
								:minContainerWidth="300"
								:minContainerHeight="300"
								:viewMode="3"
								alt="Source Image"
						>
						</vue-cropper>
					</div>
				</div>
				<div class="modal-footer">
					<div class="login-action">
						<b-button variant="danger" @click="cropImage">CROP</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CropModal from "../assets/js/components/crop-modal";
	export default CropModal;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/crop-modal";
</style>