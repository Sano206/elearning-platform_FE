import axios from "axios";

export const singleCourseMixin = {

    methods:{
        fetchDetail(){
            axios.get('/courses/'+ this.$route.params.courseId)
                .then(response => this.course = response.data)
                .catch(error => console.log(error))
        },

    },

    created(){
        this.fetchDetail()
    }
}