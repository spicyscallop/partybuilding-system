<template>
    <v-sheet rounded="lg" class="d-flex flex-column pb-5 bg-grey-lighten-4" style="overflow: auto; width: 100%;">
        <div class="d-flex justify-space-between">
            <h1 class="ml-5 mt-4 mb-3 text-h5">{{ title }}</h1>
            <div class="list-card">
                <RouterLink :to="moreLink" class="mr-3">更多 ></RouterLink>
            </div>
        </div>
        <v-list lines="one" class="py-0 pl-1 bg-grey-lighten-4 flex-grow-1">
            <v-list-item v-for="item in content" :title="item.title" :subtitle="item.subtitle" @click="goToUrl(item.url)">
                <template v-slot:append>
                    <v-label class="ml-5" :text="item.date"></v-label>
                </template>
            </v-list-item>
        </v-list>
        <v-btn-toggle class="justify-center mt-2" v-model="index" style="height: auto;" mandatory>
            <v-btn v-for="page in totalPages" class="bg-grey-lighten-2 mr-2" size="xx-small" rounded="xl" style="width: 15px;height: 15px; "></v-btn>
        </v-btn-toggle>
    </v-sheet>
</template>

<script>
export default {
    props: {
        moreLink: {
            type: String,
            default: "/",
        },
        list: {
            type: Array,
            default: function () {
                return [];
            },
        },
        title: {
            type: String,
            default: "ListCard",
        },
        // 每页显示的条目数
        pageSize: {
            default: 4
        }
    },
    data () {
      return {
        index: 0,
        content: []
      }
    },
    methods: {
        goToUrl(url) {
            window.open(url, '_blank');
        },
        updateContent() {
            const start = this.index * this.pageSize;
            const end = start + this.pageSize;
            this.content = this.list.slice(start, end);
        }
    },
    watch: {
        index(newValue) {
            this.updateContent();
        },
        list() {
            this.updateContent();
        }
    },
    mounted() {
        this.updateContent();
    },
    computed: {
        // 计算总页数，向上取整
        totalPages() {
            return Math.ceil(this.list.length / this.pageSize);
        }
  }
};

</script>