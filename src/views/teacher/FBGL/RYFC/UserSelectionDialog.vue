<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-row style="height: 80px;">
            <!-- 搜索和筛选区域 -->
            <div
                style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
                <v-col cols="9">
                    <span style="margin-left: 30px;">学工号</span>
                    <el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.userNumber" placeholder="请输入内容"></el-input>
                    <span style="margin-left: 30px;">姓名</span>
                    <el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.userName" placeholder="请输入内容"></el-input>
                </v-col>
                <v-col cols="3">
                    <el-button class="redBtn" @click="queryList">筛选</el-button>
                    <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
                </v-col>
            </div>
        </v-row>
        <v-row>
            <v-col cols="8">
                <!-- 表格区域 -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    class="selection-table"
                    @selection-change="handleSelectionChange"
                    max-height="400px"
                    :header-cell-style="headerCellStyle"
                    :row-style="rowStyle"
                    row-key="id"
                >
                    <el-table-column type="selection" width="50" :reserve-selection="true"></el-table-column>
                    <el-table-column prop="userNumber" label="学工号" align="center" width="95"></el-table-column>
                    <el-table-column prop="userName" label="姓名" align="center" width="110"></el-table-column>
                    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                </el-table>
            </v-col>
            <v-col cols="4">
                <div class="d-flex flex-column justify-space-between" style="height: 100%;">
                    <div>
                        <v-list v-if="selectedRows.length > 0" dense>
                            已选人员（{{ selectedRows.length }}）
                            <v-list-item
                                v-for="user in selectedRows"
                                :key="user.id"
                                class="selected-item"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ user.userNumber }}  {{ user.userName }}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action class="remove-icon">
                                    <v-icon
                                        small
                                        color="#F35339"
                                        @click="removeUser(user)"
                                    >
                                        mdi-account
                                    </v-icon>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <p v-else class="empty-text">暂无已选择人员</p>
                    </div>
                    <div class="button-group">
                        <el-button class="redBtn" @click="confirmSelection">确认录入</el-button>
                        <el-button @click="cancelSelection">取消</el-button>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryItems.page.pageNumber" :page-sizes="pageSizeList" background
                :page-size="queryItems.page.pageSize" layout="total, prev, pager, next, jumper" :total="totalNum">
            </el-pagination>
        </v-row>
    </v-container>
</template>
  
<script>
import { getPersonAccessList } from "@/http/permission.js"; // 假设接口存在

export default {
    name: "UserSelectionDialog",
    props: {
        selectedIds: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["confirm", "cancel"],
    data() {
        return {
            tableData: [],
            totalNum: 0,
            pageSizeList: [5, 10, 20, 30, 40],
            queryItems: {
                userName: "",
                userNumber: "",
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                },
            },
            branchOptions: [
                { label: "支部A", value: "支部A" },
                { label: "支部B", value: "支部B" },
            ],
            selectedRows: [],
        };
    },
    mounted() {
        this.queryList();
    },
    methods: {
        // 查询列表
        queryList() {
            if (this.queryItems.branch === "全部") this.queryItems.branch = "";
            getPersonAccessList(this.queryItems).then((res) => {
                this.tableData = res.data.records;
                this.totalNum = res.data.total;
            });
        },
        // 清除搜索条件
        clearInput() {
            this.queryItems.branch = "";
            this.queryItems.userNumber = "";
            this.queryList();
        },
        // 分页处理
        handleSizeChange(val) {
            this.queryItems.page.pageSize = val;
            this.queryList();
        },
        handleCurrentChange(val) {
            this.queryItems.page.pageNumber = val;
            this.queryList();
        },
        // 表格多选变化
        handleSelectionChange(val) {
            this.selectedRows = val;
        },
        // 提供清空选择的方法
        clearSelection() {
            this.selectedRows = [];
            this.$refs.multipleTable.clearSelection();
        },
        // 移除已选择的人员
        removeUser(user) {
            this.selectedRows = this.selectedRows.filter((item) => item.id !== user.id);
        },
        // 确认录入
        confirmSelection() {
            const selectedIds = this.selectedRows.map((row) => row.id);
            if (selectedIds.length === 0) {
                this.$message.error("请选择至少一个用户！");
                return;
            }
            this.$emit("confirm", selectedIds);
        },
        // 取消
        cancelSelection() {
            this.selectedRows = []
            this.$refs.multipleTable.clearSelection();
            this.$emit("cancel");
        },
        // 表格样式
        headerCellStyle() {
            return {
                backgroundColor: "#F7F7F7",
                color: "#3E3E3E",
                fontWeight: "bold",
                border: "1px solid #E9E9E9",
            };
        },
        rowStyle() {
            return {
                color: "#3E3E3E",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E9E9E9",
            };
        },
    },
};
</script>

<style scoped>
.user-selection-dialog {
    padding: 10px;
}

/* 搜索区域样式 */
.search-bar {
    display: flex;
    align-items: center;
    padding: 10px 0;
    background-color: #f7f7f7;
    border-radius: 10px;
}

.label {
    margin-left: 20px;
    font-size: 14px;
    color: #3e3e3e;
}

.search-select,
.search-input {
    width: 20%;
    margin-left: 20px;
}

.red-btn {
    background-color: #f35339;
    color: white;
    border: none;
    margin-left: 20px;
    padding: 8px 20px;
}

.white-btn {
    background-color: white;
    color: #f35339;
    border: 1px solid #f35339;
    margin-left: 10px;
    padding: 8px 20px;
}

/* 表格样式 */
.selection-table {
    width: 100%;
    margin-top: 20px;
    border: 1px solid #e9e9e9;
    border-radius: 10px;
}

:deep(.el-table th),
:deep(.el-table td) {
    border: 1px solid #e9e9e9;
    padding: 8px 0;
}

/* 分页样式 */
.pagination-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.total-text {
    font-size: 14px;
    color: #3e3e3e;
}

:deep(.el-pagination) {
    display: flex;
    align-items: center;
}

:deep(.el-pagination .el-pager li) {
    background-color: #f7f7f7;
    border: 1px solid #e9e9e9;
    margin: 0 5px;
}

:deep(.el-pagination .el-pager li.active) {
    background-color: #f35339;
    color: white;
    border: none;
}

.remove-icon {
  opacity: 0;
  transition: opacity 0.2s;
}
</style>