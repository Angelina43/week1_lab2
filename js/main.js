let eventBus = new Vue()

Vue.component('tapok', {
    props: ['data'],
    template: `
    <div>
        <li><p>{{ data.name }}</p></li>
        <p v-for="(data, index) in data.tasks" :key="index">{{ data.taskname }} <button v-if="data.visible" v-on:click="data.visible = !data.visible" @click="task_del(data, index)">Выполнить</button></p> 
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
        task_del(task, index) {
            this.$emit('card2_trans', task, index)
        },


    }
})

//1 столбец
Vue.component('cards1', {
    props: {
        column: {
            type: Array
        }
    },
    template: `
         <div class="new">
        <ul>
            <tapok :data="data" @card2_trans="card2_del" v-for="(data, index) in column" :key="index"></tapok>
        </ul>
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        card2_del(tasks, index) {
            //  let desk = this.column1[id]
            // desk = desk.pop()
            // this.$emit('card2_trans', desk);
            let allTasks = 0;
            let completeTask = 0;
            let notCompleteTask = 0;

            for (let key in tasks){
                console.log('Ключ: ' + key + ' значение: ' + tasks[key])
                    allTasks ++
                if (tasks[key] === false) {
                   completeTask +=1
                   this.column[0].count +=1 //подсчет индекса
                    console.log(this.column[0].count)
                    console.log(allTasks)
                }
            }


            // console.log(this.column)
            //коммент

            // let task1 = []
            // let count = 0
            // task1.push(this.column1[0].tasks[0])
            // console.log('Задачи: ', this.column[1].tasks[1])
            // console.log('Задачи23: ', this.column[index].tasks)
            // console.log('Индекс элемента: ', this.column1[0].tasks.indexOf(tasks))
            // console.log('Длина массива: ', this.column1[0].tasks.length)
            // console.log('Половина длины массива: ', (this.column1[0].tasks.length)/2)
            // console.log('Значение по id', task1)

        },
    }
})

//2 столбец
Vue.component('card2', {
    props: {
        column2: {
            type: Array
        }
    },
    template: `
    <div class="active">
        <ul>
            <tapok :data="data" @card2_trans="card2_del" v-for="(data, index) in column" :key="index"></tapok>
        </ul>
    </div>
    `,
    // methods: {
    //     card3_del(id){
    //         let desk = this.column.splice(id,1)
    //         desk = desk.pop()
    //         this.$emit('card3_trans', desk);
    //     }
    // },
})
/*
//3 столбец
Vue.component('cards3', {
    props: {
        column3: {
            type: Array
        },
    },
    template: `
        <div class="done">
        <ul>
            <tapok :data="data" v-for="(data, index) in column3" :key="index"></tapok>
        </ul>
        </div>
    `
})*/

let app = new Vue({
    el: '#app',
    data: {
        column1: [
            {
                name: 'Кот',
                count: 0,
                tasks: [
                    {taskname: 'Допустим', visible: true},
                    {taskname: 'Я сказал', visible: true},
                    {taskname: 'Мяу', visible: true}
                ]
            },
            {
                name: 'Птица',
                count: 0,
                tasks: [
                    {taskname: 'Допустим', visible: true},
                    {taskname: 'Я испугался и сказал', visible: true},
                    {taskname: 'Пока', visible: true}
                ]
            }
        ],
        column2: [
            {
                name: 'Собака',
                tasks: [
                    {taskname: 'Допустим'},
                    {taskname: 'Я ответил'},
                    {taskname: 'Гав'}
                ]
            }
        ],
        // column3: [],
        formCard: {
            name: null,
            task1: null,
            task2: null,
            task3: null,
            visible: null,
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
                            },
                            {
                                taskname: this.formCard.task2,
                                visible: true,
                            },
                            {
                                taskname: this.formCard.task3,
                                visible: true,
                            }
                        ]
                    }
                )
                this.formCard.name = '';
                this.formCard.task1 = '';
                this.formCard.task2 = '';
                this.formCard.task3 = '';
                this.formCard.visible = '';
            }
        },
        // card2_tel(desk) {
        //     if (this.column2.length < 5) {
        //         this.column2.push(desk)
        //     } else {
        //         this.column1.push(desk)
        //     }
        // },
        // card3_tel(desk) {
        //     this.column3.push(desk)
        // }
    }
})

