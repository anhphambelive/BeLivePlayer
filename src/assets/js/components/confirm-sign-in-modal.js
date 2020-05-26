import { SUNTEC_CONFIG } from "../../../configs/Settings"
export default {
    name: "ConfirmSignInModal",
    data() {
        return {

        };
    },
    computed: {

    },
    watch: {
    },
    created() {

    },
    mounted() {
        // this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
        //     //console.log('Modal is about to be shown', bvEvent, modalId)
        //     //if (modalId === "confirm-sign-in-modal") this.loadSSOJs();
        // })
        this.loadSSOJs();
    },
    methods: {
        loadSSOJs() {
            // if (document.getElementById('sso-script')) {
            //     let parent = document.getElementsByTagName('body')[0];
            //     let child = document.getElementById('sso-script');
            //     parent.removeChild(child)
            // }
            let s = document.createElement('script');
            s.type = "text/javascript";
            s.src = SUNTEC_CONFIG.SSO_JS_URL;
            //s.src = "/static/js/sso.js"
            s.id = "sso-script"
            document.getElementsByTagName("body")[0].appendChild(s);
        },
    }
}
