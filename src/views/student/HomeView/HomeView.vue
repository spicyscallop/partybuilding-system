<template>
    <v-container fluid class="ma-0 fill-height bg-white-lighten-3" style="padding:0 20px 0 20px">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
                <v-col>
                    <SubpageTitle text="我的首页" icon="mdi-home" @drawerToggle="$emit('drawerToggle')">
                    
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible; white-space: nowrap;">
                <v-col class="d-flex flex-shrink-0 flex-grow-1 " cols="8">
                    <v-sheet rounded="lg" class="d-flex flex-column justify-space-between bg-grey-lighten-4" style="width: 100%;">
                        <div class="d-flex justify-space-between">
                            <h1 class="ml-5 mt-4 mb-3 text-h5">个人信息</h1>
                            <v-btn @click="editPeosonInfo" class="mt-4 mr-5" append-icon="mdi-chevron-right" variant="plain" rounded
                                style="font-size: 16px;">
                                设置
                            </v-btn>
                        </div>
                        <v-container class="d-flex flex-column flex-grow-1 justify-space-between"
                            style="font-size: 18px;padding:30px 16px">
                            <v-row>
                                <v-col class="d-flex flex-row align-center">
                                    姓名
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.userName }}</v-label>
                                </v-col>
                                <v-col class="d-flex flex-row align-center">
                                    性别
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ sexMap[userInfo.sex] }}</v-label>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="d-flex flex-row align-center">
                                    学号
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.userId }}</v-label>
                                </v-col>
                                <v-col class="d-flex flex-row align-center">
                                    政治面貌
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.politicsStatus }}</v-label>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="d-flex flex-row align-center">
                                    发展阶段
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.developmentPhase
                                        }}</v-label>
                                </v-col>
                                <v-col class="d-flex flex-row align-center">
                                    所在党组织
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.partyBranch }}</v-label>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex" cols="4">
                    <v-sheet rounded="lg" class="d-flex flex-column bg-grey-lighten-4" style="width: 100%;">
                        <div class="d-flex flex-row justify-space-between">
                            <h1 class="ml-5 mt-4 text-h5"></h1>
                            <v-btn @click="viewInfo" class="mt-4 mr-5" append-icon="mdi-chevron-right" variant="plain" rounded
                                style="font-size: 16px;">
                                查看
                            </v-btn>
                        </div>
                        <v-container class="fill-height">
                            <v-row class="fill-height">
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-5"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ centerNumber.allStudyHour }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">培训总时长</label>
                                </v-col>
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-6"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ centerNumber.nowStudyHour }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">当前阶段培训时长</label>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row style="flex-basis: 0;">
                    <UnReadListCard title="未读消息" :list="xtgg"></UnReadListCard>
            </v-row>
        </v-col>

        <v-dialog v-model="dialogVisible" max-width="900">
            <v-card class="pa-0" style="background-color: #e0e0e0;"> <!-- 浅灰色背景 -->
                <!-- 自定义白色内容区域 -->
                <div class="pa-6" style="background-color: #fff; border-radius: 12px;">
                <div v-if="studyList && studyList.length > 0">
                    <v-sheet
                    v-for="(study, index) in studyList"
                    :key="index"
                    class="pa-4 mb-6"
                    elevation="0"
                    style="background-color: transparent;"
                    >
                    <!-- 标题 -->
                    <div class="text-h6 font-weight-medium mb-2">
                        {{ study.activityName }}
                    </div>

                    <div class="text-body-2 text-grey-darken-1">
                        {{ study.subtitle }}
                    </div>

                    <!-- 横向三列，发展阶段、主办单位、时间节点 -->
                    <div class="d-flex flex-wrap text-body-1 mb-4">
                        <div class="mr-10">
                        学习阶段：<span class="text-primary" style="cursor: pointer;">{{ study.developmentPhase }}</span>
                        </div>
                        <div class="mr-10">
                        参加时间：<span class="text-primary" style="cursor: pointer;">{{ study.appliedDate.split(" ")[0] }}</span>
                        </div>
                        <div class="mr-10">
                        培训时长（小时）：<span class="text-primary" style="cursor: pointer;">{{ study.appliedStudyHour }}</span>
                        </div>
                        <div>
                        申请状态：<span class="text-primary" style="cursor: pointer;">{{ study.auditStatus }}</span>
                        </div>
                    </div>
                    </v-sheet>
                </div>
                <div v-else class="text-center py-10">
                    <p>暂无培训记录。</p>
                </div>
                </div>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDialog">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>    

    </v-container>
</template>
  
<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import ListCard from '@/components/ListCard.vue';
import UnReadListCard from '@/components/homepage/UnReadListCard.vue';
import IconParty from '@/components/icons/IconParty.vue';
import IconPhases from '@/views/student/FZJDView/components/IconPhases.vue'
import {getCenterNumber1, getCenterNumber2, getUnreadMessages, getStudyList } from '@/http/api';
import {pageBranches} from '@/http/party';
import { getCurrentUser } from '@/utils/auth';
import { toPre0String } from '@/utils/StringUtils.js'

export default {
    components: {
        IconParty,
        SubpageTitle,
        ListCard,
        UnReadListCard,
        IconPhases
    },
    emits: ["drawerToggle"],
    data() {
        return {
            messages: null,
            userInfo: {
                userName:"郭宗豪",
                sex:1,
                userId:"22351006",
                politicsStatus:"共青团员",
                developmentPhase:"积极分子",
                partyBranch:"电子信息2306党支部"
            },
            dialogVisible: false,
            sexMap: ["未知", "男", "女"],
            centerNumber:{
                nowStudyHour:toPre0String(0,2),
                allStudyHour:toPre0String(0,2)
            },
            xxyb: [
            ],
            xtgg: [
            ],
            studyList:[]
        }
    },
    methods:{
        getUserInfoV(user) { // 根据学号获取个人信息
            if(user){
                console.log('getUserInfo success')
                this.userInfo.userName = user.userName
                this.userInfo.sex = Number(user.sex)
                this.userInfo.userId = user.userNumber
                if (user.isLeague == 0 && user.developmentPhase != "正式党员") {
                    // 值为 0，直接设为群众
                    this.userInfo.politicsStatus = "群众";
                  } else if (user.isLeague == 1) {
                    // 值为 1，继续判断发展阶段
                    const phase = user.developmentPhase;
                    if (phase == "预备党员") {
                      this.userInfo.politicsStatus = "中共预备党员";
                    } else if (phase == "正式党员") {
                      this.userInfo.politicsStatus = "中共党员";
                    } else {
                      // 非党员阶段，默认设为共青团员
                      this.userInfo.politicsStatus = "共青团员";
                    }
                } 
                this.userInfo.developmentPhase = user.developmentPhase
                pageBranches({
                    id:user.partyBranchId,
                    page: {
                        pageNumber: 0,
                        pageSize: 1,
                      },
                }).then(res=>{
                    if(res.code == "200"){
                        this.userInfo.partyBranch = res.data.records[0].branch.branchName
                    }else{
                        this.userInfo.partyBranch = ""
                    }
                })   
            }
            else{
                console.log('getUserInfo fail')
                this.userInfo.userName = ""
                this.userInfo.sex = 0
                this.userInfo.userId = 
                this.userInfo.politicsStatus = ""
                this.userInfo.developmentPhase = ""
                this.userInfo.partyBranch = ""
            }
        },
        getStudyListV(){
            getStudyList().then(res=>{
                console.log(res)
                if(res.code == "200"){
                    this.studyList = res.data
                }
            })
        },
        editPeosonInfo(){
            this.$router.push({path:'/student/setting',query:{userId:this.userInfo.userId}});
        },
        viewInfo(){
            this.dialogVisible = true
        },
        closeDialog(){
            this.dialogVisible = false
        },
        getCenterNumberV(developmentPhase){ // 根据学号获取培训总时长、当前阶段培训时长 接口待完善，请勿删 
            getCenterNumber1().then(res=>{
                if(res.code == "200"){
                    this.centerNumber.allStudyHour = toPre0String(res.data, 2)
                    this.messages = res.messages
                }
                else{
                    this.centerNumber.allStudyHour = toPre0String(0, 2)
                }
            })
            getCenterNumber2(developmentPhase).then(res=>{
                if(res.code == "200"){
                    this.centerNumber.nowStudyHour = toPre0String(res.data, 2)
                    this.messages = res.messages
                }
                else{
                    this.centerNumber.nowStudyHour = toPre0String(0, 2)
                }
            })
        },
        getUnreadMessagesV(userId){ // 获取未读消息
            getUnreadMessages(userId).then(res=>{
                // console.log(res)
                this.code = res.code
                if(res.success){
                    console.log('getUnreadMessages success')
                    this.xtgg = res.data
                    for (const item of this.xtgg) {
                        item.date = item.createTime;
                    }
                }
                else{
                    console.log('getUnreadMessages fail')
                    this.xtgg = [
                        {
                            title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
                            subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学“优秀团员”荣誉称号；推荐22名团干部参评浙江大学“优秀团干部”荣誉称号；推荐3个团支部参评浙江大学“先进团支部”荣誉称号。26名团员被评为软件学院“优秀团员”称号， 17名团员被评为软件学院“优秀团干部”称号。",
                            date: "2023-04-18"
                        },
                    ]
                }
            })
        }
    },
    mounted: function () {
        const user = getCurrentUser();
        this.getUserInfoV(user)
        this.getCenterNumberV(user.developmentPhase)
        this.getUnreadMessagesV(user.userNumber)
        this.getStudyListV()
    },
}
</script>

<style src="./HomeView.css"></style>