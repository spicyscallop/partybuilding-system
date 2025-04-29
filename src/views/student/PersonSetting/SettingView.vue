<template>
    <v-container fluid class="ma-0 fill-height">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="个人设置" icon="mdi-cog" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col cols="6" style="width: 100%;">
                    <SettingInput @update-value="handleName" :readonly="readonly" title="姓名" :isrequire="true"
                        :content="dataForm.name"></SettingInput>
                    <SettingInput @update-value="handleNumberId" :readonly="readonly" title="身份证号"
                        :content="dataForm.numberId"></SettingInput>
                    <SettingInput @update-value="handleEducation" :readonly="readonly" title="学历"
                        :content="dataForm.education"></SettingInput>
                    <SettingInput @update-value="handleStudentId" :readonly="readonly" title="学号"
                        :content="dataForm.userId" :isrequire="true">
                    </SettingInput>
                    <SettingInput @update-value="handleEnrollmentTime" :readonly="readonly" title="入团时间"
                        :content="dataForm.enrollmentTime"></SettingInput>
                    <SettingInput @update-value="handleVolunteer" :readonly="readonly" title="入团志愿书"
                        :content="dataForm.volunteer"></SettingInput>
                    <SettingInput @update-value="handleVolunteerForParty" :readonly="readonly" title="是否递交入党申请书"
                        :content="dataForm.volunteerForParty">
                    </SettingInput>
                    <SettingInput @update-value="handleDevelopmentStage" :readonly="readonly" title="发展阶段"
                        :content="dataForm.developmentPhase"></SettingInput>
                    <SettingInput @update-value="handleEmail" :readonly="readonly" title="电子邮箱" :content="dataForm.email"
                        :isrequire="true">
                    </SettingInput>
                    <SettingInput @update-value="handleWechat" :readonly="readonly" title="微信" :content="dataForm.wechat">
                    </SettingInput>
                </v-col>
                <v-col cols="6" style="width: 100%;">
                    <SettingInput @update-value="handleGender" :readonly="readonly" title="性别" :isrequire="true"
                        :content="dataForm.gender"></SettingInput>
                    <SettingInput @update-value="handleEthnicity" :readonly="readonly" title="民族"
                        :content="dataForm.ethnicity" :isrequire="true">
                    </SettingInput>
                    <SettingInput @update-value="handleStudyStatus" :readonly="readonly" title="在读状况"
                        :content="dataForm.studyStatus"></SettingInput>
                    <SettingInput @update-value="handlePolitics" :readonly="readonly" title="政治面貌"
                        :content="dataForm.politics"></SettingInput>
                    <SettingInput @update-value="handleMembershopNumber" :readonly="readonly" title="团员编号"
                        :content="dataForm.membershopNumber"></SettingInput>
                    <SettingInput :readonly="true" title="" content="&nbsp;"></SettingInput>
                    <SettingInput @update-value="handleDateOfJoiningParty" :readonly="readonly" title="入党时间"
                        :content="dataForm.dateOfJoiningParty"></SettingInput>
                    <SettingInput @update-value="handlePartyOrganization" :readonly="readonly" title="所在党组织"
                        :content="dataForm.partyOrganization"></SettingInput>
                    <SettingInput @update-value="handleQQ" :readonly="readonly" title="QQ" :content="dataForm.QQ">
                    </SettingInput>
                    <SettingInput @update-value="handlePhoneNumber" :readonly="readonly" title="手机号"
                        :content="dataForm.phoneNumber" :isrequire="true">
                    </SettingInput>
                </v-col>
            </v-row>
            <v-row>
                <v-col></v-col>
                <v-col><v-btn @click="goback"
                        style="background-color: #5686F0; width: 80px;height: 30px;color: #ffffff;">返回</v-btn></v-col>
                <v-col v-if="readonly"><v-btn @click="edit"
                        style="background-color: #C83C23; width: 80px;height: 30px;color:#ffffff ">编辑</v-btn></v-col>
                <v-col v-else><v-btn @click="save"
                        style="background-color: #C83C23; width: 80px;height: 30px;color:#ffffff ">保存</v-btn></v-col>
                <v-col></v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import SettingInput from '@/views/student/PersonSetting/component/SettingInput.vue'
import { getPersonDetail, motifyPersonSetting } from '../../../http/api';
import { int2sex, sex2int } from '@/utils/StringUtils.js'

export default {
    components: {
        SettingInput,
        SubpageTitle
    },
    data() {
        return {
            readonly: true,
            dataForm: {
                // name: "郭宗豪",
                // numberId: "330702200012294418",
                // education: "",
                // studentId: "22351006",
                // enrollmentTime: "2019-09-02",
                // volunteer: "已提交",
                // volunteerForParty: "已提交",
                // developmentStage: "入党申请人",
                // email: "709914424@qq.com",
                // wechat: "gzh709914424",
                // gender: "男",
                // ethnicity: "汉族",
                // studyStatus: "正常",
                // politics: "团员",
                // membershopNumber: "12342343124",
                // dateOfJoiningParty: "",
                // partyOrganization: "",
                // QQ: "709914424",
                // phoneNumber: "17357191229"
            }
        }
    },
    methods: {
        updateNewValue(newValue, oldValue) {
            newValue = oldValue
        },
        edit() {
            this.readonly = false
            console.log(this.readonly)
        },
        goback(){
            this.$router.push('/student/home')
        },
        save() {
            console.log("点击了保存")
            this.motifyPersonSettingV()
            this.readonly = true
        },
        handleName(data) {
            this.dataForm.name = data
        },
        handleNumberId(data) {
            this.dataForm.numberId = data
        },
        handleEducation(data) {
            this.dataForm.education = data
        },
        handleStudentId(data) {
            this.dataForm.studentId = data
        },
        handleEnrollmentTime(data) {
            this.dataForm.enrollmentTime = data
        },
        handleVolunteer(data) {
            this.dataForm.volunteer = data
        },
        handleVolunteerForParty(data) {
            this.dataForm.volunteerForParty = data
        },
        handleDevelopmentStage(data) {
            this.dataForm.developmentStage = data
        },
        handleEmail(data) {
            this.dataForm.email = data
        },
        handleWechat(data) {
            this.dataForm.wechat = data
        },
        handleGender(data) {
            this.dataForm.gender = data
        },
        handleEthnicity(data) {
            this.dataForm.ethnicity = data
        },
        handleStudyStatus(data) {
            this.dataForm.studyStatus = data
        },
        handlePolitics(data) {
            this.dataForm.politics = data
        },
        handleMembershopNumber(data) {
            this.dataForm.membershopNumber = data
        },
        handleDateOfJoiningParty(data) {
            this.dataForm.dateOfJoiningParty = data
        },
        handlePartyOrganization(data) {
            this.dataForm.partyOrganization = data
        },
        handleQQ(data) {
            this.dataForm.QQ = data
        },
        handlePhoneNumber(data) {
            this.dataForm.phoneNumber = data
        },
        getPersonDetailV(myId) {
            getPersonDetail(myId).then(res => {
                console.log(res)
                if (res.code == "200") {
                    if (res.data) {
                        this.dataForm.name = res.data.userName || ""; // "霍思远"
                        this.dataForm.numberId = res.data.identityId || ""; // null
                        this.dataForm.userId = res.data.userNumber
                        this.dataForm.education = res.data.qualification || ""; // "本科"
                        this.dataForm.studentId = res.data.userNumber || ""; // "22351097"
                        this.dataForm.enrollmentTime = res.data.leagueJoinTime || ""; // null
                        this.dataForm.volunteer = res.data.isLeague === 1 ? "已提交" : "暂无"; // 根据 isLeague 推断，1 表示已提交
                        this.dataForm.volunteerForParty = res.data.state === "提交入党申请书" ? "已提交" : "未提交"; // 根据 state 推断
                        this.dataForm.developmentPhase = res.data.developmentPhase || ""; // "预备党员"
                        this.dataForm.email = res.data.email || ""; // "22351097@zju.edu.cn"
                        this.dataForm.wechat = "暂无"; // 数据中无微信信息，保持默认值
                        this.dataForm.gender = int2sex(res.data.sex) || ""; // 1 转换为 "男"
                        this.dataForm.ethnicity = res.data.nationality || ""; // "汉族"
                        this.dataForm.studyStatus = res.data.readingStatus || ""; // null
                        this.dataForm.politics = res.data.state || ""; // "提交入党申请书"
                        this.dataForm.membershopNumber = res.data.leagueNum || ""; // null
                        this.dataForm.dateOfJoiningParty = res.data.partyJoinTime || ""; // null
                        this.dataForm.partyOrganization = res.data.branchName || ""; // "软件学院电子信息专业硕士生第十五党支部"
                        this.dataForm.QQ = "暂无"; // 数据中无 QQ 信息，保持默认值
                        this.dataForm.phoneNumber = res.data.phone || ""; // null
                    }
                } else {
                    this.$message({
                        message: "系统异常，请稍后再试",
                        type: 'error',
                        duration: 3000
                    })
                }
            })
        },
        motifyPersonSettingV() {
            let dataFrame = {
                "developmentPhase": this.dataForm.developmentStage, // 对应 res.data.developmentPhase
                "email": this.dataForm.email, // 对应 res.data.email
                "id": this.dataForm.userId, // 不变，保持原样
                "identityId": this.dataForm.numberId, // 对应 res.data.identityId
                "ifApply": this.dataForm.volunteerForParty, // 对应 res.data.state === "提交入党申请书" ? "已提交" : "未提交"
                "leagueJoinTime": this.dataForm.enrollmentTime, // 对应 res.data.leagueJoinTime
                "leagueNum": this.dataForm.membershopNumber, // 对应 res.data.leagueNum
                "nationality": this.dataForm.ethnicity, // 对应 res.data.nationality
                "partyBranch": this.dataForm.partyOrganization, // 对应 res.data.branchName
                "partyJoinTime": this.dataForm.dateOfJoiningParty, // 对应 res.data.partyJoinTime
                "phone": this.dataForm.phoneNumber, // 对应 res.data.phone
                "politicsStatus": this.dataForm.politics, // 对应 res.data.state
                "qualification": this.dataForm.education, // 对应 res.data.qualification
                "readingStatus": this.dataForm.studyStatus, // 对应 res.data.readingStatus
                "sex": sex2int(this.dataForm.gender), 
                "username": this.dataForm.name
            }
            console.log(dataFrame)
            motifyPersonSetting(dataFrame).then(response => {
                console.log(response)
                if (response.success) {
                    this.$message({
                        message: "个人信息修改成功",
                        type: 'info',
                        duration: 2000
                    });
                    this.getPersonDetailV()
                } else {
                    this.$message({
                        message: "个人信息修改失败",
                        type: 'error',
                        duration: 2000
                    });
                }
            })
        },

    },
    watch: {

    },
    mounted() {
        const myId = this.$route.query.userId
        this.getPersonDetailV(myId)
    },
}
</script>