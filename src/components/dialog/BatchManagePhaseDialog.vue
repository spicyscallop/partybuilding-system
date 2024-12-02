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
          <el-table-column prop="isSatisfy" label="是否满足推优条件" align="center">
            <template v-slot="scope">
              {{ scope.row.isSatisfy ? '是' : '否' }}
            </template>
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
        this.dialogVisible = val;
        if (val) {     //这里去掉了 this.tableData.length === 0 的条件，是为了修正转阶段后，再次点击转阶段时，数据没有刷新的bug
          this.loadTableData();
        }
      },
      immediate: true,
    }
  },
  methods: {
    loadTableData() {
      this.$axios.post('/stage/pageStateTransition', {
        developmentPhase: this.developmentPhase,
        page: {
          searchCount: false,
          pageSize: -1,
        }
      })
          .then(response => {
            this.tableData = response.data.records;
          })
          .catch(error => {
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

      this.$confirm('确定要修改学生的阶段吗？', '确认修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
          .then(() => {
            // 用户点击确定后执行的逻辑
            this.$axios.post('/stage/updateStageTransition', this.selectedStudents)
                .then(response => {
                  this.$message.success('更新成功');
                  this.$emit('refreshList');
                })
                .catch(error => {
                  this.$message.error('更新学生列表失败');
                });
          })
          .catch(() => {
            // 用户点击取消后，什么都不做
            this.$message.info('取消修改'); // 弹出取消提示
          });
    },
    closeDialog() {
      this.$emit('cancalList');
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