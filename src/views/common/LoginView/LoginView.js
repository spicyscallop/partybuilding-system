import ListCard from '@/components/homepage/ListCard.vue';
import ShowCase from '@/components/homepage/ShowCase.vue';
import ImageCode from '@/components/ImageCode.vue';
import { authentication } from '@/stores/authentication';
import { userLogin,getCaptcha,getCaptchaVerify } from '@/http/api';
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
            xtgg: [
                {
                    title: "2024党员发展工作——发展对象的确定和考察（一）",
                    subtitle: "现各党支部以下同学已 具备 “一年以上积极分子培养考察，可列为发展对象”这一条件，请各支部支委严格把关，听取培养联系人、党员和群众意见后，经支委会讨论再慎重确定本支部发展对象名单。",
                    date: "2023-12-15"
                },
                {
                    title: "软件学院关于组织开展2023年秋冬学期推荐优秀团员作入党积极分子的通知",
                    subtitle: "推荐优秀团员作党的发展对象（简称“推优”）是党赋予共青团的一项光荣任务。“推优”制度是团的助手和后备军作用发挥的重大制度安排，是党团血脉联系的组织依托。抓好“推优”工作，是党赋予共青团的重要政治职责，是共青团落实习近平总书记关于青年工作的重要思想的关键举措。现将2023年秋冬学期推荐优秀团员作入党积极分子工作相关事宜说明如下：",
                    date: "2023-10-11"
                },
                {
                    title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
                    subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学“优秀团员”荣誉称号；推荐22名团干部参评浙江大学“优秀团干部”荣誉称号；推荐3个团支部参评浙江大学“先进团支部”荣誉称号。26名团员被评为软件学院“优秀团员”称号， 17名团员被评为软件学院“优秀团干部”称号。具体名单公示见官网",
                    date: "2023-04-18"
                },
                {
                    title: "软件学院团委关于开展2022-2023学年团内评奖评优工作的通知",
                    subtitle: "2022-2023学年，我校各基层团组织、全体团员青年和广大团干部坚持以习近平新时代中国特色社会主义思想为指导，认真学习贯彻党的二十大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧密围绕学校“双一流”建设目标，秉承创新发展理念，在组织建设、思想引领、实践育人、以文化人、学生组织建设等多个方面取得了新突破，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，根据校团委《关于开展2022-2023学年团内评奖评优工作的通知》，现开展2022-2023学年团内评奖评优工作。相关事宜通知见官网。",
                    date: "2023-04-12"
                },
                {
                    title: "2024党员发展工作——发展对象的确定和考察（一）",
                    subtitle: "现各党支部以下同学已 具备 “一年以上积极分子培养考察，可列为发展对象”这一条件，请各支部支委严格把关，听取培养联系人、党员和群众意见后，经支委会讨论再慎重确定本支部发展对象名单。",
                    date: "2023-12-15"
                },
                {
                    title: "软件学院关于组织开展2023年秋冬学期推荐优秀团员作入党积极分子的通知",
                    subtitle: "推荐优秀团员作党的发展对象（简称“推优”）是党赋予共青团的一项光荣任务。“推优”制度是团的助手和后备军作用发挥的重大制度安排，是党团血脉联系的组织依托。抓好“推优”工作，是党赋予共青团的重要政治职责，是共青团落实习近平总书记关于青年工作的重要思想的关键举措。现将2023年秋冬学期推荐优秀团员作入党积极分子工作相关事宜说明如下：",
                    date: "2023-10-11"
                },
                {
                    title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
                    subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学“优秀团员”荣誉称号；推荐22名团干部参评浙江大学“优秀团干部”荣誉称号；推荐3个团支部参评浙江大学“先进团支部”荣誉称号。26名团员被评为软件学院“优秀团员”称号， 17名团员被评为软件学院“优秀团干部”称号。具体名单公示见官网",
                    date: "2023-04-18"
                },
                {
                    title: "软件学院团委关于开展2022-2023学年团内评奖评优工作的通知",
                    subtitle: "2022-2023学年，我校各基层团组织、全体团员青年和广大团干部坚持以习近平新时代中国特色社会主义思想为指导，认真学习贯彻党的二十大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧密围绕学校“双一流”建设目标，秉承创新发展理念，在组织建设、思想引领、实践育人、以文化人、学生组织建设等多个方面取得了新突破，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，根据校团委《关于开展2022-2023学年团内评奖评优工作的通知》，现开展2022-2023学年团内评奖评优工作。相关事宜通知见官网。",
                    date: "2023-04-12"
                },
                {
                    title: "2024党员发展工作——发展对象的确定和考察（一）",
                    subtitle: "现各党支部以下同学已 具备 “一年以上积极分子培养考察，可列为发展对象”这一条件，请各支部支委严格把关，听取培养联系人、党员和群众意见后，经支委会讨论再慎重确定本支部发展对象名单。",
                    date: "2023-12-15"
                },
                {
                    title: "软件学院关于组织开展2023年秋冬学期推荐优秀团员作入党积极分子的通知",
                    subtitle: "推荐优秀团员作党的发展对象（简称“推优”）是党赋予共青团的一项光荣任务。“推优”制度是团的助手和后备军作用发挥的重大制度安排，是党团血脉联系的组织依托。抓好“推优”工作，是党赋予共青团的重要政治职责，是共青团落实习近平总书记关于青年工作的重要思想的关键举措。现将2023年秋冬学期推荐优秀团员作入党积极分子工作相关事宜说明如下：",
                    date: "2023-10-11"
                },
                {
                    title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
                    subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学“优秀团员”荣誉称号；推荐22名团干部参评浙江大学“优秀团干部”荣誉称号；推荐3个团支部参评浙江大学“先进团支部”荣誉称号。26名团员被评为软件学院“优秀团员”称号， 17名团员被评为软件学院“优秀团干部”称号。具体名单公示见官网",
                    date: "2023-04-18"
                },
                {
                    title: "软件学院团委关于开展2022-2023学年团内评奖评优工作的通知",
                    subtitle: "2022-2023学年，我校各基层团组织、全体团员青年和广大团干部坚持以习近平新时代中国特色社会主义思想为指导，认真学习贯彻党的二十大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧密围绕学校“双一流”建设目标，秉承创新发展理念，在组织建设、思想引领、实践育人、以文化人、学生组织建设等多个方面取得了新突破，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，根据校团委《关于开展2022-2023学年团内评奖评优工作的通知》，现开展2022-2023学年团内评奖评优工作。相关事宜通知见官网。",
                    date: "2023-04-12"
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
        }
    },
    mounted(){
        this.getCaptchaV()
    }

}