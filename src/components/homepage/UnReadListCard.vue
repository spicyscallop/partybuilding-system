<template>
    <v-sheet rounded="lg" class="d-flex flex-column bg-grey-lighten-4" style="overflow: auto; width: 100%;">
        <div class="d-flex justify-space-between bg-white">
            <h1 class="ml-5 mt-4 mb-3 text-h5">{{ title }}</h1>
            <v-btn v-if="showBtn" class="mr-0 mt-4 justify-end bg-white" append-icon="mdi-chevron-right" variant="plain" @click="">
                查看
            </v-btn>
        </div>
        <v-list lines="one" class="py-0 bg-white">
            <v-list-item v-for="item in list" style="width: 100%;" class="mt-2 mb-2 bg-white">
                <div class="bg-grey-lighten-3 mb-2 mt-2" style="width: 100%;height: 170px; border-radius: 5%;">
                    <v-sheet class="d-flex mb-6 bg-grey-lighten-3" style="height: 45px;width: 100%;overflow: hidden;">
                        <v-sheet class="bg-grey-lighten-3 ma-2 pa-2 me-auto" style="height:30px;width: 65%;">
                            <div style="height: 30px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                <span style="font-size: 20px;">
                                    {{ item.title }}
                                </span>
                            </div>
                        </v-sheet>
                        <v-sheet class="bg-grey-lighten-3 ma-2 pa-2">
                            <v-sheet__content>
                                <span>来源：</span><span style="color:#2196F3;">来源单位</span>
                            </v-sheet__content>
                        </v-sheet>
                        <v-sheet class="bg-grey-lighten-3 ma-2 pa-2">
                            <v-sheet__content>
                                <span>发布时间：</span>
                                <span style="color:#2196F3;">{{ item.date }}</span>
                            </v-sheet__content>
                        </v-sheet>
                    </v-sheet>
                    <v-sheet class="bg-grey-lighten-3" style="height: 115px;">
                        <v-sheet class="bg-grey-lighten-3 ml-4 mr-4" style="text-overflow: ellipsis; ">
                            <div style="height: 115px; overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">
                                {{ item.subtitle }}
                            </div>
                        </v-sheet>
                    </v-sheet>
                </div>
            </v-list-item>
        </v-list>
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
        pageSize: {
            default: 4
        },
        showBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            index: 0,
            content: []
        }
    },
    methods: {
        getMoreNotices() {
            this.$message({
                message: '相关页面还未开发',
                type: 'warning',
                duration: 2000
            });
        }
    },
    watch: {
        index(newValue, oldValue) {
            this.content = this.list.slice(newValue * this.pageSize, (newValue + 1) * this.pageSize)
        }
    },
    mounted() {
        this.content = this.list.slice(0, this.pageSize)
    },
};

</script>