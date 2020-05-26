export default {
    name: "CopyClipboardModal",
    props: {
        title: {
            type: String,
            default: "Copy channel ID"
        },
        modalId: {
            type: String,
            default: null
        },
        textCopy: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            textCopied: null
        };
    },
    computed: {

    },
    watch: {
    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleCopy() {
            let copyText = document.getElementById(`${this.modalId}-text-copy-input`);
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
            document.execCommand("copy");
            copyText.blur();
            copyText.setSelectionRange(0, 0)
            this.textCopied = this.textCopy;
        },
        reset() {
            this.textCopied = null;
        }
    }
}
