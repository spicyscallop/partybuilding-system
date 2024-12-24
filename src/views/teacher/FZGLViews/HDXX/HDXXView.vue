<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
      <v-col class="d-flex fill-height flex-column">
        <v-row style="height: 60px;">
          <v-col cols="8">
            <SubpageTitle text="活动信息管理" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43>
            </SubpageTitle>
          </v-col>
        </v-row>
        <v-row style="height: 80px;">
          <div
              style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
            <v-col cols="10">
              <span style="margin-left: 30px;">发展阶段</span>
              <el-select v-model="form.stage" placeholder="请选择" style=" margin-left:10px;height: 30px;font-size: 12px; width: 20%;">
                <el-option v-for="item in stageOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
              <span style="margin-left: 30px;">活动时间</span>
              <el-select v-model="form.activetime" placeholder="请选择" style=" margin-left:10px;height: 30px;font-size: 12px; width: 20%;">
                <el-option v-for="item in activetimeOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
              <span style="margin-left: 30px;">活动编号</span>
              <input placeholder="    请输入活动编号" v-model="queryItems.name"
                     style=" margin-left:10px;background-color: white;font-size: 14px;height: 30px; width: 20%;">
            </v-col>
            <v-col cols="2">
              <el-button class="redBtn" @click="queryList">查询</el-button>
              <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
            </v-col>
          </div>
        </v-row>
        <v-row style="height: 100px;">
          <div style="padding-top: 20px;padding-bottom: 10px;display: flex; width: 100%;">
            <v-col cols="12">
              <el-button class="whiteBtn" style="border-color: #A5A5A5;display: inline-block;float: right;margin-left: 25px;" @click="goToAddPersonView">删除活动信息</el-button>
              <el-button class="redBtn" style="display: inline-block;float: right" @click="batchDialogVisible = true">添加活动信息</el-button>
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
              <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" :width="item.width || ''" align="center">
                <template v-slot="scope" v-if="item.type === 'date'">
                  {{ formatTime(scope.row[item.prop]) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </v-row>
  
        <v-row style="background-color: #E9E9E9;">
          <v-col cols="5">
            <el-checkbox v-model="isAllSelected" @change="handleSelectAll">全选</el-checkbox>
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
          developmentPhase="积极分子"
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
        form: {},
        isAllSelected: false,
        // 发展阶段选项
        stageOptions: [
            {value: '入党申请人', label: '入党申请人'},
            {value: '积极分子', label: '积极分子'},
            {value: '发展对象', label: '发展对象'},
            {value: '预备党员', label: '预备党员'},
            {value: '正式党员', label: '正式党员'},
        ],
        activetimeOptions: [
            {value: '一周内', label: '一周内'},
            {value: '一月内', label: '一月内'},
            {value: '半年内', label: '半年内'},
            {value: '全部', label: '全部'},
        ],
        handleSelectAll(val) {
            this.$refs.multipleTable.clearSelection(); // 清除所有已选项
            if (val) {
                // 如果全选框被勾选
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, true); // 勾选每一行
                });
            }
        },
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
        colNames: ['活动编号', '活动名称', '发展阶段','主办单位','活动时间','活动类型','提交文件/申请学时','状态','通知内容','操作'],
        columns: [
          {
            label: '活动编号',
            prop: 'activityNumber',
          },
          {
            label: '活动名称',
            prop: 'activityName',
          },
          {
            label: '发展阶段',
            prop: 'developmentPhase',
          },
          {
            label: '主办单位',
            prop: 'activitySponsor',
          },
          {
            label: '活动时间',
            prop: 'activityDate',
            type: 'date'
          },
          {
            label: '活动类型',
            prop: 'activityType',
          },
          {
            label: '提交文件/申请学时',
            prop: 'appliedStudyHour',
            width: 200
          },
          {
            label: '状态',
            prop: 'state',
          },
          {
            label: '通知内容',
            prop: 'activistPartyTraining',
          },
          {
            label: '操作',
            width: 200
          },
        ],
        batchDialogVisible: false,
        selectedRows: [],
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedRows = val;
      },
      goToAddPersonView() {
        this.$router.push({ name: 'EditPersonViewJJFZT' });
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
          startActivistsSetTime: this.queryItems.applyTime[0] || null,
          endActivistsSetTime: this.queryItems.applyTime[1] || null,
          developmentPhase:'积极分子'
        };
  
        this.$axios.get('/activities/')
            .then(response => {
              this.tableData = response.data.activities;
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
      this.queryList();
    },
  };
  </script>
  
  
  <style src="../Common.css"></style>