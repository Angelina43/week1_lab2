Vue.component(cards,{
    template: `
            <ul>
            <li v-for="task in tasks">
                <p>Name{{ task.name }}</p>
                <p>Task1: {{ task.task1 }}</p>
            </li>
        </ul>
    `,
    data() {
        return {
            name: null,
            task1: null
        };
    },
    methods: {
        create(){
            let Task = {
                name: this.name,
                task1: this.task1
            }
            this.$emit('task-submitted', Task)
            this.name = null
            this.task1 = null
        }
    }
})

let app = new Vue({
    el: '#app',
    data(){
        return{
            tasks: []
        }
    },
    methods:{
        createTask(Task){
            this.tasks.push(Task)
        }
    }
})


