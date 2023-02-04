let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data:{
            tasks: []
    },
    mounted() {
        eventBus.$on('task-submitted', Task => {
            this.tasks.push(Task)
        })
    },
    methods: {
        createTask(){
            let Task = {
                name: this.name,
                task1: this.task1
            }
            eventBus.$emit('task-submitted', Task)
            this.name = null
            this.task1 = null
        }
    }
})