let eventBus = new Vue()

Vue.component('tapok', {
    props: ['data'],
    template: `
    <div>
        <li><p>{{ data.name }}</p></li>
        <p v-for="(data, index) in data.tasks" :key="index">{{ data.name }} <button v-if="data.visible" v-on:click="data.visible = !data.visible" @click="task_del(data)">Выполнить</button></p> 
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
        task_del(task) {
            // console.log(task);
            this.$emit('card2_trans', task)
        },

    }
})

//1 столбец
Vue.component('cards1', {
    props: {
        column1: {
            type: Array
        },
    },
    template: `
         <div class="new">
        <ul>
            <tapok :data="data" @card2_trans="card2_del" v-for="(data, index) in column1" :key="index"></tapok>
        </ul>
        </div>
    `,
    data() {
        return {
            task: [],
        }
    },
    methods: {
        card2_del(tasks) {
            //  let desk = this.column1[id]
            // desk = desk.pop()
            // this.$emit('card2_trans', desk);


            let count1 = 0
            for (let key in tasks){
                console.log('Ключ: ' + key + ' значение: ' + tasks[key])
                if (!tasks[key]) {
                    count1++
                    console.log(count1)
                }
            }


            // let task1 = []
            // let count = 0
            // task1.push(this.column1[0].tasks[0])
            // console.log('Задачи: ', this.column1[0].tasks)
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
            <tapok :data="data" @card2_trans="card2_del" v-for="(data, index) in column2" :key="index"></tapok>
        </ul>
    </div>
    `,
    methods: {
        card3_del(id){
            let desk = this.column2.splice(id,1)
            desk = desk.pop()
            this.$emit('card3_trans', desk);
        }
    },
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
                tasks: [
                    {name: 'Допустим', visible: true},
                    {name: 'Я сказал', visible: true},
                    {name: 'Мяу', visible: true}
                ]
            },
            {
                name: 'Птица',
                tasks: [
                    {name: 'Допустим', visible: true},
                    {name: 'Я испугался и сказал', visible: true},
                    {name: 'Пока', visible: true}
                ]
            }
        ],
        column2: [
            {
                name: 'Собака',
                tasks: [
                    {name: 'Допустим'},
                    {name: 'Я ответил'},
                    {name: 'Гав'}
                ]
            }
        ],
        // column3: [],
        formCard: {
            name: '',
            task1: '',
            task2: '',
            task3: '',
        },
    },
    methods: {
        addCard() {
            if (this.column1.length < 3) {
                this.column1.push(
                    {
                        name: this.formCard.name,
                        task1: this.formCard.task1,
                        task2: this.formCard.task2,
                        task3: this.formCard.task3,
                    }
                )
                this.formCard.name = null
                this.formCard.task1 = null
                this.formCard.task2 = null
                this.formCard.task3 = null
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

