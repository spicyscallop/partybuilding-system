import ListCard from '@/components/homepage/ListCard.vue';
import ShowCase from '@/components/homepage/ShowCase.vue';
import ImageCode from '@/components/ImageCode.vue';
import { authentication } from '@/stores/authentication';
import { userLogin,getCaptcha,getCaptchaVerify } from '@/http/api';
import md5 from 'js-md5';
import axios from 'axios';


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
            xtgg: [
                {
                    title: "2024党员发展工作——发展对象的确定和考察（一）",
                    subtitle: "现各党支部以下同学已 具备 “一年以上积极分子培养考察，可列为发展对象”这一条件，请各支部支委严格把关，听取培养联系人、党员和群众意见后，经支委会讨论再慎重确定本支部发展对象名单。",
                    date: "2023-12-15",
                    url: "http://www.cst.zju.edu.cn/36192/list.htm"
                },
            ],
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
        getXtgg(){
            axios.get('/api/systemMessages/page')
            .then(response => {
              if (response.data.success) {
                // 提取数据并格式化后存入 xtgg
                this.xtgg = response.data.data.records.map(record => ({
                  title: record.title,
                  subtitle: record.content,
                  date: record.createTime,
                  url: record.url
                }));
              } else {
                console.error('请求失败:', response.data.msg);
              }
            })
            .catch(error => {
              console.error('请求错误:', error);
            });
        }
    },
    mounted(){
        this.getXtgg()
        this.getCaptchaV()
    }

}