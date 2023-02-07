let eventBus = new Vue()

Vue.component('task2',{
    template: `
    <p>
                <label for="task2">Task1:</label>
                <input id="task2" name="task2" v-model="task2" required>
            </p>
    `,
    methods: {
        createTask2() {
            let Task2 = {
                task2: this.task2,
            }
            eventBus.$emit('task', Task2)
            this.task2 = null
        },
    }
})

//форма создания карточки
Vue.component('form-card', {
    template: `
    <div class="create">
        <form class="create-task" @submit.prevent="createTask">
            <p>
                <label for="name">Название карточки:</label>
                <input id="name" type="text" v-model="name" required>
            </p>
            <p>
                <label for="task1">Task1:</label>
                <input id="task1" name="task1" v-model="task1" required>
            </p>
            <task2></task2>
            
            <p>
                <input type="submit" value="Отправить">
            </p>
        </form>
    </div>
    `,
    methods: {
        createTask() {
            let Task = {
                name: this.name,
                task1: this.task1,
            }
            eventBus.$emit('task-submitted', Task)
            this.name = null
            this.task1 = null
        },
    }
})

Vue.component('form-card', {
    template: `
    <div class="create">
        <form class="create-task" @submit.prevent="createTask">
            <p>
                <label for="name">Название карточки:</label>
                <input id="name" type="text" v-model="name" required>
            </p>
            <p>
                <label for="task1">Task1:</label>
                <input id="task1" name="task1" v-model="task1" required>
            </p>
            <p>
                <label for="tas2">Task2:</label>
                <input id="task2" name="task2" v-model="task2" required>
            </p>
            
            <p>
                <input type="submit" value="Отправить">
            </p>
        </form>
    </div>
    `,
    methods: {
        createTask() {
            let Task = {
                name: this.name,
                task1: this.task1,
            }
            eventBus.$emit('task-submitted', Task)
            this.name = null
            this.task1 = null
        },
    }
})

//1 столбец
Vue.component('cards1', {
    template: `
         <div class="new"   >
        <p v-if="!tasks.length">Нет карточек</p>
        <ul v-else>
            <li v-for="task in tasks"><p>{{ task.name }}</p>
            <p>{{ task.task1 }} <button @click="removeTask(index)">Скрыть</button></p>
            <p>{{ task.task2 }} <button></button></p>
            </li>
        </ul>
    </div>
    `,
    data(){
        return{
            tasks: [],
        }
    },
    mounted() {
        eventBus.$on('task-submitted', Task => {
            this.tasks.push(Task)
        })
        eventBus.$on('task', Task2 => {
            this.tasks.push(Task2)
        })
    },
    methods: {
        // removeTask: function(task1){
        //     let filtersList = this.tasks.filter(element => element !== task1)
        //     this.tasks=filtersList
        // },
        removeTask: function (index){
            this.tasks.splice(index,1)
        },
        }

})


let app = new Vue({
    el: '#app',
    data: {
        checkedNames: []
    }
})
