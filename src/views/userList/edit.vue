<template>
  <div class="edit-stage-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑用户信息</span>
      </div>
      <el-form :model="form" ref="editForm" label-width="200px">
        <!-- 基本信息 -->
        <el-divider content-position="left">基本信息</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="学工号">
              <el-input v-model="form.userNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户姓名">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="form.role" placeholder="请选择角色">
                <el-option label="学生" value="学生"></el-option>
                <el-option label="支部书记" value="支部书记" disabled></el-option>
                <el-option label="学校党委" value="学校党委" disabled></el-option>
                <el-option label="系统管理员" value="系统管理员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option label="未知" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="民族">
              <el-input v-model="form.nationality"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input v-model="form.identityId"></el-input>
            </el-form-item>
            <el-form-item label="学历">
              <el-input v-model="form.qualification"></el-input>
            </el-form-item>
            <el-form-item label="在读状态">
              <el-input v-model="form.readingStatus"></el-input>
            </el-form-item>
            <!-- 修改所在党支部为下拉选择框 -->
            <el-form-item label="所在党支部">
              <el-select v-model="form.partyBranchId" placeholder="请选择党支部">
                <el-option
                    v-for="branch in branchOptions"
                    :key="branch.id"
                    :label="branch.branchName"
                    :value="branch.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="团员编号">
              <el-input v-model="form.leagueNum"></el-input>
            </el-form-item>
            <el-form-item label="入团时间">
              <el-date-picker
                  v-model="form.leagueJoinTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="入党时间">
              <el-date-picker
                  v-model="form.partyJoinTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发展阶段">
              <el-select v-model="form.developmentPhase" placeholder="请选择发展阶段">
                <el-option label="共青团员" value="共青团员"></el-option>
                <el-option label="入党申请人" value="入党申请人"></el-option>
                <el-option label="积极分子" value="积极分子"></el-option>
                <el-option label="发展对象" value="发展对象"></el-option>
                <el-option label="预备党员" value="预备党员"></el-option>
                <el-option label="正式党员" value="正式党员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否共青团员">
              <el-radio-group v-model="form.isLeague">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 其他分组内容保持不变 -->
        <!-- 入党申请阶段 -->
        <el-divider content-position="left">入党申请阶段</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="入党申请书递交时间">
              <el-date-picker
                  v-model="form.deliveryTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="谈话人（申请阶段）">
              <el-input v-model="form.talkApplicantPersonId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入党申请人谈话登记表文件Id">
              <el-input v-model="form.talkRegistrationFileId"></el-input>
            </el-form-item>
            <el-form-item label="《入党申请人-谈话登记表》提交时间">
              <el-date-picker
                  v-model="form.talkApplicantTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 积极分子阶段 -->
        <el-divider content-position="left">积极分子阶段</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="谈话人（积极阶段）">
              <el-input v-model="form.talkActivistPersonId"></el-input>
            </el-form-item>
            <el-form-item label="资格审查时间间隔(天)">
              <el-input-number v-model="form.qualificationInterval" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="是否满足推优条件">
              <el-radio-group v-model="form.isPromote">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="推优时间">
              <el-date-picker
                  v-model="form.promoteTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确定为积极分子时间">
              <el-date-picker
                  v-model="form.activistTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="思想汇报提交时间">
              <el-date-picker
                  v-model="form.thoughtReport"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="培养教育考察登记表提交时间">
              <el-date-picker
                  v-model="form.educationalVisit"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="党校培训班参与时间（积极阶段）">
              <el-date-picker
                  v-model="form.activistPartyTraining"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="培养联系人">
              <el-input v-model="form.cultivateContacts"></el-input>
            </el-form-item>
            <el-form-item label="《入党积极分子-考察登记表》提交时间">
              <el-date-picker
                  v-model="form.talkActivistTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 发展对象阶段 -->
        <el-divider content-position="left">发展对象阶段</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="群众意见调查表提交时间">
              <el-date-picker
                  v-model="form.developmentPublicTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="确定为发展对象时间">
              <el-date-picker
                  v-model="form.confirmTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发展对象备案时间">
              <el-date-picker
                  v-model="form.recordTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="入党介绍人">
              <el-input v-model="form.partySponsor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班主任导师意见征求表提交时间">
              <el-date-picker
                  v-model="form.teacherTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="政治审查表提交时间">
              <el-date-picker
                  v-model="form.politicalReviewTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="党校培训班参与时间（发展阶段）">
              <el-input v-model="form.developPartyTraining"></el-input>
            </el-form-item>
            <el-form-item label="审查时间">
              <el-date-picker
                  v-model="form.investigateTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预审时间">
              <el-date-picker
                  v-model="form.preliminaryInvestigateTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="入党志愿书提交时间">
              <el-date-picker
                  v-model="form.partyApplicationTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 预备党员阶段 -->
        <el-divider content-position="left">预备党员阶段</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预备党员被接受时间">
              <el-date-picker
                  v-model="form.branchPrepareTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="党委派人谈话时间">
              <el-date-picker
                  v-model="form.committeeTalk"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="党委审批时间">
              <el-date-picker
                  v-model="form.examineTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预备党员思想汇报提交时间">
              <el-input v-model="form.prepareThoughtReport"></el-input>
            </el-form-item>
            <el-form-item label="预备党员党校培训班参与时间">
              <el-input v-model="form.preparePartyTraining"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 正式党员阶段 -->
        <el-divider content-position="left">正式党员阶段</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="提出转正申请时间">
              <el-date-picker
                  v-model="form.applyFullTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="群众意见调查表（转正前）提交时间">
              <el-date-picker
                  v-model="form.probationaryPublicTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支部大会(转正)时间">
              <el-date-picker
                  v-model="form.branchFullTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="党委转正审批时间">
              <el-date-picker
                  v-model="form.committeeFullTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="正式党员确定时间">
              <el-date-picker
                  v-model="form.formalMemberConfirmationTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 系统信息 -->
        <el-divider content-position="left">系统信息</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="阶段状态">
              <el-input v-model="form.state"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否删除">
              <el-input v-model="form.isDeleted" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-date-picker
                  v-model="form.createTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新时间">
              <el-date-picker
                  v-model="form.updateTime"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交/取消 -->
        <el-form-item style="text-align: center; margin-top: 20px;">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EditStage',
  data() {
    return {
      form: {
        id: '',
        userNumber: '',
        userName: '',
        role: '',
        sex: 0,
        birthday: '',
        nationality: '',
        address: '',
        identityId: '',
        qualification: '',
        readingStatus: '',
        partyBranchId: '',
        leagueNum: '',
        leagueJoinTime: '',
        phone: '',
        email: '',
        partyJoinTime: '',
        developmentPhase: '',
        isLeague: 0,
        deliveryTime: '',
        talkRegistrationFileId: '',
        talkApplicantPersonId: '',
        talkApplicantTime: '',
        talkActivistPersonId: '',
        qualificationInterval: null,
        isPromote: '',
        promoteTime: '',
        activistTime: '',
        thoughtReport: '',
        educationalVisit: '',
        activistPartyTraining: '',
        cultivateContacts: '',
        developmentPublicTime: '',
        teacherTime: '',
        confirmTime: '',
        recordTime: '',
        partySponsor: '',
        politicalReviewTime: '',
        developPartyTraining: '',
        investigateTime: '',
        preliminaryInvestigateTime: '',
        partyApplicationTime: '',
        branchPrepareTime: '',
        committeeTalk: '',
        examineTime: '',
        prepareThoughtReport: '',
        preparePartyTraining: '',
        applyFullTime: '',
        probationaryPublicTime: '',
        branchFullTime: '',
        committeeFullTime: '',
        state: '',
        createTime: '',
        updateTime: '',
        isDeleted: '',
        talkActivistTime: '',
        formalMemberConfirmationTime: ''
      },
      // 用于存放党支部列表
      branchOptions: []
    };
  },
  created() {
    const id = this.$route.query.id;
    this.fetchStage(id);
    this.fetchBranches();
  },
  methods: {
    fetchStage(id) {
      this.$axios.get(`/stage/get?id=${id}`)
          .then(response => {
            this.form = response.data;
          })
          .catch(error => {
            this.$message.error("获取数据失败");
            console.error(error);
          });
    },
    // 调用接口获取党支部列表
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
    submitForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/stage/update', this.form)
              .then(response => {
                this.$message.success("保存成功");
                this.$router.back()
              })
              .catch(error => {
                this.$message.error("保存失败");
                console.error(error);
              });
        } else {
          this.$message.error("请检查表单输入");
          return false;
        }
      });
    },
    cancelEdit() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.edit-stage-page {
  padding: 20px;
}
.box-card {
  margin: 20px;
}
.el-divider {
  margin: 20px 0;
}
</style>
