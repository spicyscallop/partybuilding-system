<template>
    <v-container fluid class="ma-0 fill-height bg-white-lighten-3" style="padding:0 80px 0 100px">
        <v-col>
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="支部活动" icon="mdi-calendar" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <!-- Main content start here -->
            <v-row>
                <v-col class="fill-height d-flex " style="width: 30%;">
                    <v-sheet rounded="lg" class="d-flex flex-column bg-grey-lighten-4" style="width: 100%;">
                        <div class="d-flex flex-row justify-space-between">
                            <h1 class="ml-5 mt-4 text-h6">年度学时展板</h1>
                        </div>
                        <v-container class="fill-height">
                            <v-row class="fill-height">
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-5"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ allHours }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">年度要求学时</label>
                                </v-col>
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-6"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ Math.max(0, allHours - allStudyHour) }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">年度剩余学时</label>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>


                <v-col class="fill-height d-flex " cols="7">
                    <v-sheet rounded="lg" class="d-flex flex-column bg-grey-lighten-4" style="width: 100%;">
                        <div class="d-flex flex-row justify-space-between">
                            <h1 class="ml-5 mt-4 text-h6">支部活动参加情况</h1>
                        </div>
                        <v-container class="fill-height">
                            <v-row class="fill-height">
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-5"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ activityList.filter(item => item.attendStatus == "已参加").length }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">参加支部活动次数</label>
                                </v-col>
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-6"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ activityList.length}}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">支部活动总次数</label>
                                </v-col>
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-6"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ (100*(activityList.filter(item => item.attendStatus == "已参加").length/activityList.length)).toFixed(0) }}%
                                        </div>
                                    </div>
                                    <label style="font-size:18px">支部活动出勤率</label>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <v-sheet class="d-flex flex-grow-1" rounded="lg">
                    <v-col>
                        <v-row>
                            <h1 class="ml-3 mt-4 text-h6">支部活动参加情况详情:</h1>
                        </v-row>
                    </v-col>
                </v-sheet>
            </v-row>
            <v-row>
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5 bg-grey-color" rounded="lg">
                    <v-col class="d-flex flex-grow-1 flex-column ">
                        <v-row id="data-table" class="mx-3 flex-grow-1 flex-shrink-1 fill-height"
                            style="flex-basis: 0;">
                            <v-col class="pa-0">
                                <v-table fixed-header class="bg-grey-color">
                                    <thead>
                                        <tr>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                序号
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;width: 130px;">
                                                活动时间
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                活动名称
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                活动主办方
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                活动类型
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                参加情况
                                            </th>

                                            <th style="background-color: #f5f5f5;color: black;">
                                                备注
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in activityList" :key="idx">
                                            <td>{{ idx+1 }}</td>
                                            <td>{{ item.activityStartTime }}</td>
                                            <td>{{ item.activityName }}</td>
                                            <td>{{ item.activitySponsor }}</td>
                                            <td>{{ item.activityType }}</td>
                                            <td v-if="item.attendStatus == '已参加'" >{{ item.attendStatus }}</td>
                                            <td v-else style="color:#9a9898">{{ item.attendStatus }}</td>
                                            <td class="blue-color">{{ item.remark }}</td>
                                        </tr>
                                        <!-- <tr style="color: black;">
                                            <td>01</td>
                                            <td>2021-03-10</td>
                                            <td>积极分子培训班</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td>已参加</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr style="color: black;">
                                            <td>02</td>
                                            <td>2021-06-13</td>
                                            <td>党课0613</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td class="grey-color">未参加</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr style="color: black;">
                                            <td>03</td>
                                            <td>2021-08-25</td>
                                            <td>党课0825</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td>已参加</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr style="color: black;">
                                            <td>04</td>
                                            <td>2021-09-15</td>
                                            <td>积极分子培训班</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td>已参加</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr style="color: black;">
                                            <td>05</td>
                                            <td>2022-12-25</td>
                                            <td>积极分子培训班</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td>已参加</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr style="color: black;">
                                            <td>06</td>
                                            <td>2022-03-02</td>
                                            <td>党课0302</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td class="red-color">请假</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr style="color: black;">
                                            <td>07</td>
                                            <td>2022-06-13</td>
                                            <td>积极分子培训班</td>
                                            <td>软件学院教学楼</td>
                                            <td>党课</td>
                                            <td>已参加</td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr> -->
                                        <tr v-for="item in zbhd" :key="item.id">
                                            <td>{{ item.id }}</td>
                                            <td>{{ item.time }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.place }}</td>
                                            <td>{{ item.type }}</td>
                                            <td>{{ item.state }}</td>

                                            <td class="blue-color">{{ item.remark }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-sheet>
            </v-row>
            <v-row>
                <v-sheet class="d-flex flex-grow-1 mt-2 " rounded="lg">
                    <v-col class="d-flex flex-grow-1 flex-column ">
                        <v-row>
                            <h1 class="ml-3 mt-4 text-h6">党内荣誉获得情况:</h1>
                        </v-row>
                    </v-col>
                </v-sheet>
            </v-row>
            <v-row>
                <v-sheet class="d-flex flex-grow-1 mt-5 bg-grey-color" rounded="lg">
                    <v-col class="d-flex flex-grow-1 flex-column ">
                        <v-row id="data-table" class="mx-3 flex-grow-1 flex-shrink-1 fill-height "
                            style="flex-basis: 0;">
                            <v-col class="pa-0 ">
                                <v-table fixed-header class="bg-grey-lighten-4">
                                    <thead>
                                        <tr class="text-center" style="background-color: #f5f5f5;">
                                            <th style="background-color: #f5f5f5;color: black;">
                                                序号
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;width:130px;">
                                                荣誉获得时间
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                荣誉名称
                                            </th>
                                            <th style="background-color: #f5f5f5;color: black;">
                                                授予单位
                                            </th>
                                            <!-- <th style="background-color: #f5f5f5;"></th>
                                            <th style="background-color: #f5f5f5;"></th>
                                            <th style="background-color: #f5f5f5;"></th> -->
                                            <th style="background-color: #f5f5f5;color: black;width: 120px;">
                                                备注
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in honorList" :key="idx">
                                            <td>{{ idx }}</td>
                                            <td>{{ item.honorTime }}</td>
                                            <td>{{ item.honorName }}</td>
                                            <td>{{ item.grantUnit }}</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">{{ item.remark }}</td>
                                        </tr>
                                        <tr v-if = "honorList.length == 0" style="color: #9a9898;">
                                            <td>暂时未获得荣誉</td>
                                        </tr>
                                        <!-- <tr>
                                            <td>01</td>
                                            <td>2019-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td>2020-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>2021-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr>
                                            <td>04</td>
                                            <td>2022-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr>
                                            <td>05</td>
                                            <td>2022-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr>
                                            <td>06</td>
                                            <td>2022-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr>
                                        <tr>
                                            <td>07</td>
                                            <td>2022-05-21</td>
                                            <td>最佳先进党支部</td>
                                            <td>浙江大学</td>
                                            <td></td><td></td><td></td>
                                            <td class="blue-color">备注文本长度8个…</td>
                                        </tr> -->
                                        <tr v-for="item in dnry" :key="item.id">
                                            <td>{{ item.id }}</td>
                                            <td>{{ item.time }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.from }}</td>
                                            <td class="blue-color">{{ item.remark }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-sheet>
            </v-row>
            <v-row style="height: 50px;">
                <!-- Dummy -->
            </v-row>
        </v-col>
    </v-container>
</template>

<script>

import { getBranchActivities, getPartyHonors, getStudyList } from '@/http/api';
import { ref } from 'vue';
import { toPre0String } from '@/utils/StringUtils.js'
import { getCurrentUser } from '@/utils/auth';

// defineEmits(['drawerToggle']);




export default {
    components: {},
    data() {
        return{
            activityList: ref([]),
            honorList: ref([]),
            allHours: ref(30), // todo总共的学时数
            allStudyHour:ref(0),
            user: ref({}),
            studyList: ref([]),
        }
    },
    created(){
        this.getStudyListV()
        this.listBranchActivities()
        this.listPartyHonors()
        this.user = getCurrentUser()
    },
    methods: {
        listBranchActivities(){
            let _this = this
            const params = {
                page: {
                    pageNumber: 0,
                    pageSize: 10,
                },
            }
            getBranchActivities(params).then(res=>{
                _this.activityList = []
                if(res.code == "200"){
                    _this.activityList = res.data.records
                    for(const activity of _this.activityList){
                        const isUserParticipating = activity.users.some(user => user.userNumber == this.user.userNumber);
                        activity.attendStatus = isUserParticipating ? '已参加' : '未参加';
                        activity.activityStartTime = this.formattedDate(activity.activityStartDate)
                    }
                }
                else{
                    this.$message({
                        message: res.error_message,
                        type: 'error',
                        duration: 3000
                    })
                }
            })
        },
        formattedDate(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        listPartyHonors(){
            let _this = this
            const params = {
                page: {
                    pageNumber: 0,
                    pageSize: 10,
                }
            }
            getPartyHonors(params).then(res=>{
                _this.honorList = []
                console.log(res)  
                if(res.code == "200"){
                    _this.honorList = res.data
                    for(const honor of _this.honorList){
                        honor.honorTime = honor.honorTime.split(" ")[0]
                    }
                }
                else{
                    this.$message({
                        message: res.error_message,
                        type: 'error',
                        duration: 3000
                    })
                }
            })
        },
        getStudyListV(){
            getStudyList().then(res=>{
                console.log(res)
                if(res.code == "200"){
                    this.studyList = res.data
                    this.getYearStudyHours()
                }
            })
        },
        getYearStudyHours(){
            const currentYear = new Date().getFullYear()
            // 统计本年度学习时长
            let totalStudyHours = 0
                this.studyList.forEach(item => {
                // 从 appliedDate 中提取年份
                const year = parseInt(item.appliedDate.split('-')[0]); 
                // 如果年份与当前年份一致，则累加学习时长
                if (year === currentYear) {
                    totalStudyHours += item.appliedStudyHour;
                }
            });
            this.allStudyHour = totalStudyHours
        }
    }


}


    
// let zbhd = [
//     {
//         id: '01',
//         time: '2023-04-04',
//         name: '坚定信仰信念、把握历史主动的根本所在',
//         place: '浙东抗日根据地红色革命文化教育基地',
//         type: '主题党日',
//         state: '已参加',
//         remark: '备注文本长度8个…'
//     },
//     {
//         id: '02',
//         time: '2023-10-18',
//         name: '观看电影《志愿军：雄兵出击》',
//         place: '杭州恒生电子',
//         type: '主题党日',
//         state: '已参加',
//         remark: '备注文本长度8个…'
//     },
//     {
//         id: '03',
//         time: '2023-04-20',
//         name: '学习贯彻习近平新时代中国特色社会主义思想主题教育动员会',
//         place: '教学楼S412',
//         type: '主题党日',
//         state: '未参加',
//         remark: '备注文本长度8个…'
//     },
//     {
//         id: '04',
//         time: '2023-06-19',
//         name: '扎实开展主题教育，积极推动学科交流',
//         place: '中国地震局（北京）',
//         type: '党课',
//         state: '未参加',
//         remark: '备注文本长度8个…'
//     },
//     {
//         id: '05',
//         time: '2023-03-13',
//         name: '学习贯彻习近平新时代中国特色社会主义思想专题组织生活会',
//         place: '教学楼S411',
//         type: '党课',
//         state: '未参加',
//         remark: '备注文本长度8个…'
//     }
// ];

// document.addEventListener('DOMContentLoaded', function () {
//       // 获取并操作具有特定 id 的 <td> 元素
//       const cell2 = document.getElementById('cell2');

//       // 判断元素是否存在，然后再进行操作
//       if (cell2) {
//         if (cell2.textContent.trim() === '未参加') {
//           cell2.classList.add('gray-color');
//         }
//         else if (cell2.textContent.trim() === '请假') {
//           cell2.classList.add('red-color');
//         }
//       }
//     });


let dnry = [
    {
        id: '01',
        time: '2023-06',
        name: '先进基层党组织（软件学院2022级联合党支部）',
        from: '中共浙江大学委员会',
        remark: '校级'
    },
    {
        id: '02',
        time: '2023-06',
        name: '优秀共产党员（冯天）',
        from: '中共浙江大学计算机科学与技术学院和软件学院委员会',
        remark: '院级'
    }
]

</script>

<style lang="scss" src="./ZBHDView.css"></style>