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
            <button>Переместить во второй столбец</button>
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
        // addCard(){
        //     let formTask = {
        //         name: this.name,
        //         task1: this.task1,
        //         task2: this.task2,
        //         task3: this.task3,
        //     }
        //     this.column1.push(formTask)
        //     this.name = null
        //     this.task1 = null
        //     this.task2 = null
        //     this.task3 = null
        // }
        addCard(){
            this.column1.push(
                {
                        name: this.formCard.name,
                        task1: this.formCard.task1,
                        task2: this.formCard.task2,
                        task3: this.formCard.task3,
                    }
            )
        }
    }
})

