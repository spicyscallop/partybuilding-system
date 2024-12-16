<template>
  <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
    <v-col class="d-flex fill-height flex-column">
      <v-row style="height: 60px;">
        <v-col cols="8">
          <SubpageTitle text="预备党员阶段" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43>
          </SubpageTitle>
        </v-col>
      </v-row>
      <v-row style="height: 80px;">
        <div
            style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
          <v-col cols="10">
            <span style="margin-left: 30px;">学工号</span>
            <input placeholder="    请输入学工号" v-model="queryItems.userId"
                   style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
            <span style="margin-left: 30px;">姓名</span>
            <input placeholder="    请输入姓名" v-model="queryItems.name"
                   style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
            <span style="margin-left: 30px;">预备党员接收时间</span>
            <el-date-picker v-model="queryItems.applyTime" type="daterange" range-separator="——"
                            start-placeholder="开始日期" end-placeholder="结束日期"
                            style="width: 25%;margin-left: 20px;" />
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
            <el-button class="redBtn" style="margin-left: -10px;" @click="batchDialogVisible = true">批量更改发展阶段</el-button>
            <el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="goToAddPersonView">添加人员信息</el-button>
          </v-col>
          <v-col cols="2">
            <AttributeSelection :optionList="colNames" style="display: inline-block;float: right;"
                                @optionChange="changeCheckCols"></AttributeSelection>
          </v-col>
        </div>
      </v-row>
      <v-row class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto">
          <el-table ref="multipleTable" :data="tableData" max-height="80vh"
                    style="border-radius: 15px;background-color: #F7F7F7;"
                    @selection-change="handleSelectionChange" :row-style="rowStyle"
                    :header-cell-style="headerRowStyle" 
                    :key="tableKey"
          >
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column v-for="item in columns" v-show="false" :prop="item.prop" :label="item.label" :width="item.width || ''" align="center">
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
    <BatchManagePhaseDialog
        v-model="batchDialogVisible"
        :value="batchDialogVisible"
        developmentPhase="预备党员"
        @refreshList="queryList"
        @cancalList="closeDialog">
    </BatchManagePhaseDialog>
  </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import BatchManagePhaseDialog from '@/components/dialog/BatchManagePhaseDialog.vue';

export default {
  components: {
    SubpageTitle,
    DropDownBox,
    AttributeSelection,
    BatchManagePhaseDialog
  },
  data() {
    return {
      queryItems: {
        userId: '',
        name: '',
        applyTime: [],
        pageSize: 10,
      },
      tableData: [],
      tableBottom: {
        currentPage: 1,
        pageSizeList: [10, 20, 30, 50],
        totalNum: 0,
      },
      headerRowStyle:{
        backgroundColor: '#F7F7F7',
        color: '#3E3E3E',
      },
      rowStyle:{
        color: '#3E3E3E',
        backgroundColor: '#F7F7F7',
        border: '#2E2E2E'
      },
      colNames: ['学工号', '姓名', '入党介绍人','预备党员接收时间（支部大会）','党委委派谈话时间','支部委员会审查时间','上级党委预审时间'],
      originColumns:[],
      columns: [
        {
          label: '学工号',
          prop: 'userNumber',
        },
        {
          label: '姓名',
          prop: 'userName',
        },
        {
          label: '入党介绍人',
          prop: 'partySponsor',
        },
        {
          label: '预备党员接收时间（支部大会）',
          prop: 'branchPrepareTime',
          type: 'date'
        },
        {
          label: '党委委派谈话时间',
          prop: 'committeeTalk',
          type: 'date'
        },
        {
          label: '支部委员会审查时间',
          prop: 'investigateTime',
          type: 'date',
          width: '300'
        },
        {
          label: '上级党委预审时间',
          prop: 'preliminaryInvestigateTime',
          type: 'date'
        },
      ],
      batchDialogVisible: false,
      selectedRows: [],
      tableKey:0
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    goToAddPersonView() {
      this.$router.push({ name: 'EditPersonViewYBDYT' });
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
      this.$router.push({ name: 'EditPersonViewYBDYT', params: { id: this.selectedRows[0].id } });
    },
    deleteRow() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选中要删除的记录');
        return;
      }
      const ids = this.selectedRows.map(row => row.id);
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/stage/deleteByBatch', ids )
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.queryList();
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
              console.error('删除失败:', error);
            });
      }).catch(() => {
        // 用户取消删除操作
      });
    },
    formatTime(timestamp) {
      if (!timestamp) {
        return '';
      }
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1; // 月份从 0 开始，所以需要加 1
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let formattedDate = `${year}-${month}-${day}`;
      // 如果时、分、秒不全为 00，则添加时间部分
      if (hours !== 0 || minutes !== 0 || seconds !== 0) {
        formattedDate += ` ${hours}:${minutes}:${seconds}`;
      }
      return formattedDate;
    },
    changeCheckCols(indexList){
      let new_columns = [];
      for (let i = 0; i < indexList.length; i++) {
          new_columns.push(this.originColumns[indexList[i]]); 
      }
      this.columns = new_columns;
      // 用于更新表格
      this.tableKey += 1;
    },
    queryList() {
      this.batchDialogVisible = false;
      const data = {
        page: {
          pageNumber: this.tableBottom.currentPage,
          pageSize: this.queryItems.pageSize,
          searchCount: true,
        },
        userNumber: this.queryItems.userId,
        userName: this.queryItems.name,
        startCandidateMemberSetTime: this.queryItems.applyTime[0] || null,
        endCandidateMemberSetTime: this.queryItems.applyTime[1] || null,
        developmentPhase:'预备党员'
      };

      this.$axios.post('/stage/page', data)
          .then(response => {
            this.tableData = response.data.records;
            this.tableBottom.totalNum = response.data.total;
          })
          .catch(error => {
            console.error('请求失败:', error);
          });
    },
    closeDialog(){
      this.batchDialogVisible = false;
    },
    clearInputMessage() {
      this.queryItems.userId = '';
      this.queryItems.name = '';
      this.queryItems.applyTime = [];
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
  },
  mounted() {
    this.originColumns = this.columns;
    this.queryList();
  },
};
</script>


<style src="../Common.css"></style>