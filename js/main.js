let eventBus = new Vue()

//карточка с задачами
Vue.component('tapok', {
    props: {
        tapok: {
            type: Object,
        },
        id: {
            type: Number,
        },
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    template: `
    <div>
        <li><p>{{ data.name }}</p></li>
        <p v-for="(data, index) in data.tasks" :id="index">{{ data.taskname }} <button v-if="data.visible" v-on:click="data.visible = !data.visible" @click="task_update(data, index)">Выполнить</button></p> 
    </div>
    `,
    data() {
        return {
            isHidden1: false,
            isHidden2: false,
            isHidden3: false,
        }
    },
    methods: {
        task_update(task, index, id) {
            this.data.tasks[index].completed = !this.data.tasks[index].completed;

            let counterComp = 0;
            let counterNotComp = 0;
            for (let f of this.data.tasks) {
                if (f.completed) {
                    counterComp++;
                } else {
                    counterNotComp++;
                }
            }
            this.data.completedNum = (counterComp / (counterComp + counterNotComp)) * 100;
            if (this.data.completedNum > 50) eventBus.$emit('move-column2', id, this.data);
            console.log(this.data.completedNum, this.data.tasks[index], this.data.tasks)
        }
    },
})

//1 столбец
Vue.component('column1', {
    props: {
        column1: {
            type: Array
        },
        tapok: {
            type: Array
        },
        data() {
            return {}
        },
    },
    template: `
         <div class="new">
        <ul>
            <tapok :data="data" v-for="(data, index) in column1" :key="index"></tapok>
        </ul>
        </div>
    `,
    data() {
        return {
            taskname: null,
            tasks: []
        }
    },
    methods: {},
})

//2 столбец
Vue.component('column2', {
    props: {
        column2: {
            type: Array
        }
    },
    data() {
        return {}
    },
    template: `
    <div class="active">
        <ul>
            <tapok :data="data" v-for="(data, index) in column2" :key="index"></tapok>
        </ul>
    </div>
    `,
    methods: {}
})

//3 столбец
Vue.component('column3', {
    props: {
        column3: {
            type: Array
        },
    },
    data() {
        return {}
    },
    template: `
        <div class="done">
        <ul>
            <tapok :data="data" v-for="(data, index) in column3" :key="index"></tapok>
        </ul>
        </div>
    `
})

let app = new Vue({
    el: '#app',
    data: {
        column1: [
            {
                name: 'Кот',
                tasks: [
                    {taskname: 'Допустим', visible: true, completed: false},
                    {taskname: 'Я сказал', visible: true, completed: false},
                    {taskname: 'Мяу', visible: true, completed: false}
                ]
            },
            {
                name: 'Птица',
                completed: false,
                tasks: [
                    {taskname: 'Допустим', visible: true},
                    {taskname: 'Я испугался и сказал', visible: true},
                    {taskname: 'Пока', visible: true}
                ]
            }
        ],
        column2: [],
        column3: [],
        formCard: {
            name: null,
            task1: null,
            task2: null,
            task3: null,
            visible: null,
            completed: false
        },
    },
    methods: {
        addCard() {
            if (this.column1.length < 3) {
                this.column1.push(
                    {
                        name: this.formCard.name,
                        tasks: [
                            {
                                taskname: this.formCard.task1,
                                visible: true,
                                completed: false
                            },
                            {
                                taskname: this.formCard.task2,
                                visible: true,
                                completed: false
                            },
                            {
                                taskname: this.formCard.task3,
                                visible: true,
                                completed: false
                            }
                        ]
                    }
                )
                this.formCard.name = '';
                this.formCard.task1 = '';
                this.formCard.task2 = '';
                this.formCard.task3 = '';
                this.formCard.visible = '';
                this.formCard.completed = '';
            }
        },
    },
})

