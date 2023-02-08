let eventBus = new Vue()

//1 столбец
Vue.component('cards1', {
    props: {
        column1: {
            type: Array
        },
    },
        template: `
         <div class="new">
        <ul v-for="(cd, index) in column1" :key="index">
            <li><p>{{ cd.name }}</p></li>
            <p>{{ cd.task1 }}</p>
            <p>{{ cd.task2 }}</p>
            <p>{{ cd.task3 }}</p>
            <button @click="card2_del(index)">Перенести во 2 столбец</button>
        </ul>
        </div>
    `,
    //     methods: {
    //         // removeTask: function(task1){
    //         //     let filtersList = this.tasks.filter(element => element !== task1)
    //         //     this.tasks=filtersList
    //         // },
    //         // removeTask: function (index){
    //         //     this.tasks.splice(index,1)
    //         // },
    methods: {
        card2_del(id){
            let desk = this.column1.splice(id,1)
            let desk2 = desk.pop()
            this.$emit('card2_trans', desk2);
        }
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
        <ul v-for="(cd, index) in column2" :key="index">
            <li><p>{{ cd.name }}</p></li>
            <p>{{ cd.task1 }}</p>
            <p>{{ cd.task2 }}</p>
            <p>{{ cd.task3 }}</p>
            <button @click="card3_del(index)">Перенести в 3 столбец</button>
        </ul>
    </div>
    `,
    methods: {
        card3_del(id){
            let desk = this.column2.splice(id,1)
            let desk2 = desk.pop()
            this.$emit('card3_trans', desk2);
        }
    }
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
        <ul v-for="(cd, index) in column3" :key="index">
            <li><p>{{ cd.name }}</p></li>
            <p>{{ cd.task1 }}</p>
            <p>{{ cd.task2 }}</p>
            <p>{{ cd.task3 }}</p>
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
        }
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
            }
            else {
                alert('Превышен ввод')
            }
        },
        card2_tel(desk2) {
            if(this.column2.length < 5) {
                this.column2.push(desk2)
            }
            else {
                alert('Превышен ввод')
                this.column1.push(desk2)
            }
        },
        card3_tel(desk2) {
            this.column3.push(desk2)
        },
        count_length(){
            console.log(this.column1.length)
        }
    }
})

