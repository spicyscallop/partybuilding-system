<template>
    <div>
        <v-row>
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div ref="circle_3_1_dialogue" class="background-image-div"
                        :style="{ backgroundImage: `url(${dialogueImg})` }"
                        style="position: absolute; top: 300px;left: 320px; display: flex; align-items: center; justify-content: center;">
                        <h4 style="color: #898989;font-size:14px;width: 100%; margin-left: 10px;">&nbsp;>1年</h4>
                    </div>
                    <div v-if="phase >= 301" ref="circle_3_1_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div class="" style="width: 5px; height: 10%; "></div>
                    <div :class="{ 'lineActivate': phase >= 301, 'lineUnActivate': phase < 301 }" style="height: 40%; "></div>
                    <div ref="circle_3_1" :class="{ 'circleActivate': phase >= 301, 'circleUnActivate': phase < 301 }" style="">
                    </div>
                    <div :class="{ 'lineActivate': phase >= 302, 'lineUnActivate': phase < 302 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 301, 'unArrivePhase': phase < 301 }">确认发展对象</span>
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
                                            style="font-weight: bold;">条件：</span>经过1年以上培养教育和考察，基本具备党员条件。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">确定：</span>支部委员会讨论同意，确定发展对象人选。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">要求：</span>听取党小组、培养联系人、党员和群众意见。
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
                    <div v-if="phase >= 302" ref="circle_3_2_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 302, 'lineUnActivate': phase < 302 }" style="height: 50%; "></div>
                    <div ref="circle_3_2" :class="{ 'circleActivate': phase >= 302, 'circleUnActivate': phase < 302 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 303, 'lineUnActivate': phase < 303 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 302, 'unArrivePhase': phase < 302 }">上级党委备案</span>
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
                                        <span style="font-weight: bold;">要求：</span>认真审查，提出意见。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">注意：</span>同意后列为发展对象。
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
                    <div v-if="phase >= 3" ref="circle_3_3_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 303, 'lineUnActivate': phase < 303 }" style="height: 50%; "></div>
                    <div ref="circle_3_3" :class="{ 'circleActivate': phase >= 303, 'circleUnActivate': phase < 303 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 304, 'lineUnActivate': phase < 304 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 303, 'unArrivePhase': phase < 303 }">确定入党介绍人</span>
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
                                        <span style="font-weight: bold;">数量：</span>2 名正式党员。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">方法：</span>一般由培养联系人担任，也可由党组织指定。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">注意：</span>受留党察看处分、尚未回复党员权利的党员，不能作入党介绍人。
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
                    <div v-if="phase >= 304" ref="circle_3_4_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 304, 'lineUnActivate': phase < 304 }" style="height: 50%; "></div>
                    <div ref="circle_3_4" :class="{ 'circleActivate': phase >= 304, 'circleUnActivate': phase < 304 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 305, 'lineUnActivate': phase < 305 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 304, 'unArrivePhase': phase < 304 }">进行政治审查</span>
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
                                            style="font-weight: bold;">内容：</span>对党的理论和路线、方针、政策的态度；政治历史和重大政治斗争中的表现；遵纪守法和遵守社会公德情况；直系亲属和与本人关系密切的主要社会关系的政治情况。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">方法：</span>同本人谈话、查阅档案资料、找有关单位和人员了解情况以及必要的函调或外调。对流动人员中的发展对象还应当征求户籍所在地和居住地基层党组织的意见。
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
                    <div v-if="phase >= 305" ref="circle_3_5_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 305, 'lineUnActivate': phase < 305 }" style="height: 50%; "></div>
                    <div ref="circle_3_5" :class="{ 'circleActivate': phase >= 305, 'circleUnActivate': phase < 305 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 306, 'lineUnActivate': phase < 306 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 305, 'unArrivePhase': phase < 305 }">发展对象培训班</span>
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
                                            style="font-weight: bold;">任务：</span>成基层党委或县级党委组织部门
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">时间：</span>不少于3天或不少于24学时
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
                    <div v-if="phase >= 6" ref="circle_3_6_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 306, 'lineUnActivate': phase < 306 }" style="height: 50%; "></div>
                    <div ref="circle_3_6" :class="{ 'circleActivate': phase >= 306, 'circleUnActivate': phase < 306 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 306, 'lineUnActivate': phase < 306 }" style="height: 50%;"></div>
                </div>
            </v-col>
            <v-col cols=11 class="">
                <v-sheet class="d-flex flex-grow-1 mx-2 mt-5" rounded="lg"
                    style="border-radius: 50px;background-color: #FFFFFF;">
                    <v-row>
                        <v-col style="margin-bottom: 40px;">
                            <v-row>
                                <v-col class="ml-10 mt-10" cols="8">
                                    <span class="text-h4"
                                        :class="{ 'arrivePhase': phase >= 306, 'unArrivePhase': phase < 306 }">提交思想汇报</span>
                                    <span v-if="phase>=6" class="text-h6"
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
            this.setPosition(this.$refs.circle_3_1, this.$refs.circle_3_1_date, -50, -15)
            this.setPosition(this.$refs.circle_3_2, this.$refs.circle_3_2_date, -50, -15)
            this.setPosition(this.$refs.circle_3_3, this.$refs.circle_3_3_date, -50, -15)
            this.setPosition(this.$refs.circle_3_4, this.$refs.circle_3_4_date, -50, -15)
            this.setPosition(this.$refs.circle_3_5, this.$refs.circle_3_5_date, -50, -15)
            this.setPosition(this.$refs.circle_3_1, this.$refs.circle_3_1_dialogue, -60, -80)

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

<style src="./phaseCom.css" scoped></style>