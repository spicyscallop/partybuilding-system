<template>
  <div class="selfstudy-form-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑自主学习记录' : '新增自主学习记录' }}</span>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="用户" prop="userId" v-if="!isEdit">
          <el-select
              v-model="form.userId"
              placeholder="请选择用户"
              filterable
              clearable
              style="width: 300px;"
          >
            <el-option
                v-for="user in users"
                :key="user.id"
                :label="`${user.userNumber} - ${user.userName}`"
                :value="user.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动名称" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="申请时间" prop="appliedDate">
          <el-date-picker
              v-model="form.appliedDate"
              type="datetime"
              placeholder="选择日期时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="申请学时" prop="appliedStudyHour">
          <el-input-number v-model="form.appliedStudyHour" :min="0" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="发展阶段" prop="developmentPhase">
          <el-select
              v-model="form.developmentPhase"
              placeholder="请选择发展阶段"
              style="width: 300px;"
          >
            <el-option label="共青团员" value="共青团员" />
            <el-option label="入党申请人" value="入党申请人" />
            <el-option label="积极分子" value="积极分子" />
            <el-option label="发展对象" value="发展对象" />
            <el-option label="预备党员" value="预备党员" />
            <el-option label="正式党员" value="正式党员" />
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select
              v-model="form.type"
              placeholder="请选择类型"
              style="width: 300px;"
          >
            <el-option label="自主学习" value="自主学习" />
            <el-option label="三会一课" value="三会一课" />
          </el-select>
        </el-form-item>

        <!-- 新增审核状态字段，编辑时可见，新增默认 审核中 -->
        <el-form-item label="审核状态" prop="auditStatus">
          <el-select
              v-model="form.auditStatus"
              style="width: 300px;"
          >
            <el-option label="审核中" value="审核中" />
            <el-option label="通过" value="通过" />
            <el-option label="拒绝" value="拒绝" />
          </el-select>
        </el-form-item>
        <!-- 新增审核时间字段，编辑时可见，新增默认当前时间 -->
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker
              v-model="form.auditTime"
              type="datetime"
              placeholder="选择审核时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 300px;"
          />
        </el-form-item>
        <el-form-item style="margin-top: 20px;">
          <el-button type="primary" @click="onSubmit">
            {{ isEdit ? '保存' : '提交' }}
          </el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCurrentUser } from '@/utils/auth';
export default {
  name: 'SelfStudyForm',
  data() {
    return {
      form: {
        id: null,
        userId: null,
        activityName: '',
        appliedDate: null,
        appliedStudyHour: 1,
        developmentPhase: '',
        auditStatus: '审核中',
        auditTime: '',
        type:'自主学习'
      },
      users: [],
      rules: {
        activityName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        appliedDate: [{ required: true, message: '请选择申请时间', trigger: 'change' }],
        appliedStudyHour: [{ required: true, message: '请输入申请学时', trigger: 'change' }],
        developmentPhase: [{ required: true, message: '请选择发展阶段', trigger: 'change' }]
      }
    };
  },
  computed: {
    isEdit() {
      return !!this.form.id;
    }
  },
  created() {
    this.fetchUsers();
    const id = this.$route.query.id;
    const nowStr = this.formatDate(new Date());
    if (id) {
      this.fetchDetail(id);
    } else {
      // 新增操作：默认审核时间为当前
      this.form.appliedDate = nowStr;
      this.form.auditTime = nowStr;
    }
  },
  methods: {

    fetchUsers() {
      const params = {page: {pageNumber: 1, pageSize: 1000}};
      this.$axios.post('/stage/page', params).then(res => {
        const list = res.records || res.data.records;
        this.users = list;
      });
    },
    fetchDetail(id) {
      this.$axios.get(`/selfstudy/getById/${id}`).then(res => {
        const data = res.data;
        this.form = {
          id: data.id,
          userId: data.userId,
          activityName: data.activityName,
          appliedDate: data.appliedDate,
          appliedStudyHour: data.appliedStudyHour,
          developmentPhase: data.developmentPhase,
          auditStatus: data.auditStatus,
          auditTime: data.auditTime,
          type: data.type
        };
      });
    },
    formatDate(date) {
      const pad = n => n.toString().padStart(2, '0');
      const y = date.getFullYear();
      const M = pad(date.getMonth() + 1);
      const d = pad(date.getDate());
      const h = pad(date.getHours());
      const m = pad(date.getMinutes());
      const s = pad(date.getSeconds());
      return `${y}-${M}-${d} ${h}:${m}:${s}`;
    },
    onSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        const payload = {...this.form};
        const request = this.isEdit
            ? this.$axios.put('/selfstudy', payload)
            : this.$axios.post('/selfstudy', payload);
        request
            .then(() => {
              this.$message.success(this.isEdit ? '保存成功' : '新增成功');
              this.$router.back();
            })
            .catch(() => {
              this.$message.error(this.isEdit ? '保存失败' : '新增失败');
            });
      });
    },
    onCancel() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.selfstudy-form-page {
  padding: 20px;
}

.box-card {

}
</style>
