let eventBus = new Vue()

Vue.component('tapok',{
    props: ['data', 'column1','column2','column3'],
    template: `
    <div>
        <li><p>{{ data.name }}</p></li>
        <p>{{ data.task1 }} <button v-if="!isHidden1" v-on:click="isHidden1 = true" @click="task1_del">Выполнить</button></p> 
        <p>{{ data.task2 }} <button v-if="!isHidden2" v-on:click="isHidden2 = true" @click="task2_del">Выполнить</button></p>
        <p>{{ data.task3 }} <button v-if="!isHidden3" v-on:click="isHidden3 = true" @click="task3_del">Выполнить</button></p>
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
        task1_del(){
            this.$emit('card2_trans');
        },
        task2_del(){
            console.log(1)
        },
        task3_del(){
            console.log(1)
        },

    }
})

//1 столбец
Vue.component('cards1', {
    props: {
        column1: {
            type: Array
        }
    },
        template: `
         <div class="new">
        <ul>
            <tapok :data="data" @card2_trans="card2_del" v-for="(data, index) in column1" :key="index"></tapok>
        </ul>
        </div>
    `,
    data() {
        return{
            task: [],
        }
    },
    methods: {
        card2_del(id){
            let desk = this.column1.splice(id,1)
            desk = desk.pop()
            this.$emit('card2_trans');
        },

        // task1_del(index){
        //         let task1 = this.column1[index].task1
        //         this.task.push(task1)
        //         console.log(this.task)
        // },
        // task2_del(index){
        //     let task2 = this.column1[index].task2
        //     this.task.push(task2)
        //     console.log(this.task)
        // },
        // task3_del(index){
        //     let task3 = this.column1[index].task3
        //     this.task.push(task3)
        //     console.log(this.task)
        //
        // },
        // task_simile(index) {
        //     if(this.column1.length < (this.task.length)){
        //         console.log(this.column1.length)
        //         console.log(this.task.length)
        //     }
        // }
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
            <tapok :data="data" v-for="(data, index) in column2" :key="index"></tapok>
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
})

let app = new Vue({
    el: '#app',
    data: {
        column1: [
            {
                name: 'Кот',
                task1: 'Допустим',
                task2: 'Я сказал',
                task3: 'Мяу'
            }
        ],
        column2: [
            {
                name: 'Собака',
                task1: 'Допустим',
                task2: 'Я ответил',
                task3: 'Гав'
            }
        ],
        column3: [],
        formCard: {
            name: '',
            task1: '',
            task2: '',
            task3: '',
        },
    },
    methods: {
        addCard(){
            if(this.column1.length < 3){
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
        card2_tel(desk) {
            if(this.column2.length < 5) {
                this.column2.push(desk)
                console.log(this.column2)
            }
            else {
                this.column1.push(desk)
            }
        },
        card3_tel(desk) {
            this.column3.push(desk)
        }
    }
})

