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

export const enrollmentsMixin = {
    data(){
        return{
            enrollments:{
                type: Object,
                default: null,
            },
        }
    },

    methods:{

        getEnrolledCourses() {
            axios({
                url: '/enrollments',
                method: 'get',
            })
                .then(response => this.enrollments = response.data)
                .catch(error => console.log(error))
        }

    },

    created(){
        this.getEnrolledCourses()
    }
}
