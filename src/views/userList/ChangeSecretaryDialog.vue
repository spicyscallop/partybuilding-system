<template>
  <el-dialog
      title="更改党支部书记"
      v-model="visible"
      width="400px"
      @close="handleClose">
    <el-form :model="form" ref="secretaryForm" label-width="50px">

      <el-form-item label="支部">
        <el-select v-model="form.branchId" placeholder="请选择党支部">
          <el-option
              v-for="branch in branchOptions"
              :key="branch.id"
              :label="branch.branchName"
              :value="branch.id">
          </el-option>
        </el-select>
      </el-form-item>
      <div>如果所选支部，角色更改为支部书记；如果所选党支部，则角色更改党委书记</div>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>

export default {
  name: 'ChangeSecretaryDialog',
  data() {
    return {
      form: {
        userId: '',
        branchId: ''
      },
      visible: false,
      branchOptions: []
    };
  },
  methods: {
    show(id) {
      this.visible = true;
      this.form.userId = id;
      this.fetchBranches();
    },
    fetchBranches() {
      this.$axios.get('/auth/branch/findAllBranches')
          .then(response => {
            this.branchOptions = response.data;
          })
          .catch(error => {
            this.$message.error("获取党支部信息失败");
            console.error(error);
          });
    },
    handleConfirm() {
      if (!this.form.branchId) {
        this.$message.error("请选择党支部");
        return;
      }
      // 构造接口请求参数
      const param = {
        userId: this.form.userId,
        branchId: this.form.branchId
      };
      this.$axios.put('/auth/branch/changeBranchSecretary', param)
          .then(response => {
            this.$message.success("更改书记成功");
            this.handleClose();
            // 可通知父组件刷新数据
            this.$emit('success');
          })
          .catch(error => {
            this.$message.error("更改书记失败");
            console.error(error);
          });
    },
    handleClose() {
      this.$emit('update:visible', false);
      // 重置表单
      this.form.role = '';
      this.form.branchId = '';
      this.visible = false;
    }
  }
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
