
export default {
    name: "EndScreenStream",
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: "Stream Ended"
        },
        time: {
            type: String,
            default: "12:00"
        },
        onExit: {
            type: Function,
            default: () => { }
        }
    },
    computed: {},
    watch: {},
    mounted() {
    },
    methods: {
        handleExit() {
            this.$root.$emit('onExit')
        }
    }
};
