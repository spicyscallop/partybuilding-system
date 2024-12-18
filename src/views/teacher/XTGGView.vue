<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="d-flex align-center">
                <v-col cols="12">
                    <SubpageTitle text="系统公告" width="43" height=43>
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row style="height: 80px;">
                <div
                    class="d-flex justify-space-around align-center bar">
                    <div v-for="(item, index) in partList" :key="index">
                        {{ item }}
                    </div>
                </div>
            </v-row>
            <v-row class="d-flex flex-column h-100">
                <!-- 设置一个占满剩余空间的 div -->
                <div class="flex-grow-1 overflow-auto mt-10">
                    <v-sheet rounded="lg" class="d-flex flex-column pb-5" style="overflow: auto; width: 100%;">
                        <v-list lines="one" class="py-0 pl-1">
                            <v-sheet v-for="(item, index) in xtgg" :key="index">
                            <v-list-item  :title="item.title" @click="goToExternUrl(item.url)">
                                <template v-slot:append>
                                    <v-label class="ml-5" :text="item.date"></v-label>
                                </template>
                            </v-list-item>
                            <v-divider thickness="2"></v-divider>
                            </v-sheet>
                        </v-list>
                    </v-sheet>
                </div>
            </v-row>
            <v-row style="background-color: #E9E9E9;">
                <v-col cols="5">
                </v-col>
                <v-col cols="7">
                    <div style="display: inline-block;float: right;">
                        <div style="display: inline-block;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList" background
                                :page-size="queryItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
  </template>
  
  
  <script>
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import DropDownBox from '@/components/dropDown/DropDownBox.vue';
  import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { getXtggInfo } from "@/http/party.js"
  import "@/style/Common.css"
  
  export default {
    components: {
        SubpageTitle,
        DropDownBox,
        AttributeSelection,
        ArrowDown,
    },
    data() {
        return {
            partList: [
                "学院概况",
                "招生信息",
                "教学管理",
                "思政工作",
                "实习就业",
                "合作科研",
                "组织人事",
                "校园服务",
                "综合服务",
            ],
            tableKey: 0,
            applyTime: "",
            tableBottom: {
              totalNum: 100,
              pageSizeList: [10, 20, 30, 40]
            },
            queryItems: {
              pageIndex: 1,
              pageSize: 10,
            },
            xtgg: [
                {
                    title: "",
                    url: "",
                    content: "",
                    date: "",
                },
            ]
        }
    },
    mounted() {
        getXtggInfo().then(res => {
            this.xtgg = res.data.records.map(item => ({
                title: item.title,
                url: item.url,
                content: item.content,
                date: item.createTime,
            }));

            this.tableBottom.totalNum = res.data.total;
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        goToExternUrl (url) {
            window.open(url, "_blank")
        },
        goTo(route) {
            this.$router.push(route);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.queryItems.pageSize = val;
            this.queryList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.queryItems.pageIndex = val;
            queryList();
        },
        headerRowStyle() {
            return {
                backgroundColor: '#F7F7F7',
                color: '#3E3E3E',
            }
        },
        queryList() {
          console.log("执行了查询列表的请求");
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleCommand(command) {
          console.log(command);
          this.selectedOption = command;
        },
       toggleSelection(rows) {
          if (rows) {
              rows.forEach(row => {
                  this.$refs.multipleTable.toggleRowSelection(row);
              });
          } else {
              this.$refs.multipleTable.clearSelection();
          }
        },
    },
  }
  </script>
  
<style scoped>
    .bar {
        background-color: #F35339; 
        height: 100%;
        width: 100%;
        border-radius: 20px;
        color: #fff;
    }
</style>