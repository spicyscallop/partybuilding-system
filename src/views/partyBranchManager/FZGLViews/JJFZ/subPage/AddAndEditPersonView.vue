<template>
  <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
    <v-col class="d-flex fill-height flex-column">
    <v-row style="height: 60px;">
      <v-col cols="8">
        <SubpageTitle text="积极分子阶段" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43>
        </SubpageTitle>
      </v-col>
      <v-col cols="4">
          <el-select placeholder="支部选择" size="large" disabled
              style="width: 200px;float: right;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div style="display: inline-block; float:right; margin-top: 5px;margin-right: 10px;"><span
                  style="">支部选择</span>
          </div>
          <img src="/src/img/FZJD/支部选择.png" alt="支部选择"
              style=" margin-top: 6px;margin-left:0px;width:23px;height:23px; float:right;">
      </v-col>
    </v-row>
    <!-- 入党介绍人选择对话框 -->
    <el-dialog v-model="dialogVisible" title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;谈话人选择" width="850" height="600"
               draggable align-center>
      <div style="margin: 0px 20px;">
        <v-row>
          <!-- 左侧表格 -->
          <v-col cols="9" style="background-color: white;">
            <div class="flex-grow-1 overflow-auto">
              <!-- 查询条件 -->
              <div
                  style="background-color: #F35339; border-radius: 10px; height: 50px; display: flex; align-items: center; margin-bottom: 10px;">
                <span style="color: #ffffff;margin: 0 20px;font-size: 16px;">查询条件</span>
                <el-input v-model="queryItems.userNumber" placeholder="请输入学工号" size="normal"
                          style="width: 200px;margin: 0 10px;"></el-input>
                <el-input v-model="queryItems.userName" placeholder="请输入姓名" size="normal"
                          style="width: 200px;margin: 0 10px;"></el-input>
                <el-button class="redBtn" size="normal" type="primary" style="margin-left: 30px" @click="queryUserList">
                  查询
                </el-button>
                <el-button class="whiteBtn" size="normal" @click="clearUserQuery">清除</el-button>
              </div>
              <!-- 用户列表表格 -->
              <el-table ref="multipleTable" :data="userTableData" max-height="400" :key="tableKey"
                        style="border-radius: 15px;background-color: #F7F7F7;"
                        @selection-change="handleUserSelectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="userNumber" label="学工号" align='center'>
                </el-table-column>
                <el-table-column prop="userName" label="姓名" align='center'>
                </el-table-column>
                <!-- 如果有其他字段，可以在此添加 -->
              </el-table>
              <!-- 分页 -->
              <div style="display: inline-block;margin-top: 10px;">
                <el-pagination @size-change="handleUserSizeChange" @current-change="handleUserCurrentChange"
                               :current-page="userTableBottom.currentPage" :page-sizes="userTableBottom.pageSizeList"
                               background
                               :page-size="queryItems.pageSize" small :pager-count="3"
                               layout="total, sizes, prev, pager, next, jumper" :total="userTableBottom.totalNum">
                </el-pagination>
              </div>
            </div>
          </v-col>
          <!-- 右侧已选人员 -->
          <v-col cols="3" style="background-color: white;">
            <v-row style="margin-top: 20px;margin-left: 3px;">
              <span>已选人员(</span>
              <span style="color: #2B99FF;">{{ checkedUsers.length }}</span>
              <span>)</span>
            </v-row>
            <v-row>
              <el-table :data="checkedUsers" style="width: 100%" max-height="250">
                <el-table-column prop="userName" label="姓名"/>
                <el-table-column prop="phoneNumber" label="手机号码" width="120"/>
              </el-table>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="redBtn" type="primary" @click="chooseUsers">提交</el-button>
          <el-button class="whiteBtn" @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>

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
            <div style="margin-bottom: 5px;"><span>积极分子推优时间</span></div>
            <div>
              <el-date-picker v-model="form.promoteTime" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 90%;"/>
            </div>
          </v-col>
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>《入党积极分子培养教育考察登记表》提交时间</span></div>
            <div>
              <el-date-picker v-model="form.talkActivistTime" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 90%;"/>
            </div>
          </v-col>
        </v-row>
        <!-- 第二行 -->
        <v-row>
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>积极分子确认时间</span></div>
            <div>
              <el-date-picker v-model="form.activistTime" type="date" placeholder="yyyy-mm-dd" size="large"
                              style="width: 90%;" />
            </div>
          </v-col>
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>积极分子培训班参与时间</span></div>
            <div>
              <el-date-picker v-model="form.activistPartyTraining" type="date" placeholder="系统自动接入" size="large"
                              style="width: 90%;" />
            </div>
          </v-col>
        </v-row>
        <!-- 第三行 -->
        <v-row style="width: 100%;margin-top: 30px;">
          <v-col cols="6">
            <div style="margin-bottom: 5px;"><span>培养联系人</span></div>
            <div>
              <el-input v-model="form.cultivateContacts" placeholder="" @click="openDialog" 
                        style="width: 92%;height: 40px;"></el-input>
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
      options:[
        { label: '第一党支部', value: '第一党支部' },
        { label: '第二党支部', value: '第二党支部' },
        { label: '第三党支部', value: '第三党支部' },
        { label: '第四党支部', value: '第四党支部' }],
      placeholder: '请选择',
      // 入党介绍人对话框相关数据
      dialogVisible: false,
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
    openDialog() {
      this.dialogVisible = true;
      this.queryUserList();
    },
    // 查询用户列表
    queryUserList() {
      const data = {
        page: {
          pageNumber: this.userTableBottom.currentPage,
          size: this.queryItems.pageSize,
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
    // 选择入党介绍人
    chooseUsers() {
      if (this.checkedUsers.length > 0) {
        this.form.cultivateContacts = this.checkedUsers.map(user => user.userName).join(', ');
        this.dialogVisible = false;
      } else {
        this.$message({
          type: 'warning',
          message: '请选择至少一名人员！'
        });
      }
    },
    onSubmit() {
      const submitData = {...this.form};

      if (this.isEdit) {
        this.$axios.post('/stage/update', submitData)
            .then(response => {
              this.$message.success('更新成功!');
              this.$router.push({name: 'P_JJFZ'}); // 替换为您的列表页面路由名称
            })
            .catch(error => {
              this.$message.error('更新失败!');
              console.error('更新失败:', error);
            });
      } else {
        this.$axios.post('/stage/add', {
          ...submitData,
          developmentPhase: '积极分子'
        })
            .then(response => {
              this.$message.success('新增成功!');
              this.$router.push({name: 'P_JJFZ'}); // 替换为您的列表页面路由名称
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