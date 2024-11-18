import ListCard from '@/components/homepage/ListCard.vue';
import ShowCase from '@/components/homepage/ShowCase.vue';
import ImageCode from '@/components/ImageCode.vue';
import { authentication } from '@/stores/authentication';
import { userLogin,getCaptcha,getCaptchaVerify,getXtgg } from '@/http/api';
import md5 from 'js-md5';


const auth = authentication();
export default {
    components: {
        ListCard,
        ImageCode,
        ShowCase
    },
    data() {
        return {
            loginFail:false,
            imageKey: "",
            image: "",
            vertifyCodeSucc:false,
            loginForm: {
                userNumber: "",
                pwd: "",
                codeKey:"",
                verifyCode: "",
            },
            vertifyForm: true,
            rules: {
                idRules: [value => !!value || "请输入学号"],
                passwordRules: [value => !!value || "请输入密码"],
                vertifyCodeRules: [value => !!value || "请输入验证码"],
            },
            xtgg: [],
        };
    },
    methods: {
        async checkVertify(){
            console.log(this.loginForm.vertifyCode,this.imageKey)
            getCaptchaVerify(this.loginForm.vertifyCode,this.imageKey).then(res=>{
                this.vertifyCodeSucc = res.success
                if(!res.success){
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 3000
                    })
                }
            })
        },
        async loginBtnClick() {
            console.log(this.loginForm)
            //输入框检验
            const isValid = await this.$refs.form.validate()
            console.log(isValid)
            if(!isValid.valid){
                return
            }
            //登录请求发送
            userLogin(this.loginForm).then(response => {
                //console.log(response.data)
                //处理异常信息
                if (!response.success) {//登录失败
                    this.$message({
                        message: response.msg,
                        type: 'error',
                        duration: 3000
                      });
                    return
                }
                let res = response.data
                console.log("登录",res)
                //根据角色进入
                if (res.roleName == "党员学生" || res.roleName == "非党员学生"|| res.roleName == "学生") {
                    auth.authenticate(res.userNumber,res.userId);
                } else if (res.roleName == "支部书记") {
                    auth.authenticateAsTeacher(res.userNumber,res.userId);
                }
                this.$router.push({ name: 'LOGIN_PLACEHOLDER', replace: true });
            })
        },
        goToStudent(){
            auth.authenticate("22351101","22351101");
            this.$router.push({ name: 'LOGIN_PLACEHOLDER', replace: true });
        },
        goToTeacher(){
            auth.authenticateAsTeacher("22351101","22351101");
            this.$router.push({ name: 'LOGIN_PLACEHOLDER', replace: true });
        },
        goToPartyBranchManager(){
            auth.authenticateAsAssociateTeacher("22351101","22351101");
            this.$router.push({ name: 'LOGIN_PLACEHOLDER', replace: true });
        },
        unitBtnClick() {
            auth.authenticateAsTeacher(this.loginForm.username);
            this.$router.push({ name: 'LOGIN_PLACEHOLDER', replace: true });
        },
        getCaptchaV(){
            getCaptcha().then(res=>{
                console.log(res)
                this.image = res.data.image
                this.loginForm.codeKey = res.data.key
            })
        },
        getXtggV(){
            getXtgg().then(response => {
              if (response.success) {
                console.log('请求成功:', response);
                // 提取数据并格式化后存入 xtgg
                this.xtgg = response.data.records.map(record => ({
                  title: record.title,
                  subtitle: record.content,
                  date: record.createTime,
                  url: record.url
                }));
                console.log(this.xtgg)

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
        this.getCaptchaV()
    }

}