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
                        :content="dataForm.studentId" :isrequire="true">
                    </SettingInput>
                    <SettingInput @update-value="handleEnrollmentTime" :readonly="readonly" title="入团时间"
                        :content="dataForm.enrollmentTime"></SettingInput>
                    <SettingInput @update-value="handleVolunteer" :readonly="readonly" title="入团志愿书"
                        :content="dataForm.volunteer"></SettingInput>
                    <SettingInput @update-value="handleVolunteerForParty" :readonly="readonly" title="是否递交入党申请书"
                        :content="dataForm.volunteerForParty">
                    </SettingInput>
                    <SettingInput @update-value="handleDevelopmentStage" :readonly="readonly" title="发展阶段"
                        :content="dataForm.developmentStage"></SettingInput>
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
                <v-col><v-btn @click="edit"
                        style="background-color: #5686F0; width: 80px;height: 30px;color: #ffffff;">编辑</v-btn></v-col>
                <v-col><v-btn @click="save"
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
import { authentication } from '../../../stores/authentication';
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
        getPersonDetailV() {
            const auth = authentication()
            getPersonDetail(auth.userId).then(res => {
                // console.log(res.userId)
                if (res.success) {
                    if (res.data.length != 0) {
                        this.dataForm.name = res.data[0].username
                        this.dataForm.numberId = res.data[0].identityId
                        this.dataForm.education = res.data[0].qualification
                        this.dataForm.studentId = res.data[0].userNumber
                        this.dataForm.enrollmentTime = res.data[0].leagueJoinTime
                        this.dataForm.volunteer = "暂无"
                        this.dataForm.volunteerForParty = res.data[0].ifApply
                        this.dataForm.developmentStage = res.data[0].developmentPhase
                        this.dataForm.email = res.data[0].email
                        this.dataForm.wechat = "暂无"
                        this.dataForm.sex = int2sex(res.data[0].sex)
                        this.dataForm.nationality = res.data[0].nationality
                        this.dataForm.readingStatus = res.data[0].readingStatus
                        this.dataForm.politicsStatus = res.data[0].politicsStatus
                        this.dataForm.leagueNum = res.data[0].leagueNum
                        this.dataForm.partyJoinTime = res.data[0].partyJoinTime
                        this.dataForm.partyBranch = res.data[0].partyBranch
                        this.dataForm.QQ = "暂无"
                        this.dataForm.phoneNumber = res.data[0].phone
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
            const auth = authentication()
            let dataFrame = {
                "developmentPhase": this.dataForm.developmentStage,
                "email": this.dataForm.email,
                "id": auth.userId,
                "identityId": this.dataForm.numberId,
                "ifApply": this.dataForm.volunteerForParty,
                "leagueJoinTime": this.dataForm.enrollmentTime,
                "leagueNum": this.dataForm.leagueNum,
                "nationality": this.dataForm.nationality,
                "partyBranch": this.dataForm.partyBranch,
                "partyJoinTime": this.dataForm.partyJoinTime,
                "phone": this.dataForm.phoneNumber,
                "politicsStatus": this.dataForm.politicsStatus,
                "qualification": this.dataForm.education,
                "readingStatus": this.dataForm.readingStatus,
                "sex": sex2int(this.dataForm.sex),
                "username": this.dataForm.name
            }
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
        this.getPersonDetailV()

    },
}
</script>