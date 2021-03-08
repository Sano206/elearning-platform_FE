import axios from "axios";

export const tokenMixin = {



    async beforeCreate(){
        const token = await this.$auth.getTokenSilently();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    }
}