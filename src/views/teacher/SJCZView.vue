<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <v-row style="height: 60px;">
                <v-col cols="8">
                <SubpageTitle text="实践成长录入" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43>
                </SubpageTitle>
                </v-col>
            </v-row>
        <v-row style="height: 80px;">
            <div
                style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
            <v-col cols="10">
                <span style="margin-left: 30px;">关键字</span>
                <input placeholder="    请输入关键字" v-model="queryItems.keyword"
                    style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                <span style="margin-left: 30px;">学习时间</span>
                <el-date-picker v-model="queryItems.time" type="daterange" range-separator="——"
                                start-placeholder="开始日期" end-placeholder="结束日期"
                                style="width: 20%;margin-left: 20px;" />
                <span style="margin-left: 30px;">关键字</span>
                <input placeholder="    主办单位" v-model="queryItems.name"
                    style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                <span style="margin-left: 30px;">审核状态</span>
                <select v-model="selectedAuditStatusOptin"
                        style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                    <option v-for="option in auditStatusOptins" :key="option.value" :value="option.value">
                    {{ option.label }}
                    </option>
                </select>
                <span style="margin-left: 30px;">级别</span>
                <select v-model="selectedLevelOptions"
                        style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                    <option v-for="option in levelOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                    </option>
                </select>
            </v-col>
            <v-col cols="2">
                <el-button class="redBtn" @click="queryList">查询</el-button>
                <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
            </v-col>
            </div>
        </v-row>
        <v-row style="height: 100px;">
            <div style="padding-top: 10px;display: flex; width: 100%;">
                <v-col cols="10">
                    <el-button class="redBtn" @click="">添加活动信息</el-button>
                    <el-button class="whiteBtn" @click="">删除活动信息</el-button>
                </v-col>
                <v-col cols="2">
                    <AttributeSelection :optionList="colNames" style="display: inline-block; float: right;"
                                        @optionChange=""></AttributeSelection>
                </v-col>
            </div>
        </v-row>
        <v-row class="d-flex flex-column h-100">
            <div class="flex-grow-1 overflow-auto">
                <el-table ref="multipleTable" :data="tableData" max-height="80vh"
                            style="border-radius: 15px;background-color: #F7F7F7;"
                            @selection-change="handleSelectionChange" :row-style="rowStyle"
                            :header-cell-style="headerRowStyle"
                >
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" :width="item.width || ''"  align="center">
                    <template v-slot="scope" v-if="item.type === 'date'">
                        {{ formatTime(scope.row[item.prop]) }}
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </v-row>
        
        <v-row style="background-color: #E9E9E9;">
            <v-col cols="5">
                <el-button type="primary" class="redBtn" size="mini" @click="editRow()">编辑</el-button>
                <el-button type="danger" class="whiteBtn" size="mini" @click="deleteRow()">删除</el-button>
            </v-col>
            <v-col cols="7">
                <div style="display: inline-block;float: right;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList" background
                                :page-size="queryItems.pageSize" layout="total, sizes, prev, pager, next, jumper"
                                :total="tableBottom.totalNum">
                    </el-pagination>
                </div>
            </v-col>
        </v-row>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import { addBranchActivity, deleteSelfActivity, getSelfActivityPage, updateSelfActivity } from '@/http/api';

export default {
    components: {
        SubpageTitle
    },
    emits: ["drawerToggle"],
    data() {
        return {
            columns: [
                { label: '活动编号', prop: 'id' },
                { label: '活动名称', prop: 'activityName' },
                { label: '活动级别', prop: 'activityLevel' },
                { label: '主办单位', prop: 'activitySponsor' },
                { label: '活动时间', prop: 'activityDate' },
                { label: '申请学时', prop: 'appliedStudyHour' },
                { label: '提交时间', prop: 'createTime' },
                { label: '审核状态', prop: 'auditStatus' },
                // { label: '审核时间', prop: 'auditTime' },
                { label: '审核时间', prop: 'updateTime' },
                { label: '操作', prop: 'actions',}
            ],
            selectedAuditStatusOptin:"",
            selectedLevelOptions:"",
            auditStatusOptins: [
                { label: '已提交', value: '已提交' },
                { label: '已审核', value: '已审核' },
                { label: '未通过', value: '未通过' }
            ],
            levelOptions: [
                { label: '院级', value: '院级' },
                { label: '校级', value: '校级' },
                { label: '市级', value: '市级' },
                { label: '省级', value: '省级' },
                { label: '国家级', value: '国家级' }
            ],
            selectedRows: [],
            tableData: [],
            queryItems: {
                keyword: '',
                name: '',
                time: [],
                pageSize: 10,
            },
            tableBottom: {
                currentPage: 1,
                pageSizeList: [10, 20, 30, 50],
                totalNum: 0,
            },
        };
    },
    mounted() {
        this.queryList();
    },
    methods: {
        queryList() {
            let data ={
                page: {
                    pageNumber: this.tableBottom.currentPage,
                    pageSize: this.queryItems.pageSize,
                    searchCount: true
                },
                activityName: this.queryItems.keyword,
                activitySponsor: this.queryItems.name,
                auditStatus: this.selectedAuditStatusOptin,
                activityLevel: this.selectedLevelOptions,
            } 
            console.log(data)
            getSelfActivityPage(data).then(res => {
                console.log(res.data)
                this.tableData = res.data.records;
                this.tableBottom.totalNum = res.data.total;
            });
        },
        clearInputMessage() {
            this.queryItems.keyword = '';
            this.queryItems.name = '';
            this.selectedAuditStatusOptin = '';
            this.selectedLevelOptions = '';
            this.queryItems.time = [];
        },
        editRow() {
            if (this.selectedRows.length !== 1) {
                this.$message.warning('请选中一条记录进行编辑');
                return;
            }
            if (this.selectedRows.length === 0) {
                this.$message.warning('请选中要编辑的记录');
                return;
            }
            this.$router.push({ name: 'EditPersonViewJJFZT', params: { id: this.selectedRows[0].id } });
        },
        handleSelectionChange(val) {
            this.selectedRows = val;
        },
        handleSizeChange(size) {
            this.queryItems.pageSize = size;
            this.tableBottom.currentPage = 1;
            this.queryList();
        },
        handleCurrentChange(page) {
            this.tableBottom.currentPage = page;
            this.queryList();
        },

        getTodayDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    },
};
</script>

<style lang="scss">
#data-table .v-table__wrapper {
    height: 100% !important;
}

#data-table .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
    border: 0;
}

#data-table-footer {
    box-shadow: inset 0 1px 0 rgba(var(--v-border-color), var(--v-border-opacity))
}

.redBtn {
    background-color: #C83C23;
    color: #FFFFFF;
    border: 1px solid #C83C23;
}

.whiteBtn {
  background-color: #F7F7F7;
  border-color: #A5A5A5;
  color: #C83C23;
}
</style>