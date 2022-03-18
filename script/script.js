import { appbar, infotitle, list, windowadd, btn } from './components.js'
import lang from './lang.js'
Vue.createApp({
    components: {
        appbar,
        infotitle,
        list,
        windowadd,
        btn
    },
    data() {
        return {
            enableSearch: false,
            searchValue: '',
            titleInfo: 'Все заметки',
            gridOrList: true,
            window: false,
            list: [

            ],
            filterList: [],
            edit: false,
            editContent: {},
            lang: 'ru',
            langword: {}
        }
    },
    created() {
        this.list = JSON.parse(localStorage.list ?? '[]')
        this.gridOrList = JSON.parse(localStorage.flex ?? 'false')
        localStorage.lang = localStorage.lang || 'ru'
        this.lang = localStorage.lang || 'ru'
        this.langword = lang
    },
    methods: {
        changeLang(lang) {
            this.lang = localStorage.lang = lang
        },
        updateAppbar(enableSearch) {
            this.enableSearch = enableSearch
        },
        valueAppbar(searchValue) {
            this.searchValue = searchValue
            this.filterList = this.list.filter((val) => {
                if (val.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) return val;
            });
            if (!searchValue) this.filterList = []
        },
        changeStateBtn(bool) {
            this.gridOrList = bool
        },
        changeStateWindow(bool) {
            this.window = bool
            if(!window) {
                this.edit = false
                this.editContent = {}
            }
        },
        addItem(data) {
            localStorage.list = localStorage.list ?? '[]'
            const json = JSON.parse(localStorage.list)
            json.push(data)
            localStorage.list = JSON.stringify(json)
            this.list.push(data)
        },
        delItem(item) {
            this.list.splice(item, 1)
            localStorage.list = JSON.stringify(this.list)
        },
        editItem(item) {
            this.edit = this.window = true
            this.editContent = this.list[item]
            this.editContent.id = item
        },
        editNewItem(item) {
            this.list[item.id] = item
            localStorage.list = JSON.stringify(this.list)
        }
    }
}).mount('#app')