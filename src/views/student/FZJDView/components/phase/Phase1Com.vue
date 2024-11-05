<template>
    <div>
        <v-row>
            <!-- <v-col cols=1 class="bg-blue"></v-col> -->
            <v-col cols=1 class=""
                style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div ref="circle_1_1_dialogue" class="background-image-div" :style="{ backgroundImage: `url(${dialogueImg})` }"
                        style="position: absolute; top: 300px;left: 320px; display: flex; align-items: center; justify-content: center;">
                        <h4 style="color: #898989;font-size:14px;width: 100%; margin-left: 10px;">&nbsp;>1月内</h4>
                    </div>
                    <div v-if="phase >= 101" ref="circle_1_1_date" style="position: absolute;">
                        <h4>09.11</h4>
                        <h4>2018</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <!-- <div :class="{ 'lineActivate': phase >= 1, 'lineUnActivate': phase < 1 }" style="height: 50%; "></div> -->
                    <div class="" style="width: 5px; height: 30%; "></div>
                    <div ref="circle_1_1" :class="{ 'circleActivate': phase >= 101, 'circleUnActivate': phase < 101 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 102, 'lineUnActivate': phase < 102 }" style="height: 70%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;"> 
                    <v-row>
                        <v-col style="margin-bottom: 40px;">
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <p>
                                        <span class="text-h4" :class="{'arrivePhase':phase>=101,'unArrivePhase':phase<101}">提交《入党申请书》</span>
                                    </p>
                                </v-col>
                                <v-col class="ml-10 mt-10 text-right" style="margin-right: 3%;">
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
                                        <span
                                            style="font-weight: bold;">要求：</span>向工作、学习所在单位党组织提出入党申请；没有工作、学习单位或工作、学习单位未建立党组织的，向居住地党组织提出入党申请；流动人员还可以向单位所在地党组织或单位主管部门党组织、流动党员党组织提出入党申请。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">注意：</span>本人提出；书面申请
                                    </p>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols=1 class=""
                style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 102" ref="circle_1_2_date" style="position: absolute;">
                        <h4>09.30</h4>
                        <h4>2018</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 102, 'lineUnActivate': phase < 102 }" style="height: 50%; "></div>
                    <div ref="circle_1_2" :class="{ 'circleActivate': phase >= 102, 'circleUnActivate': phase < 102 }" style=""></div>
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
                                    <span class="text-h4" :class="{'arrivePhase':phase>=102,'unArrivePhase':phase<102}">党组织派人谈话</span>
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
                                            style="font-weight: bold;">主体：</span>党支部书记、副书记或组织委员。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">内容：</span>了解入党申请人基本情况；介绍入党条件和程序；加强教育引导。
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
    props:{
        phase:{
            type:Number,
            default:1
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
            if (targetElement==undefined||myItem==undefined){
                return
            }
            var targetPos = getElementPos(targetElement)
            myItem.style.top = targetPos.y + top +'px';
            myItem.style.left = targetPos.x + left + 'px';
        },
        handleResize() {
            // 处理窗口大小变化的函数
            console.log('Window size changed!');
            // 在这里执行你需要的逻辑
            this.setPosition(this.$refs.circle_1_1, this.$refs.circle_1_1_date, -50, -15)
            this.setPosition(this.$refs.circle_1_2, this.$refs.circle_1_2_date, -50, -15)
            this.setPosition(this.$refs.circle_1_1, this.$refs.circle_1_1_dialogue, -70, 120)
        },
        showPopup_upload(){
            this.isPopupVisible_upload = true;
        },
        closePopup_upload(){
            console.log("执行了")
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

</style>