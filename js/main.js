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
        <p v-for="(data, index) in data.tasks" :id="index">{{ data.taskname }} <button v-if="data.visible" v-on:click="data.visible = !data.visible" @click="task_update(index)">Выполнить</button></p>
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
        task_update(id) {
            this.data.tasks[id].completed = !this.data.tasks[id].completed
            eventBus.$emit('update-checkbox', this.id)
        }
    },
    mounted() {
        eventBus.$on('update-checkbox', id => {
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
            if (this.data.completedNum === 100) eventBus.$emit('move-column3', id, this.data);
        })
    }
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
        id: {
            type: Number
        },
    },
    template: `
         <div class="new">
        <ul>
            <tapok :data="data" @save="save()" v-for="(data, index) in column1" :id="index"></tapok>
        </ul>
        </div>
    `,
    data() {
        return {
            taskname: null,
            tasks: [],
        }
    }
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
            <tapok :data="data" @save="save()" v-for="(data, index) in column2" :id="index"></tapok>
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
            <tapok :data="data" @save="save()" v-for="(data, index) in column3" :id="index"></tapok>
        </ul>
        </div>
    `
})

let app = new Vue({
    el: '#app',
    data: {
        column1: [],
        column2: [],
        column3: [],
        formCard: {
            name: null,
            task1: null,
            task2: null,
            task3: null,
            visible: null,
            completed: false
        }
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
                this.save()
            }
        },
        save() {
            localStorage.column1 = JSON.stringify(this.column1)
            localStorage.column2 = JSON.stringify(this.column2)
            localStorage.column3 = JSON.stringify(this.column3)
        },
    },

    mounted() {
        if (localStorage.column1) {
            this.column1 = JSON.parse(localStorage.column1)
        }
        if (localStorage.column2) {
            this.column2 = JSON.parse(localStorage.column2)
        }
        if (localStorage.column3) {
            this.thirdCol = JSON.parse(localStorage.column3)
        }
        eventBus.$on('move-column2', (id) => {
            if (this.column2.length < 5) {
                if (this.column1[id].completedNum >= 50) {
                    this.column2.push(this.column1[id])
                    this.column1.splice(id, 1)
                    this.save()
                }
            }
        });
        eventBus.$on('move-column3', (id) => {
            if (this.column2[id].completedNum === 100) {
                this.column3.push(this.column2[id])
                this.column2.splice(id, 1)
                this.save()
            }
        })
    }
})

