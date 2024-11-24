<template>
  <el-dialog
      title="批量管理发展阶段"
      width="600px"
      draggable
      align-center>
    <div style="margin: 0px 20px;">
      <span>选择以下人员</span>
      <div style="width: 100%; height: 300px;">
        <el-table
            :data="tableData"
            :header-row-style="headerRowStyle"
            :row-style="rowStyle"
            @selection-change="handleSelectionChange"
            :header-cell-style="headerRowStyle"
            max-height="300px">
          <el-table-column type="selection" width="30px">
          </el-table-column>
          <el-table-column prop="userNumber" label="学工号" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="isSatify" label="是否满足推优条件" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span>是否选择将上述人员转入下一阶段</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="redBtn" type="primary" @click="changeStuPhase">提交</el-button>
        <el-button class="whiteBtn" @click="closeDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'BatchManagePhaseDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    developmentPhase: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      tableData: [],
      selectedStudents: [],
      headerRowStyle: {
        backgroundColor: '#F5F7FA',
      },
      rowStyle: {
        height: '50px',
      },
    };
  },
  watch: {
    value: {
      handler(val) {
        console.log(val)
        this.dialogVisible = val;
        if (val && this.tableData.length === 0) {
          this.loadTableData();
        }
      },
      immediate: true,
    }
  },
  methods: {
    loadTableData() {
      console.log(this.dialogVisible)
      this.$axios.post('/stage/page', {
        developmentPhase: this.developmentPhase,
        page: {
          searchCount: false,
          pageSize: -1,
        }
      })
        .then(response => {
          console.log(response)
          this.tableData = response.data.records;
        })
        .catch(error => {
          console.error('获取学生列表失败:', error);
        });
    },
    handleSelectionChange(val) {
      this.selectedStudents = val;
    },
    changeStuPhase() {
      if (this.selectedStudents.length === 0) {
        this.$message.warning('请选择要更改的学生！');
        return;
      }

      const ids = this.selectedStudents.map(student => student.id);
      // TODO 待开发
    },
    closeDialog() {
      this.dialogVisible = false;
      this.selectedStudents = [];
    },
  },
};
</script>


<style scoped>
.dialog-footer {
  text-align: right;
}
</style>