<template>
    <v-sheet rounded="lg" class="d-flex flex-column pb-5 bg-grey-lighten-4" style="overflow: auto; width: 100%;">
        <div class="d-flex justify-space-between">
            <h1 class="ml-5 mt-4 mb-3 text-h5">{{ title }}</h1>
            <v-btn class="mr-0 mt-4 justify-end bg-grey-lighten-4" variant="plain" @click="getMoreNotices">
                更多
            <v-icon class="mt-1" icon="mdi-greater-than"></v-icon>
            </v-btn>
        </div>
        <v-list lines="one" class="py-0 pl-1 bg-grey-lighten-4">
            <v-list-item v-for="item in content" :title="item.title" :subtitle="item.subtitle">
                <template v-slot:append>
                    <v-label class="ml-5" :text="item.date"></v-label>
                </template>
            </v-list-item>
        </v-list>
        <v-btn-toggle class="justify-center mt-2" v-model="index" style="height: auto;" mandatory>
            <v-btn class="bg-grey-lighten-2 mr-2" size="xx-small" rounded="xl" style="width: 15px;height: 15px; "></v-btn>
            <v-btn class="bg-grey-lighten-2" size="xx-small" rounded="xl" style="width: 15px;height: 15px; "></v-btn>
            <v-btn class="bg-grey-lighten-2 ml-2" size="xx-small" rounded="xl" style="width: 15px;height: 15px; "></v-btn>
        </v-btn-toggle>
    </v-sheet>
</template>

<script>
export default {
    props: {
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
        getMoreNotices(){
            //TODO: 更多
            this.$message({
                        message: '相关页面还未开发',
                        type: 'warning',
                        duration: 2000
                      });
        }
    },
    // 监听 index 的变化，更新 content 数组
    watch:{
        index(newValue,oldValue){
            this.content = this.list.slice(newValue*this.pageSize,(newValue+1)*this.pageSize)
        }
    },
    // 初始化 content 数组
    mounted(){
        this.content = this.list.slice(0,this.pageSize)
    },
};

</script>