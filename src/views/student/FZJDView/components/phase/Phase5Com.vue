<template>
    <div>
        <v-row>
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 501" ref="circle_5_1_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div class="" style="width: 5px; height: 10%; "></div>
                    <div :class="{ 'lineActivate': phase >= 501, 'lineUnActivate': phase <501 }" style="height: 40%; "></div>
                    <div ref="circle_5_1" :class="{ 'circleActivate': phase >= 501, 'circleUnActivate': phase <501 }" style="">
                    </div>
                    <div :class="{ 'lineActivate': phase >= 502, 'lineUnActivate': phase <502 }" style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 501, 'unArrivePhase': phase <501, 'completed-title': activePhase >= 5 }">入党宣誓</span>
                                </v-col>
                                <v-col class="mr-3 mt-8" style="margin-right: 1%;">
                                    <v-col class="text-center" style="background-color: #d5d5d5;border-radius: 10px;">
                                        <p class="text-h7">&nbsp;尚未满足审查时效/最早时效：10.28</p>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-10 mt-4 ">
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">组织：</span>基层党委或党支部(党总支)。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">程序：</span>(1)奏《国际歌》；(2)党组织负责同志致辞；(3)预备党员宣誓；(4)参加宣誓的预备党员代表发言；(5)党组织负责同志讲话、提出要求。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span>在正式场合举行；严肃认真；庄重简朴；严密紧凑
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                    <!-- <v-icon style="font-size: 64px; color: #C5C5C5;">mdi-chevron-up</v-icon> -->
                                </v-col>

                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <!-- <v-col cols=1 class="bg-blue"></v-col> -->
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 502" ref="circle_5_2_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 502, 'lineUnActivate': phase <502 }" style="height: 50%; "></div>
                    <div ref="circle_5_2" :class="{ 'circleActivate': phase >= 502, 'circleUnActivate': phase <502 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 503, 'lineUnActivate': phase <503 }" style="height: 50%;"></div>
                </div>
            </v-col>

            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 502, 'unArrivePhase': phase <502, 'completed-title': activePhase >= 5 }">预备党员党校培训</span>
                                </v-col>
                                <v-col class="mr-3 mt-8" style="margin-right: 1%;">
                                    <v-col class="text-center" style="background-color: #d5d5d5;border-radius: 10px;">
                                        <p class="text-h7">&nbsp;尚未满足审查时效/最早时效：10.28</p>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-10 mt-4 ">
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">任务：</span>成为入发展对象后，应当积极听党课、参加党内有关活动，参与一定的社会工作以及集中培训等。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">主办单位：</span>软件学院支委会
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                    <!-- <v-icon style="font-size: 64px; color: #C5C5C5;">mdi-chevron-up</v-icon> -->
                                </v-col>

                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div ref="circle_5_1_dialogue" class="background-image-div" :style="{ backgroundImage: `url(${dialogueImg})` }"
                        style="position: absolute; top: 300px;left: 320px; display: flex; align-items: center; justify-content: center;">
                        <h4 style="color: #898989;font-size:14px;width: 100%; margin-left: 10px;">&nbsp;1年</h4>
                    </div>
                    <div v-if="phase >= 503" ref="circle_5_3_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 503, 'lineUnActivate': phase <503 }" style="height: 50%; "></div>
                    <div ref="circle_5_3" :class="{ 'circleActivate': phase >= 503, 'circleUnActivate': phase <503 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 504, 'lineUnActivate': phase <504 }" style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 503, 'unArrivePhase': phase <503, 'completed-title': activePhase >= 5 }">提交思想汇报</span>
                                    <span v-if="phase >= 503" class="text-h6"
                                        style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下一次提交日期：2023.12.30</span>
                                </v-col>
                                <v-col class="text-right mr-10 mt-8" style="margin-right: 1%;">

                                    <v-btn @click="showPopup_upload" color="#D6D6D6"
                                        style="height: 40px;width:75px;font-size: 18px">上传</v-btn>
                                    <!-- 弹窗组件 -->
                                    <Popup_upload v-if="isPopupVisible_upload" @closePopup_upload="closePopup_upload" />

                                    &nbsp;&nbsp;
                                    <v-btn @click="showPopup_download" color="#D6D6D6"
                                        style="height: 40px;width:75px;font-size: 18px">模板</v-btn>
                                    <!-- 弹窗组件 -->
                                    <Popup_download v-if="isPopupVisible_download"
                                        @closePopup_download="closePopup_download" />

                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                    <!-- <v-icon style="font-size: 64px; color: #C5C5C5;">mdi-chevron-up</v-icon> -->
                                </v-col>

                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 504" ref="circle_5_4_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 504, 'lineUnActivate': phase <504 }" style="height: 50%; "></div>
                    <div ref="circle_5_4" :class="{ 'circleActivate': phase >= 504, 'circleUnActivate': phase <504 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 505, 'lineUnActivate': phase <505 }" style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 504, 'unArrivePhase': phase <504, 'completed-title': activePhase >= 5 }">提交转正申请</span>
                                </v-col>
                                <v-col class="text-right mr-10 mt-8" style="margin-right: 1%;">

                                    <v-btn @click="showPopup_upload" color="#D6D6D6"
                                        style="height: 40px;width:75px;font-size: 18px">上传</v-btn>
                                    <!-- 弹窗组件 -->
                                    <Popup_upload v-if="isPopupVisible_upload" @closePopup_upload="closePopup_upload" />

                                    &nbsp;&nbsp;
                                    <v-btn @click="showPopup_download" color="#D6D6D6"
                                        style="height: 40px;width:75px;font-size: 18px">模板</v-btn>
                                    <!-- 弹窗组件 -->
                                    <Popup_download v-if="isPopupVisible_download"
                                        @closePopup_download="closePopup_download" />

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-10 mt-4 ">
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span>预备期满，书面提出申请。
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                    <!-- <v-icon style="font-size: 64px; color: #C5C5C5;">mdi-chevron-up</v-icon> -->
                                </v-col>

                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <!-- <v-col cols=1 class="bg-blue"></v-col> -->
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div ref="circle_5_2_dialogue" class="background-image-div" :style="{ backgroundImage: `url(${dialogueImg})` }"
                        style="position: absolute; top: 300px;left: 320px; display: flex; align-items: center; justify-content: center;">
                        <h4 style="color: #898989;font-size:14px;width: 100%; margin-left: 10px;">&nbsp;&lt;3月</h4>
                    </div>
                    <div v-if="phase >= 5" ref="circle_5_5_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 505, 'lineUnActivate': phase <505 }" style="height: 50%; "></div>
                    <div ref="circle_5_5" :class="{ 'circleActivate': phase >= 505, 'circleUnActivate': phase <505 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 506, 'lineUnActivate': phase <506 }" style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 505, 'unArrivePhase': phase <505 }">支部大会讨论</span>
                                </v-col>
                                <v-col class="mr-3 mt-8" style="margin-right: 1%;">
                                    <v-col class="text-center" style="background-color: #d5d5d5;border-radius: 10px;">
                                        <p class="text-h7">&nbsp;尚未满足审查时效/最早时效：10.28</p>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-10 mt-4 ">
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">准备：</span>党小组提出意见;党支部征求党员和群众的意见;支部委员会审查
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">程序：</span>参照接收预备党员的程序。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">结果：</span>认真履行党员义务、具备党员条件的，按期转为正式党员;需要继续考察和教育的，可以延长1次预备期，延长时间不能少于半年，最长不超过1年;不履行党员义务、不具备党员条件的，取消预备党员资格。
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <!-- <v-col cols=1 class="bg-blue"></v-col> -->
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 506" ref="circle_5_6_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 506, 'lineUnActivate': phase <506 }" style="height: 50%; "></div>
                    <div ref="circle_5_6" :class="{ 'circleActivate': phase >= 506, 'circleUnActivate': phase <506 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    
                    <div :class="{ 'lineActivate': phase >= 507, 'lineUnActivate': phase <507 }" style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 506, 'unArrivePhase': phase <506 }">上级党委审批</span>
                                </v-col>
                                <v-col class="mr-3 mt-8" style="margin-right: 1%;">
                                    <v-col class="text-center" style="background-color: #d5d5d5;border-radius: 10px;">
                                        <p class="text-h7">&nbsp;尚未满足审查时效/最早时效：10.28</p>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-10 mt-4 ">
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span> 审批结果及时通知党支部。党支部书记应当同本人谈话，并将审批结果在党员大会上宣布。
                                        注意:党员的党龄从预备期满转为正式党员之日算起
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 507" ref="circle_5_7_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 507, 'lineUnActivate': phase <507 }" style="height: 50%; "></div>
                    <div ref="circle_5_7" :class="{ 'circleActivate': phase >= 507, 'circleUnActivate': phase <507 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 507, 'unArrivePhase': phase <507 }">材料归档</span>
                                </v-col>
                                <v-col class="mr-3 mt-8" style="margin-right: 1%;">
                                    <v-col class="text-center" style="background-color: #d5d5d5;border-radius: 10px;">
                                        <p class="text-h7">&nbsp;尚未满足审查时效/最早时效：10.28</p>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-row style="height: 50px;">
                                <v-col class="text-right align-start" style="margin-right: 3%;height: 50px;">
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        <!-- UI占位 -->
        <v-row>
            <div style="height: 50px;"></div>
        </v-row>

    </div>
</template>

<script>
import dialogueImg from "@/img/dialogue.png"
import getElementPos from "@/utils/WindowUtils.js"
import Popup_upload from '@/components/Popup_upload.vue'
import Popup_download from '@/components/Popup_download.vue'
export default {
    components: {
        Popup_upload,
        Popup_download,

    },
    props: {
        phase: {
            type: Number,
            default: 1
        },
        activePhase: {
            type: Number,
            default: 1
        }
    },
    setup() {
        return {
            dialogueImg
        }
    },
    data() {
        return {
            isPopupVisible_upload:false,
            isPopupVisible_download:false,
        }
    },
    methods: {
        //设置和目标物体的相对位置
        setPosition(targetElement, myItem, left, top) {
            if (targetElement == undefined || myItem == undefined) {
                return
            }
            var targetPos = getElementPos(targetElement)
            myItem.style.top = targetPos.y + top + 'px';
            myItem.style.left = targetPos.x + left + 'px';
        },
        handleResize() {
            // 处理窗口大小变化的函数
            console.log('Window size changed!');
            // 在这里执行你需要的逻辑
            this.setPosition(this.$refs.circle_5_1, this.$refs.circle_5_1_date, -50, -15)
            this.setPosition(this.$refs.circle_5_2, this.$refs.circle_5_2_date, -50, -15)
            this.setPosition(this.$refs.circle_5_3, this.$refs.circle_5_3_date, -50, -15)
            this.setPosition(this.$refs.circle_5_4, this.$refs.circle_5_4_date, -50, -15)
            this.setPosition(this.$refs.circle_5_5, this.$refs.circle_5_5_date, -50, -15)
            this.setPosition(this.$refs.circle_5_6, this.$refs.circle_5_6_date, -50, -15)
            this.setPosition(this.$refs.circle_5_7, this.$refs.circle_5_7_date, -50, -15)
            this.setPosition(this.$refs.circle_5_3, this.$refs.circle_5_1_dialogue, -60, -60)
            this.setPosition(this.$refs.circle_5_5, this.$refs.circle_5_2_dialogue, -60, 80)
        },
        showPopup_upload(){
            this.isPopupVisible_upload = true;
        },
        closePopup_upload(){
            this.isPopupVisible_upload = false;
        },
        showPopup_download() {
            this.isPopupVisible_download = true;
        },
        closePopup_download() {
            this.isPopupVisible_download = false;
        }


    },
    mounted() {
        // 在组件挂载时添加窗口大小变化的监听器
        window.addEventListener('resize', this.handleResize);
        // 初始执行一次，确保在组件加载时也能执行相应的函数
        this.handleResize();

    },
    beforeDestroy() {
        // 在组件销毁前移除窗口大小变化的监听器，以防止内存泄漏
        window.removeEventListener('resize', this.handleResize);
    },
};

</script>

<style src="./phaseCom.css" scoped>
.completed-title {
    color: #FF5B5B;
    font-weight: bold;
}
</style>