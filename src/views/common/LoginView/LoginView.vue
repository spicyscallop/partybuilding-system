<template>
	<v-main>
		<div class="d-flex flex-column justify-center align-center fill-height overflow-hidden bg-grey-lighten-5">
			<h1 class="text-h4">CST智慧党建系统</h1>
			<v-sheet class="bg-grey-lighten-5" style="width: 100%;height: 700px;">
				<v-container class="d-flex flex-column fill-height" style="width: 100%;">
					<v-row class="d-flex d-sm-none align-center">
						<div class="mx-5">
							<h1 class="text-h4">请使用桌面设备访问</h1>
							<h1 class="text-h5 text-grey">或将移动设备横置使用</h1>
						</div>
					</v-row>
					<v-row class="d-none d-sm-flex flex-grow-1 flex-shrink-0" style="flex-basis: 0; width: 100%;">
						<v-col class="bg-grey-lighten-4">
							<div class="bg-grey-lighten-4" style="height: 50%;background-color:yellow;">
								<ListCard class="fill-height" title="系统公告" :list="xtgg" moreLink="/xtgg"></ListCard>
							</div>
							<hr color="grey">
							<div class="bg-grey-lighten-4" style="height: 50%;background-color: red;">
								<ShowCase class="fill-height" title="风采展示"></ShowCase>
							</div>
						</v-col>
						<v-col class="bg-grey-lighten-3">
							<v-sheet class="flex-grow-1 fill-height px-8 py-10 bg-grey-lighten-3"
								style="overflow: auto;">
                <template v-if="!isResetPwd">
                  <v-col class="d-flex flex-column fill-height">
                    <v-row class="flex-grow-0 flex-shrink-1 justify-center">
                      <h1 class="text-h4 mt-5">账号登录</h1>
                    </v-row>
                    <v-row class="d-flex flex-grow-1 align-center">
                      <v-col>
                        <v-form ref="form" fast-fail @submit.prevent>
                          <v-text-field color="party-2" label="账号" variant="underlined"
                                        v-model="loginForm.userNumber" :rules="rules.idRules"
                                        type="text"></v-text-field>
                          <v-text-field color="party-2" label="默认密码为学号" variant="underlined"
                                        v-model="loginForm.pwd" :rules="rules.passwordRules"
                                        :type="showLoginPassword ? 'text' : 'password'"
                                        :append-icon="showLoginPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append="showLoginPassword = !showLoginPassword"
                                        type="password"></v-text-field>
                          <div ref="verifyForm" style="display: flex; align-items: center;">
                            <v-text-field color="party-2" label="验证码" variant="underlined"
                                          v-model="loginForm.verifyCode" v-if="needCode"
                                          type="text" style="width: 60%;"></v-text-field>
                            <img class="mb-6" v-bind:src="image" @click="refreshCode()">
                          </div>
                        </v-form>
                      </v-col>
                    </v-row>
                    <v-row class="d-flex flex-column flex-grow-1 flex-shrink-1">
                      <a @click="isResetPwd = !isResetPwd">重置密码</a>
                      <v-btn class="text-h6 bg-party-1 text-white" style="height:60px;" elevation="0"
                             @click="loginBtnClick()">登录</v-btn>
                    </v-row>
                  </v-col>
                </template>
                <template v-else>
                  <v-col class="d-flex flex-column fill-height">
                    <v-row class="flex-grow-0 flex-shrink-1 justify-center">
                      <h1 class="text-h4 mt-5">密码重置</h1>
                    </v-row>
                    <v-row class="d-flex flex-grow-1 align-center">
                      <v-col>
                        <v-form ref="resetFormRef" fast-fail @submit.prevent>
                          <v-text-field color="party-2" label="账号" variant="underlined"
                                        v-model="resetForm.userNumber" :rules="rules.idRules"
                                        type="text"></v-text-field>
                          <v-text-field color="party-2" label="老密码" variant="underlined"
                                        v-model="resetForm.oldPwd" :rules="rules.passwordRules"
                                        :type="showResetLoginOldPassword ? 'text' : 'password'"
                                        :append-icon="showResetLoginOldPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append="showResetLoginOldPassword = !showResetLoginOldPassword"
                                        type="password"></v-text-field>
                          <v-text-field color="party-2" label="新密码" variant="underlined"
                                        v-model="resetForm.pwd" :rules="rules.passwordRules"
                                        :type="showResetLoginPassword ? 'text' : 'password'"
                                        :append-icon="showResetLoginPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append="showResetLoginPassword = !showResetLoginPassword"
                                        type="password"></v-text-field>
                          <div ref="verifyForm" style="display: flex; align-items: center;">
                            <v-text-field color="party-2" label="验证码" variant="underlined"
                                          v-model="resetForm.verifyCode" v-if="needCode"
                                          type="text" style="width: 60%;"></v-text-field>
                            <img class="mb-6" v-bind:src="image" @click="refreshCode()">
                          </div>
                        </v-form>
                      </v-col>
                    </v-row>
                    <v-row class="d-flex flex-column flex-grow-1 flex-shrink-1">
                      <a @click="isResetPwd = !isResetPwd">返回登录</a>
                      <v-btn class="text-h6 bg-party-1 text-white" style="height:60px;" elevation="0"
                             @click="resetPwdClick()">重置</v-btn>
                    </v-row>
                  </v-col>
                </template>
							</v-sheet>
						</v-col>
					</v-row>
				</v-container>
			</v-sheet>
		</div>

    <el-dialog
      title="重置密码"
      v-model="isJumpReset"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false">
      你的密码较弱，是否立即重置密码？
      <template #footer>
        <el-button @click="resetQuick">立即重置</el-button>
        <el-button type="primary" @click="loginQuick">稍后重置 立即登录</el-button>
      </template>
    </el-dialog>
	</v-main>
</template>

<script>
import ListCard from '@/components/homepage/ListCard.vue';
import ShowCase from '@/components/homepage/ShowCase.vue';
import ImageCode from '@/components/ImageCode.vue';
import {userLogin, getCaptcha, resetPwd} from '@/http/api';
import { getXtggInfo } from "@/http/party"
import { login } from '@/utils/auth';
export default {
  components: {
    ListCard,
    ImageCode,
    ShowCase
  },
  data() {
    return {
      loginFail:false,
      image: "",
      loginForm: {
        userNumber: "",
        pwd: "",
        verifyCode: "",
      },
      resetForm: {
        userNumber: '',
        oldPwd: '',
        pwd: '',
        verifyCode: ''
      },
      vertifyForm: true,
      rules: {
        idRules: [value => !!value || "请输入学号"],
        passwordRules: [value => !!value || "请输入密码"],
      },
      xtgg: [],
      needCode: false,
      isResetPwd: false,
      showLoginPassword: false,
      showResetLoginPassword: false,
      showResetLoginOldPassword: false,
      isJumpReset: false,
      loginSuccessData: null
    };
  },
  methods: {
    async resetPwdClick() {
      const isValid = await this.$refs.resetFormRef.validate();
      if (!isValid.valid) return;
      resetPwd(this.resetForm)
          .then(response => {
            if (response.success) {
              this.$message.success('重置成功');
              this.isResetPwd = false;
            } else {
              if (response.data) this.resetImage = 'data:image/png;base64,' + response.data;
            }
          })
          .catch((response)=>{
            if (!response.success) {
              if (response.data !== null) {
                this.needCode = true;
                this.image = "data:image/png;base64," + response.data;
              }
            }
          })
    },
    refreshCode() {
      if (this.loginForm.userNumber == "") {
        this.$message({
          message: "请输入学号",
          type: 'warn',
          duration: 3000
        });
        return
      }
      getCaptcha(this.loginForm).then(response => {
        if (response.success) {
          this.image = "data:image/png;base64," + response.data;
        } else {
          console.error('请求失败:', response);
        }
      })
          .catch(error => {
            console.error('请求错误:', error);
          });
    },
    loginQuick() {
      let userInfo = this.loginSuccessData;
      login(userInfo);
      if (userInfo.role === '学生') {
        this.$router.push({ name: 'StudentHome', replace: true });
      } else if(userInfo.role === '支部书记'){
        this.$router.push({ name: 'PartyManagerHome', replace: true });
      } else if(userInfo.role === '学校党委' || userInfo.role === '系统管理员'){
        this.$router.push({ name: 'TeacherHome', replace: true });
      }
      this.isJumpReset = false;
    },
    resetQuick() {
      this.isResetPwd = true;
      this.resetForm.userNumber = this.loginForm.userNumber;
      this.resetForm.oldPwd = this.loginForm.pwd;
      this.isJumpReset = false;
    },
    async loginBtnClick() {
      //输入框检验
      const isValid = await this.$refs.form.validate()
      if(!isValid.valid){
        return
      }
      if (this.needCode && (!this.loginForm.verifyCode || !this.loginForm.verifyCode.length)) {
        this.$message({
          message: "验证码不能为空",
          type: 'warn',
          duration: 3000
        });
        return
      }
      //登录请求发送
      userLogin(this.loginForm).then(response => {
        //处理异常信息
        if (response.data.needRestPwd) {
          this.loginSuccessData = response.data;
          // 提示是否立即重置密码
          this.isJumpReset = true;
        } else {
          this.loginSuccessData = response.data;
          this.loginQuick();
        }
        this.$message.success('登录成功');

      }).catch((response)=>{
        if (!response.success) {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 3000
          });
          if (response.data !== null) {
            this.needCode = true;
            this.image = "data:image/png;base64," + response.data;
          }
        }
      })
    },
    getXtggV(){
      getXtggInfo({page: {}}).then(response => {
        if (response.success) {
          // 提取数据并格式化后存入 xtgg
          this.xtgg = response.data.records.map(record => ({
            title: record.title,
            subtitle: record.content,
            date: record.createTime,
            url: record.url
          }));
        } else {
          console.error('请求失败:', response);
        }
      })
          .catch(error => {
            console.error('请求错误:', error);
          });
    }
  },
  mounted(){
    this.getXtggV()
  }

}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.cn/css?family=Noto+Sans+SC&display=swap');
</style>

