// Local
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
	name: "CropModal",
	components: {
		VueCropper
	},
	mixins: [],
	data () {
		return {
			cropImg: null,
			isShowLoading: false,
		};
	},
	props: {
		imgSource: {
			type: String,
			default: null
		},
	},
	computed: {

	},
	watch: {
		imgSource: {
			handler(val, oldVal){
				if (val) {
					this.$refs.cropper.replace(val);
					$('#cropModal').modal('show');
				}
			},
			deep: true
		},
		cropImg: function (val) {
			if (val)
				this.$emit('img-cropped', val);
		},
	},
	created() {

	},
	mounted() {
		let _this = this;
		$('#cropModal').on('hidden.bs.modal', function (e) {
			// do something...
			_this.closeCropModal();
		})
	},
	methods: {
		closeCropModal: function () {
			this.$emit('close-crop-modal');
		},
		cropImage() {
			// get image data for post processing, e.g. upload or setting image src
			let _this = this;
			this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
				_this.cropImg = blob;
			}/*, 'image/png' */);
			$('#cropModal').modal('hide');
		},
		flipX() {
			const dom = this.$refs.flipX;
			let scale = dom.getAttribute('data-scale');
			scale = scale ? -scale : -1;
			this.$refs.cropper.scaleX(scale);
			dom.setAttribute('data-scale', scale);
		},
		flipY() {
			const dom = this.$refs.flipY;
			let scale = dom.getAttribute('data-scale');
			scale = scale ? -scale : -1;
			this.$refs.cropper.scaleY(scale);
			dom.setAttribute('data-scale', scale);
		},
		getCropBoxData() {
			this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
		},
		getData() {
			this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
		},
		move(offsetX, offsetY) {
			this.$refs.cropper.move(offsetX, offsetY);
		},
		reset() {
			this.$refs.cropper.reset();
		},
		rotate(deg) {
			this.$refs.cropper.rotate(deg);
		},
		setCropBoxData() {
			if (!this.data) return;
			this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
		},
		setData() {
			if (!this.data) return;
			this.$refs.cropper.setData(JSON.parse(this.data));
		},
		setImage(e) {
			const file = e.target.files[0];
			if (file.type.indexOf('image/') === -1) {
				alert('Please select an image file');
				return;
			}
			if (typeof FileReader === 'function') {
				const reader = new FileReader();
				reader.onload = (event) => {
					this.imgSrc = event.target.result;
					// rebuild cropperjs with the updated source
					this.$refs.cropper.replace(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				alert('Sorry, FileReader API not supported');
			}
		},
		showFileChooser() {
			this.$refs.input.click();
		},
		zoom(percent) {
			this.$refs.cropper.relativeZoom(percent);
		},
	}
}