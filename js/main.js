let eventBus = new Vue()

//форма создания карточки
Vue.component('formTask', {
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
                <label for="task2">Task2:</label>
                <input id="task2" name="task2" v-model="task2">
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
                task2: this.task2,
            }
            eventBus.$emit('task-submitted', Task)
            this.name = null
            this.task1 = null
            this.task2 = null
        },
    }
})

//1 столбец
Vue.component('cards1', {
    template: `
         <div class="new"   >
        <p v-if="!tasks.length">Нет карточек</p>
        <ul v-else>
            <li v-for="task in tasks">
                <p>{{ task.name }}</p>
                <p>{{ task.task1 }} <button @click="removeTask(task)">Скрыть</button></p>
                <p>{{ task.task2 }} <button>Скрыть</button></p>
            </li>
        </ul>
    </div>
    `,
    data(){
        return{
            tasks: [
                {
                    name: 'Пример',
                    task1: 'Задача, которую надо скрыть1',
                    task2: 'Задача, которую надо оставить1'
                },
                {
                    name: 'Пример 2',
                    task1: 'Задача, которую надо скрыть2',
                    task2: 'Задача, которую надо оставить2'
                }],
            task1: null,
            task2: null,
        }
    },
    mounted() {
        eventBus.$on('task-submitted', Task => {
            this.tasks.push(Task)
        })
    },
    methods: {
        removeTask: function(task){
            const filtersList = this.tasks.filter(element => element !== task)
            this.tasks=filtersList
        }, //удаляет всю карточку
    }
})

let app = new Vue({
    el: '#app',
})
