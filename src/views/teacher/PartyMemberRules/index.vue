<template>
  <div class="party-member-rules-page">
    <el-card style="width: 100%;height: 100%">
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>
      <el-form :model="form" label-width="220px">
        <el-form-item label="入党申请书落款时间与推优时间间隔(月)">
          <el-input-number v-model="form.talkToRecommendationInterval " :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="积极分子到发展对象间隔(月)">
          <el-input-number v-model="form.activistToCandidateInterval " :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="预备党员到正式党员间隔(月)">
          <el-input-number v-model="form.probationToFullMemberInterval " :min="1"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PartyMemberRules',
  data() {
    return {
      form: {
        talkToRecommendationInterval : 3,
        activistToCandidateInterval : 12,
        probationToFullMemberInterval : 12,
      },
    };
  },
  methods: {
    fetchData() {
      this.$axios
          .get('/partyMemberRules/get')
          .then((res) => {
            if (res.code === "200") {
              this.form = res.data;
            } else {
              this.$message.error(res.msg || '获取数据失败');
            }
          })
          .catch(() => {
            this.$message.error('接口请求异常');
          });
    },
    submitForm() {
      this.$axios
          .post('/partyMemberRules/update', this.form)
          .then((res) => {
            if (res.code === "200") {
              this.$message.success('修改成功');
            } else {
              this.$message.error(res.msg || '修改失败');
            }
          })
          .catch(() => {
            this.$message.error('接口请求异常');
          });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.party-member-rules-page {
  padding: 20px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}
</style>
