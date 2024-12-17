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
												<v-text-field color="party-2" label="密码" variant="underlined"
													v-model="loginForm.pwd" :rules="rules.passwordRules"
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
										<a @click="unitBtnClick()">统一身份认证</a>
										<v-btn class="text-h6 bg-party-1 text-white" style="height:60px;" elevation="0"
											@click="loginBtnClick()">登录</v-btn>
									</v-row>
								</v-col>
							</v-sheet>
						</v-col>
					</v-row>
				</v-container>
			</v-sheet>
		</div>
	</v-main>
</template>

<script>
import ListCard from '@/components/homepage/ListCard.vue';
import ShowCase from '@/components/homepage/ShowCase.vue';
import ImageCode from '@/components/ImageCode.vue';
import { userLogin,getCaptcha,getXtgg } from '@/http/api';
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
      vertifyForm: true,
      rules: {
        idRules: [value => !!value || "请输入学号"],
        passwordRules: [value => !!value || "请输入密码"],
      },
      xtgg: [],
      needCode: false
    };
  },
  methods: {
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
        if (!response.success) {//登录失败
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 3000
          });
          if (response.data !== null) {
            this.needCode = true;
            this.image = "data:image/png;base64," + response.data;
          }
          return
        }
        let userInfo = response.data;
        login(userInfo);
        if (userInfo.role === '学生') {
          this.$router.push({ name: 'StudentHome', replace: true });
        } else if(userInfo.role === '支部书记'){
          this.$router.push({ name: 'PartyManagerHome', replace: true });
        } else if(userInfo.role === '学校党委' || userInfo.role === '系统管理员'){
          this.$router.push({ name: 'TeacherHome', replace: true });
        }
        this.$message.success('登录成功');
      })
    },
    getXtggV(){
      getXtgg().then(response => {
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

