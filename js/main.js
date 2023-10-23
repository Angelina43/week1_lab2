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
        <p v-for="(data, index) in data.card" @card_save="card_save(index)">{{ data.name }}</p>
        <p v-for="(data, index) in data.card" @card_save="card_save(index)">{{ data.about }}</p>
        <p v-for="(data, index) in data.card" @card_save="card_save(index)"> {{ data.date }}</p>
        <p v-for="(data, index) in data.card" @card_save="card_save(index)">{{ data.hour }}</p>
        <button v-for="(data, index) in data.card" v-if="data.visible" v-on:click="data.visible = !data.visible" @click="card_del(index)">Удалить</button>
    </div>
    `,
    data() {
        return {
            visible: null,
            // completed: false
        }
    },
    methods: {
        card_del(id) {
            this.data.card.splice(id, 1)
        }
        // task_update(id) {
        //     this.data.tasks[id].completed = !this.data.tasks[id].completed
        //     eventBus.$emit('update-checkbox', this.id)
        // },
        // save() {
        //     localStorage.column1 = JSON.stringify(this.column1)
        //     localStorage.column2 = JSON.stringify(this.column2)
        //     localStorage.column3 = JSON.stringify(this.column3)
        // }
    },
    // mounted() {
    //     eventBus.$on('update-checkbox', id => {
    //         let counterComp = 0;
    //         let counterNotComp = 0;
    //         for (let f of this.data.tasks) {
    //             if (f.completed) {
    //                 counterComp++;
    //             } else {
    //                 counterNotComp++;
    //             }
    //         }
    //         this.data.completedNum = (counterComp / (counterComp + counterNotComp)) * 100;
    //         if (this.data.completedNum > 50) eventBus.$emit('move-column2', id, this.data);
    //         if (this.data.completedNum === 100) eventBus.$emit('move-column3', id, this.data);
    //     })
    // }
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
    `
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
        <div class="test">
        <ul>
            <tapok :data="data" @save="save()" v-for="(data, index) in column3" :id="index"></tapok>
        </ul>
        </div>
    `
})
//4 столбец
Vue.component('column4', {
    props: {
        column4: {
            type: Array
        },
    },
    data() {
        return {}
    },
    template: `
        <div class="done">
        <ul>
            <tapok :data="data" @save="save()" v-for="(data, index) in column4" :id="index"></tapok>
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
        column4: [],
        formCard: {
            name: null,
            about: null,
            date: null,
            hour: null,
            visible: null,
            // completed: false
        }
    },
    methods: {
        addCard() {
            this.column1.push(
                {
                    card: [
                        {
                            name: this.formCard.name,
                            about: this.formCard.about,
                            date: this.formCard.date,
                            hour: this.formCard.hour,
                            visible: true
                        }
                    ]
                }
            )
            this.formCard.name = '';
            this.formCard.about = '';
            this.formCard.date = '';
            this.formCard.hour = '';
            this.formCard.visible = '';
            // this.formCard.completed = '';
            this.save()
        },
        save() {
            localStorage.column1 = JSON.stringify(this.column1)
            localStorage.column2 = JSON.stringify(this.column2)
            localStorage.column3 = JSON.stringify(this.column3)
            localStorage.column4 = JSON.stringify(this.column4)
        },
        // time(id) {
        //     let timeData = new Date();
        //     this.column2[id].time = timeData.getHours() + ':' + timeData.getMinutes();
        //     this.column2[id].date = timeData.getDate() + '.' + timeData.getMonth() + '.' + timeData.getFullYear();
        // }
    },

    mounted() {
        if (localStorage.column1) {
            this.column1 = JSON.parse(localStorage.column1)
        }
        if (localStorage.column2) {
            this.column2 = JSON.parse(localStorage.column2)
        }
        if (localStorage.column3) {
            this.column3 = JSON.parse(localStorage.column3)
        }
        if (localStorage.column4) {
            this.column4 = JSON.parse(localStorage.column4)
        }
        // eventBus.$on('move-column2', (id) => {
        //     if (this.column2.length < 5) {
        //         if (this.column1[id].completedNum >= 50) {
        //             this.column2.push(this.column1[id])
        //             this.column1.splice(id, 1)
        //             this.save()
        //         }
        //     }
        // });
        // eventBus.$on('move-column3', (id) => {
        //     if (this.column2[id].completedNum === 100) {
        //         this.time(id)
        //         this.column3.push(this.column2[id])
        //         this.column2.splice(id, 1)
        //         this.save()
        //     }
        // })
    }
})