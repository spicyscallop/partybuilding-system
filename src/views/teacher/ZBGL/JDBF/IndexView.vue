<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
      <v-col class="d-flex fill-height flex-column">
        <v-row style="height: 60px;">
          <v-col cols="8">
            <SubpageTitle text="结对帮扶录入" svg="/src/img/ZBGL/jdbf.svg" :width=43 :height=43>
            </SubpageTitle>
          </v-col>
        </v-row>
        <v-row style="height: 80px;">
          <div
              style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
            <v-col cols="10">
              <span style="margin-left: 30px;">关键字</span>
              <input placeholder="    请输入关键字" v-model="queryItems.keyword"
                     style=" margin-left:10px;background-color: white;font-size: 14px;height: 30px; width: 20%;">
              
              <span style="margin-left: 30px;">活动时间</span>
              <el-date-picker
                v-model="startDate"
                type="date"
                placeholder="开始日期"
                style="margin-left:10px;width: 15%;"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
              <span style="margin-left: 10px;">至</span>
              <el-date-picker
                v-model="endDate"
                type="date"
                placeholder="结束日期"
                style="margin-left:10px;width: 15%;"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
              
              <span style="margin-left: 30px;">审核状态</span>
              <el-select v-model="queryItems.state" placeholder="请选择" style="margin-left:10px;width: 15%;">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </v-col>
            <v-col cols="2">
              <el-button class="redBtn" @click="queryList">查询</el-button>
              <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
            </v-col>
          </div>
        </v-row>
        <v-row style="height: 100px;">
          <div style="padding-top: 20px; padding-bottom: 10px; width: 100%;">
            <v-row>
              <v-col cols="10">
                <el-button class="redBtn" style="margin-left: 10px; margin-right: 10px;" @click="addActivity">添加活动信息</el-button>
                <el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="deleteRow()">删除活动信息</el-button>
              </v-col>
              <v-col cols="2">
                <AttributeSelection :optionList="colNames" style="display: inline-block; float: right;"
                                  @optionChange="changeCheckCols"></AttributeSelection>
              </v-col>
            </v-row>
          </div>
        </v-row>
        <v-row class="d-flex flex-column h-100">
          <div class="flex-grow-1 overflow-auto">
            <el-table ref="multipleTable" :data="tableData" max-height="80vh"
                      :key="tableKey"
                      style="border-radius: 15px;background-color: #F7F7F7;"
                      @selection-change="handleSelectionChange" :row-style="rowStyle"
                      :header-cell-style="headerRowStyle">
              <el-table-column type="selection" width="40">
              </el-table-column>
              <el-table-column prop="activityNumber" label="活动编号" align="center">
              </el-table-column>
              <el-table-column prop="activityName" label="活动名称" align="center">
              </el-table-column>
              <el-table-column prop="helpPerson" label="帮扶者" align="center">
              </el-table-column>
              <el-table-column prop="helpTarget" label="帮扶对象" align="center">
              </el-table-column>
              <el-table-column prop="helpTime" label="帮扶时间" align="center">
                <template #default="scope">
                  {{ formatTime(scope.row.helpTime) }}
                </template>
              </el-table-column>
              <el-table-column prop="applyDuration" label="申请时长" align="center">
              </el-table-column>
              <el-table-column prop="submitFiles" label="提交文件" align="center">
              </el-table-column>
              <el-table-column prop="state" label="审核状态" align="center">
              </el-table-column>
              <el-table-column prop="auditTime" label="审核时间" align="center">
                <template #default="scope">
                  {{ formatTime(scope.row.auditTime) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align='center' width="180">
                <template #default="scope">
                  <el-button
                    @click="handleEdit(scope.$index, scope.row)">管理</el-button>
                  <el-button
                    class="redBtn"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                             :page-size="queryItems.page.pageSize" layout="total, sizes, prev, pager, next, jumper"
                             :total="tableBottom.totalNum">
              </el-pagination>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <AddActivitiyDialog
          v-model="batchDialogVisible"
          :value="batchDialogVisible"
          :myEdit="isEdit"
          :form-data="parentForm"
          @refreshList="queryList"
          @cancalList="closeDialog"
          @changeDialog="changeDialog">
      </AddActivitiyDialog>
      <NoticeEditDialog
          v-model="noticeDialogVisible"
          :value="noticeDialogVisible"
          @changeDialog="changeDialog">
      </NoticeEditDialog>
    </v-container>
  </template>
  
  <script>
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import DropDownBox from '@/components/dropDown/DropDownBox.vue';
  import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
  import AddActivitiyDialog from '@/components/dialog/AddActivitiyDialog.vue';
  import NoticeEditDialog from '@/components/dialog/NoticeEditDialog.vue';
  
  export default {
    components: {
      SubpageTitle,
      DropDownBox,
      AttributeSelection,
      AddActivitiyDialog,
      NoticeEditDialog
    },
    data() {
      return {
        form: {},
        isAllSelected: false,
        startDate: '',
        endDate: '',
        stateOptions: [
          { value: '', label: '全部' },
          { value: '待审核', label: '待审核' },
          { value: '已通过', label: '已通过' },
          { value: '已拒绝', label: '已拒绝' }
        ],
        queryItems: {
          keyword: '',
          state: '',
          startTime: '',
          endTime: '',
          page: {
            pageSize: 10,
            pageNumber: 1
          }
        },
        tableData: [],
        parentForm:[],
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
        batchDialogVisible: false,
        noticeDialogVisible: false,
        isEdit: false,
        selectedRows: [],
        colNames: [
          '活动编号', 
          '活动名称', 
          '帮扶者',
          '帮扶对象',
          '帮扶时间',
          '申请时长',
          '提交文件',
          '审核状态',
          '审核时间'
        ],
        originColumns: [],
        tableKey: 0,
      };
    },
    watch: {
      startDate(val) {
        this.queryItems.startTime = val;
      },
      endDate(val) {
        this.queryItems.endTime = val;
      }
    },
    methods: {
      handleSelectAll(val) {
        this.$refs.multipleTable.clearSelection(); // 清除所有已选项
        if (val) {
          // 如果全选框被勾选
          this.tableData.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true); // 勾选每一行
          });
        }
      },
      handleSelectionChange(val) {
        this.selectedRows = val;
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
          this.$axios.post('/activities/deleteByBatch', ids )
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
          return '未设置';
        }
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
        let day = String(date.getDate()).padStart(2, '0'); // 补零
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      },
      queryList() {
        this.batchDialogVisible = false;
        
        // 添加多条测试数据
        const testDataList = [
          {
            id: "1001",
            activityNumber: "JDBF-2023-001",
            activityName: "学业辅导帮扶活动",
            helpPerson: "张三",
            helpTarget: "李四",
            helpTime: new Date("2023-12-15").getTime(),
            applyDuration: "2小时",
            submitFiles: "帮扶记录.pdf",
            state: "已通过",
            auditTime: new Date("2023-12-20").getTime()
          },
          {
            id: "1002",
            activityNumber: "JDBF-2023-002",
            activityName: "心理健康帮扶活动",
            helpPerson: "王五",
            helpTarget: "赵六",
            helpTime: new Date("2023-11-10").getTime(),
            applyDuration: "1.5小时",
            submitFiles: "心理辅导记录.docx",
            state: "待审核",
            auditTime: null
          },
          {
            id: "1003",
            activityNumber: "JDBF-2024-001",
            activityName: "就业指导帮扶",
            helpPerson: "刘七",
            helpTarget: "陈八",
            helpTime: new Date("2024-01-05").getTime(),
            applyDuration: "3小时",
            submitFiles: "就业指导材料.zip",
            state: "已拒绝",
            auditTime: new Date("2024-01-08").getTime()
          }
        ];
        
        this.$axios.post('/activities/pageHelp', this.queryItems)
          .then(response => {
            if (response.code == "200") {
              // 如果后端返回了数据，使用后端数据
              this.tableData = response.data.records;
              this.tableBottom.totalNum = response.data.total;
            }
          })
          .catch(error => {
            console.error('请求失败:', error);
            // 请求失败或后端无数据时，使用测试数据
            this.tableData = testDataList;
            this.tableBottom.totalNum = testDataList.length;
          });
      },
      closeDialog(){
        this.batchDialogVisible = false;
      },
      clearInputMessage() {
        this.queryItems.keyword = '';
        this.queryItems.state = '';
        this.startDate = '';
        this.endDate = '';
        this.queryItems.startTime = '';
        this.queryItems.endTime = '';
      },
      handleSizeChange(size) {
        this.queryItems.page.pageSize = size;
        this.tableBottom.currentPage = 1;
        this.queryList();
      },
      handleCurrentChange(page) {
        this.tableBottom.currentPage = page;
        this.queryItems.page.pageNumber = page;
        this.queryList();
      },
      changeDialog(){
        this.batchDialogVisible = !this.batchDialogVisible
        this.noticeDialogVisible = !this.batchDialogVisible
      },
      handleEdit(index, item){
        this.parentForm = {...item}
        this.isEdit = true
        this.batchDialogVisible = true
      },
      handleDelete(index, item){
        const ids = [item.id]
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/activities/deleteByBatch', ids )
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
      addActivity(){
        this.parentForm = {}
        this.isEdit = false
        this.batchDialogVisible = true
      },
      changeCheckCols(indexList) {
        let new_columns = [];
        for (let i = 0; i < indexList.length; i++) {
          new_columns.push(this.originColumns[indexList[i]]);
        }
        this.columns = new_columns;
        // 用于更新表格
        this.tableKey += 1;
      },
    },
    mounted() {
      this.originColumns = [
        {
          label: '活动编号',
          prop: 'activityNumber',
        },
        {
          label: '活动名称',
          prop: 'activityName',
        },
        {
          label: '帮扶者',
          prop: 'helpPerson',
        },
        {
          label: '帮扶对象',
          prop: 'helpTarget',
        },
        {
          label: '帮扶时间',
          prop: 'helpTime',
          type: 'date'
        },
        {
          label: '申请时长',
          prop: 'applyDuration',
        },
        {
          label: '提交文件',
          prop: 'submitFiles',
        },
        {
          label: '审核状态',
          prop: 'state',
        },
        {
          label: '审核时间',
          prop: 'auditTime',
          type: 'date'
        }
      ];
      this.columns = [...this.originColumns];
      this.queryList();
    },
  };
  </script>
  
  <style src="@/style/Common.css"></style>