const appbar = {
    name: 'AppBar',
    props: ['search', 'value', 'langword', 'lang'],
    data() {
        return {
            valuesearch: ''
        }
    },
    methods: {
        backSearch() {
            this.$emit('update-appbar', false)
            this.$emit('value-appbar', '')
            this.valuesearch = ''
        },
        onSearch() {
            this.$emit('update-appbar', !this.search)
        },
        onInput() {
            
            this.$emit('value-appbar', this.valuesearch)
        },
        onClear() {
            this.$emit('value-appbar', '')
            this.valuesearch = ''
        },
        onChangeLang() {
            this.$emit('change-lang', this.lang == 'ru' ? 'uz' : 'ru')
        }
    },
    template: `
    <transition name="fade-bar" mode="out-in">
        <div class="appbar" v-if="!search">
            <button class="appbar__btn" v-if="lang == 'ru'" @click="onChangeLang">
                uz
            </button>
            <button class="appbar__btn" v-else @click="onChangeLang">
                ru
            </button>
            <div class="appbar__title">{{ langword[lang].appbartitle }}</div>
            <button class="appbar__btn" @click="onSearch">
                <img src="img/search.svg" alt="">
            </button>
        </div>
        
        <div class="appbar appbar_input" v-else>
            <button class="appbar__btn" @click="backSearch">
                <img src="img/back.svg" alt="">
            </button>
            <div class="container">
                <input type="text" ref="items" :placeholder="langword[lang].appbarseacrch" autofocus v-model="valuesearch" @input="onInput" class="appbar__input">
            </div>
            <button class="appbar__btn" @click="onClear">
                <img src="img/clear.svg" alt="">
            </button>
        </div>
    </transition>
    `
}

const infotitle = {
    name: 'InfoTitle',
    props: ['title', 'gridorlist', 'langword', 'lang'],
    methods: {
        changeState() {
            this.$emit('change-state', !this.gridorlist)
            localStorage.flex = JSON.stringify(!this.gridorlist)
        }
    },
    template: `
    <div class="container">
        <div class="title-setting">
            <h3 v-if="!title">{{ langword[lang].infobar }}</h3>
            <h3 v-else>{{ langword[lang].infobarsearch }}</h3>
            <button class="title-setting__btn" @click="changeState" v-if="gridorlist">
                <img src="./img/list.svg"> {{ langword[lang].list }}
            </button>
            <button class="title-setting__btn" @click="changeState" v-else>
                <img src="./img/grid.svg"> {{ langword[lang].grid }}
            </button>
        </div>
    </div>
    `
}

const list = {
    name: 'Item',
    props: ['item', 'gridorlist', 'i', 'search', 'langword', 'lang'],
    methods: {
        delItem() {
            this.$emit('del-item', this.i)
        },
        editItem() {
            this.$emit('edit-item', this.i)
        }
    },
    template: `
    <div class="card-item">
        <div class="cart-item__header" :class="{ between: !gridorlist }">
            <h3 class="card-item__title">{{item.title}}</h3>
            <span class="card-item__date">{{item.date}}</span>
        </div>
        <p class="card-item__content">{{item.content}}</p>
        <div class="card-item__footer" v-if="!search">
            <button class="btn purpure" @click="editItem"><img src="./img/pansel.png">{{ langword[lang].editbtn }}</button>
            <button class="btn red" @click="delItem"><img src="./img/trash.png">{{ langword[lang].deledit }}</button>
        </div>
    </div>
    `
}

const windowadd = {
    name: "Add notes",
    data() {
        return {
            title: this.edit ? this.editcontent.title : '',
            content: this.edit ? this.editcontent.content : '',
            error: false
        }
    },
    props: ['edit', 'editcontent', 'langword', 'lang'],
    methods: {
        changeStateWindow() {
            this.$emit('change-state-window', false)
        },
        saveNote() {
            this.title = this.title.trim()
            this.content = this.content.trim()
            if(this.title.length == 0) {
                this.error = true
                setTimeout(() => this.error = false, 1000)
            } else if(this.content.length == 0) {
                this.error = true
                setTimeout(() => this.error = false, 1000)
            } else {
                this.$emit('change-state-window', false)
                const title = this.title
                const content = this.content
                const date = `${new Date().getDate()}.${new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`}.${new Date().getFullYear()}`
                const data = {
                    title, content, date
                }
                this.$emit('add-item', data)
            }
        },
        saveNewNote() {
            this.title = this.title.trim()
            this.content = this.content.trim()
            if(this.title.length == 0) {
                this.error = true
                setTimeout(() => this.error = false, 1000)
            } else if(this.content.length == 0) {
                this.error = true
                setTimeout(() => this.error = false, 1000)
            } else {
                this.$emit('change-state-window', false)
                this.editcontent.title = this.title
                this.editcontent.content = this.content
                this.$emit('edit-item', this.editcontent)
            }
        }
    },
    template: `
    <div class="window-bg" @click="changeStateWindow">
        <div class="window-bg__dialog" :class="{errordialog: error}" @click.stop.prevent>
            <h3 v-if="!this.edit" class="window-bg__title">{{ langword[lang].titlewindow }}</h3>
            <h3 v-else class="window-bg__title">{{ langword[lang].titlewindowedit }}</h3>
            <div class="window-bg__form">
                <label>
                    <span>Title</span>
                    <input v-model="title" autofocus >
                </label>
                <label>
                    <span>Content</span>
                    <textarea v-model="content"></textarea>
                </label>
            </div>
            <div class="window-bg__btns">
                <button class="btn red" @click="changeStateWindow">{{ langword[lang].closebtn }}</button>
                <button v-if="!this.edit" class="btn purpure" @click="saveNote">{{ langword[lang].addbtn }}</button>
                <button v-else class="btn purpure" @click="saveNewNote">{{ langword[lang].editwindowbtn }}</button>
            </div>
        </div>
    </div>
    `
}

const btn = {
    name: 'Button add note',
    props: ['window', 'langword', 'lang'],
    methods: {
        changeStateWindow() {
            this.$emit('change-state-window', true)
        }
    },
    template: `
    <button class="fab" @click="changeStateWindow">
        <img src="./img/fab.svg">
    </button>
    `
}
const s = {}
export { appbar, infotitle, list, windowadd, btn, s } 