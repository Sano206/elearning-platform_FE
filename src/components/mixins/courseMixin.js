import CourseChapter from "@/components/course/CourseChapter";
import CreateChapterForm from "@/components/form/CreateChapterForm";
import axios from "axios";

export const singleCourseMixin = {
    components:{
        CourseChapter
    },

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