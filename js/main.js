let eventBus = new Vue()

//1 столбец
Vue.component('cards1', {
    props: {
        column1: {
            type: Array
        }
    },
        template: `
         <div class="new">
        <li v-for="(cd, index) in column1" :key="index">
            <p>{{ cd.name }}</p>
            <p>{{ cd.task1 }}</p>
            <p>{{ cd.task2 }}</p>
            <p>{{ cd.task3 }}</p>
            <button @click="transferCard">Перенести во 2 столбец</button>
        </li>
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
})

Vue.component('card2', {
    props: {
        column2: {
            type: Array
        }
    },
    template: `
    <div class="active">
        <li v-for="(cd, index) in column2" :key="index">
            <p>{{ cd.name }}</p>
            <p>{{ cd.task1 }}</p>
            <p>{{ cd.task2 }}</p>
            <p>{{ cd.task3 }}</p>
        </li>
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
            name: '',
            task1: '',
            task2: '',
            task3: '',
        }
    },
    methods: {
        addCard(){
            this.column1.push(
                {
                        name: this.formCard.name,
                        task1: this.formCard.task1,
                        task2: this.formCard.task2,
                        task3: this.formCard.task3,
                    }
            )
        },
        card_trans(index){
            let desk = this.column1.splice(index,1)
            desk = desk.pop()
            this.column2.push(desk)
            console.log(1)
        }
    }
})

