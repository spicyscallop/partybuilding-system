<template>
  <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
    <v-col class="d-flex fill-height flex-column">
    <v-row style="height: 60px;">
      <v-col cols="8">
        <SubpageTitle text="预备党员阶段" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43>
        </SubpageTitle>
      </v-col>
    </v-row>

    <!-- 表单内容 -->
    <v-row class="d-flex justify-space-around mb-6" style="height: 10%;background-color: #ffffff;margin-top: 20px;">
      <v-col cols="4">
        <span style="color: red;margin-left: 30px;">*</span><span style="margin-right: 10px;">学工号</span>
        <el-input v-model="form.userNumber" :disabled="isEdit" style="width: 200px;height: 40px;"></el-input>
      </v-col>
      <v-col cols="4">
        <span style="color: red;margin-left: 30px;">*</span><span style="margin-right: 10px;">姓名</span>
        <el-input v-model="form.userName" :disabled="isEdit" style="width: 200px;height: 40px;"></el-input>
      </v-col>
      <v-col cols="4">
        <span style="color: red;">*</span><span style="margin-right: 10px;">团员身份</span>
        <el-select v-model="form.isLeague" placeholder="请选择" size="large" style="width: 200px;height: 40px;" :disabled="isEdit">
          <el-option v-for="item in leagueOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col style="background-color: #f7f7f7; height: 90%;padding: 20px;border-radius: 20px;">
        <!-- 第一行 -->
        <v-row>
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>入党介绍人</span></div>
            <div>
              <el-input v-model="form.partySponsor" placeholder=""
              :disabled="isEdit" style="width: 92%;height: 40px;"></el-input>
            </div>
          </v-col>
          <v-col cols="3" style="padding-left: 30px">
            <div style="margin-bottom: 5px;"><span>支部委员会审查时间</span></div>
            <div>
              <el-date-picker v-model="form.investigateTime" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 90%;"/>
            </div>
          </v-col>
          <v-col cols="3">
            <div style="margin-bottom: 5px;"><span>上级党委预审时间</span></div>
            <div>
              <el-date-picker v-model="form.preliminaryInvestigateTime" type="date" placeholder="yyyy-mm-dd" size="large"
              :disabled="isEdit" style="width: 90%;" disabled/>
            </div>
          </v-col>
        </v-row>
        <!-- 第二行 -->
        <v-row>
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>预备党员接收时间（支部大会）</span></div>
            <div>
              <el-date-picker v-model="form.branchPrepareTime" type="date" placeholder="系统自动接入" size="large"
              :disabled="isEdit" style="width: 90%;" />
            </div>
          </v-col>
          <v-col cols="6" style="padding-left: 30px">
            <div style="margin-bottom: 5px;"><span>《中国共产党入党志愿书》提交时间</span></div>
            <div>
              <el-date-picker v-model="form.politicalReviewTime" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 70%;" />
              <el-button class="fileButton" >查看文件</el-button>
            </div>
          </v-col>
        </v-row>
        <!-- 第三行 -->
        <v-row>
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>党校委派谈话时间</span></div>
            <div>
              <el-date-picker v-model="form.committeeTalk" type="date" placeholder="系统自动接入" size="large"
                              style="width: 90%;" />
            </div>
          </v-col>
          <v-col cols="3" style="padding-left: 30px">
            <div style="margin-bottom: 5px;"><span>思想汇报提交时间</span></div>
            <div>
              <el-date-picker v-model="form.thoughtReport" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 90%;"/>
            </div>
          </v-col>
          <v-col cols="3">
            <div style="margin-bottom: 5px;"><span>下次应提交时间</span></div>
            <div>
              <el-date-picker v-model="form.nextReportTime" type="date" placeholder="系统自动接入" size="large"
              style="width: 90%;" disabled/>
            </div>
          </v-col>
        </v-row>
        <!-- 第四行 -->
        <v-row style="width: 100%;margin-top: 30px;">
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>党委审批时间</span></div>
            <div>
              <el-date-picker v-model="form.examineTime" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 90%;" />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 底部按钮 -->
    <v-row style="height: 20%;width: 100%;">
      <v-col cols="7">
      </v-col>
      <v-col cols="5">
        <el-button class="whiteBtn" type="primary" style="margin-left: 20px; height: 36px; float: right;"
                   @click="onCancel">取消
        </el-button>
        <el-button class="redBtn" type="primary" style="margin-left: 20px; height: 36px;float: right;"
                   @click="onSubmit">
          {{ isEdit ? '保存' : '新增' }}
        </el-button>
      </v-col>
    </v-row>
    </v-col>
  </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
export default {
  components: {
    SubpageTitle,
  },
  data() {
    return {
      // 表单数据
      form: {},
      defaultForm: {},
      // 团员身份选项
      leagueOptions: [
        {value: 1, label: '是'},
        {value: 0, label: '否'},
      ],
      placeholder: '请选择',
      // 入党介绍人对话框相关数据
      userTypes: [
        {value: 'teacher', label: '教师'},
        {value: 'student', label: '学生'},
      ],
      queryItems: {
        userNumber: '',
        userName: '',
        pageSize: 10,
      },
      userTableData: [],
      userTableBottom: {
        currentPage: 1,
        pageSizeList: [10, 20, 30, 50],
        totalNum: 0,
      },
      checkedUsers: [],
      isEdit: false,
    };
  },
  methods: {
    initializeForm() {
      // 初始化表单数据
      this.form = JSON.parse(JSON.stringify(this.defaultForm))
    },
    fetchData() {
      const id = this.$route.params.id;
      if (!id) return;
      this.$axios.get('/stage/get', {params: {id}})
          .then(response => {
            this.form = response.data;
          })
          .catch(error => {
            console.error('获取数据失败:', error);
          });
    },
    // 查询用户列表
    queryUserList() {
      const data = {
        page: {
          pageNumber: this.userTableBottom.currentPage,
          pageSize: this.queryItems.pageSize,
          searchCount: true,
        },
        userNumber: this.queryItems.userNumber,
        userName: this.queryItems.userName,
      };
      // 发送请求获取阶段信息列表
      this.$axios.post('/stage/page', data)
          .then(response => {
            this.userTableData = response.data.records;
            this.userTableBottom.totalNum = response.data.total;
          })
          .catch(error => {
            console.error('请求失败:', error);
          });
    },
    // 清除用户查询条件
    clearUserQuery() {
      this.queryItems.userNumber = '';
      this.queryItems.userName = '';
      this.queryUserList();
    },

    // 处理用户表格选择变化
    handleUserSelectionChange(val) {
      this.checkedUsers = val;
    },
    // 分页变化
    handleUserSizeChange(size) {
      this.queryItems.pageSize = size;
      this.userTableBottom.currentPage = 1;
      this.queryUserList();
    },
    handleUserCurrentChange(page) {
      this.userTableBottom.currentPage = page;
      this.queryUserList();
    },
    onSubmit() {
      const submitData = {...this.form};

      if (this.isEdit) {
        this.$axios.post('/stage/update', submitData)
            .then(response => {
              this.$message.success('更新成功!');
              this.$router.push({name: 'T_YBDY'}); // 替换为您的列表页面路由名称
            })
            .catch(error => {
              this.$message.error('更新失败!');
              console.error('更新失败:', error);
            });
      } else {
        this.$axios.post('/stage/add', {
          ...submitData,
          developmentPhase: '预备党员'
        })
            .then(response => {
              this.$message.success('新增成功!');
              this.$router.push({name: 'T_YBDY'}); // 替换为您的列表页面路由名称
            })
            .catch(error => {
              this.$message.error('新增失败!');
              console.error('新增失败:', error);
            });
      }
    },
    onCancel() {
      this.$router.go(-1);
    },
    // 格式化日期
    formatDate(date) {
      if (!date) return null;
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    // ...其他方法
  },
  mounted() {
    this.isEdit = !!this.$route.params.id;
    if (this.isEdit) {
      this.fetchData();
    } else {
      this.initializeForm();
    }
  },
};
</script>


<style>
.disableInput {
  cursor: not-allowed;
  margin-left: 10px;
  font-size: 15px;
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  /* 外边框样式 */
  border-radius: 5px;
  /* 可选的，添加圆角 */
  background-color: #E3E3E3;
}

.customInput {
  margin-left: 10px;
  background-color: white;
  font-size: 15px;
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  /* 外边框样式 */
  border-radius: 2px;
  /* 可选的，添加圆角 */
}

.fileButton{
  margin-left: 30px;
  height: 40px;
  background-color: #37A0FF;
  color: #ffffff;
}

.el-select {
  --el-select-input-focus-border-color: #red !important;
}

.el-select__placeholder.is-transparent {
  color: #3E3E3E;
}

.el-select-dropdown__item {
  align-self: center;
}

.el-select-dropdown__item.is-hovering {
  background-color: #C83C23;
  color: #fff;
}

.checkFileBtn {
  background-color: #37A0FF;
  border: none;
}

.el-select__wrapper.is-focused.el-tooltip__trigger.el-tooltip__trigger {
  background-color: #F7F7F7;
}

input {
  text-indent: 5px;
}

.v-row{
  margin: -16px;
}
</style>

<style src="@/style/button.css"></style>