import axios from "axios";

export const tokenMixin = {



    computed:{
        token(){
            return this.$store.getters.token
        }
    },

    mounted() {
        window.axios.defaults.headers.common = {
            "Authorization": `Bearer ${this.token}`,
        };
    }

}