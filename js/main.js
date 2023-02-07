let eventBus = new Vue()

//форма создания карточки
Vue.component('form-card', {
    template: `
    <div class="create">
        <form class="create-task" @submit.prevent="create">
            <p>
                <label for="name">Название карточки:</label>
                <input v-model="name" required>
            </p>
            <p>
                <label for="task1">Task1:</label>
                <input v-model="task1" required>
            </p>
            <p>
                <label for="task2">Task2:</label>
                <input v-model="task2" required>
            </p>
            <p>
                <label for="task3">Task3:</label>
                <input v-model="task3" required>
            </p>            
            <p>
                <input @click="addTask() type="submit" value="Отправить">
            </p>
        </form>
    </div>
    `,
})

//1 столбец
Vue.component('cards1', {
    props: {
        note_data: {
            type: Object,
            default() {
                return {}
            }
        },
        template: `
         <div class="new">
<!--        <p v-if="!tasks.length">Нет карточек</p>-->
            <div :tasks="tasks" v-for="(note_data, index) in tasks" :key="index">
                <div>
                    <p>{{ note_data.name }}</p>
                    <p>{{ note_data.task1 }}</p>
                    <p>{{ note_data.task2 }}</p>
                    <p>{{ note_data.task3 }}</p>
                </div>
            </div>
        </div>
    `,
        data() {
            return {
                tasks: [],
                name: null,
                task1: null,
                task2: null,
                task3: null
            }
        },
        methods: {
            // removeTask: function(task1){
            //     let filtersList = this.tasks.filter(element => element !== task1)
            //     this.tasks=filtersList
            // },
            // removeTask: function (index){
            //     this.tasks.splice(index,1)
            // },
            addTask() {
                if (this.name) {
                    this.note_data.tasks.push({
                        name: this.name
                    });
                    this.name = null;
                }
            },
        }
    }

})


let app = new Vue({
    el: '#app',
    data: {
        tasks: [],
        name: null,
        task1: null,
        task2: null,
        task3: null
    },
    methods: {
        create() {
            this.tasks.push({
                tsk: [
                    {
                        name: this.name
                    },
                    {
                        task: this.task1
                    },
                    {
                        task: this.task2
                    },
                    {
                        task: this.task3
                    }
                ],
            })
            this.name = null;
            this.task1 = null;
            this.task2 = null;
            this.task3 = null;
        }
    }

})
