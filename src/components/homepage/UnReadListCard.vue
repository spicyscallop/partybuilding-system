<template>
    <v-sheet rounded="lg" class="d-flex flex-column bg-grey-lighten-4" style="overflow: auto; width: 100%;">
        <div class="d-flex justify-space-between bg-white">
            <h1 class="ml-5 mt-4 mb-3 text-h5">{{ title }}</h1>
            <v-btn v-if="showBtn" class="mr-0 mt-4 justify-end bg-white" append-icon="mdi-chevron-right" variant="plain" @click="viewUnreadMessages">
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
                                <span>来源：</span><span style="color:#2196F3;">{{item.sendUser.userName}}</span>
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

        <v-dialog v-model="dialogVisible" max-width="900">
            <v-card class="pa-0" style="background-color: #e0e0e0;"> <!-- 浅灰色背景 -->
                <!-- 自定义白色内容区域 -->
                <div class="pa-6" style="background-color: #fff; border-radius: 12px;">
                <div v-if="list && list.length > 0">
                    <v-sheet
                    v-for="(message, index) in list"
                    :key="index"
                    class="pa-4 mb-6"
                    elevation="0"
                    style="background-color: transparent;"
                    >
                    <!-- 标题 -->
                    <div class="text-h6 font-weight-medium mb-2">
                        {{ message.title }}
                    </div>

                    <div class="text-body-2 text-grey-darken-1">
                        {{ message.subtitle }}
                    </div>

                    <!-- 横向三列，发展阶段、主办单位、时间节点 -->
                    <div class="d-flex flex-wrap text-body-2 mb-4">
                        <div class="mr-10">
                        发送来源：<span class="text-primary" style="cursor: pointer;">{{ message.sendUser.userName }}</span>
                        </div>
                        <div>
                        发送时间：<span class="text-primary" style="cursor: pointer;">{{ message.date }}</span>
                        </div>
                    </div>

                    <!-- 正文 -->
                    <div class="text-body-2" style="color: #000000;margin-top: 20px;">
                        {{ message.content }}
                    </div>
                    </v-sheet>
                </div>
                <div v-else class="text-center py-10">
                    <p>暂无未读消息。</p>
                </div>
                </div>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDialog">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


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
            content: [],
            dialogVisible: false,
        }
    },
    methods: {
        getMoreNotices() {
            this.$message({
                message: '相关页面还未开发',
                type: 'warning',
                duration: 2000
            });
        },
        viewUnreadMessages(){
            this.dialogVisible = true;
        },
        closeDialog(){
            this.dialogVisible = false;
        },
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