<template>
    <div>
        <v-row>
            <!-- <v-col cols=1 class="bg-blue"></v-col> -->
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div ref="circle_2_1_dialogue" class="background-image-div"
                        :style="{ backgroundImage: `url(${dialogueImg})` }"
                        style="position: absolute; top: 300px;left: 320px; display: flex; align-items: center; justify-content: center;">
                        <h4 style="color: #898989;font-size:14px;width: 100%; margin-left: 10px;">&nbsp;>3月</h4>
                    </div>
                    <div v-if="phase >= 201" ref="circle_2_1_date" style="position: absolute;">
                        <h4>11.27</h4>
                        <h4>2020</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div class="" style="width: 5px; height: 10%; "></div>
                    <div :class="{ 'lineActivate': phase >= 201, 'lineUnActivate': phase < 201 }" style="height: 40%; "></div>
                    <div ref="circle_2_1" :class="{ 'circleActivate': phase >= 201, 'circleUnActivate': phase < 201 }" style="">
                    </div>
                    <div :class="{ 'lineActivate': phase >= 202, 'lineUnActivate': phase < 202 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 201, 'unArrivePhase': phase < 201 }">推荐和确认入党积极分子</span>
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
                                            style="font-weight: bold;">内容：</span>已递交入党申请书且党组织已派人谈话的人员，采取党员推荐、群团组织推优等方式产生人选，由支部委会（不设支部委员会的由支部大会）研究决定。校级学生组织与学生社团活动等校级活动团支部推优工作由校团委统一组织实施。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">注意：</span>“推优”名单确定后，学生及时填写《浙江大学团组织推优入党审核表》，并附1000字左右个人事迹一份（可打印，需手写签名和时间，落款时间为团支部推优时间），交至团支书处签署团支部意见，由团支书汇总归档。
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
                <diV>
                    <div v-if="phase >= 202" ref="circle_2_2_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </diV>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 202, 'lineUnActivate': phase < 202 }" style="height: 50%; "></div>
                    <div ref="circle_2_2" :class="{ 'circleActivate': phase >= 202, 'circleUnActivate': phase < 202 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 203, 'lineUnActivate': phase < 203 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 202, 'unArrivePhase': phase < 202 }">上级党委备案</span>
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
                                        <span style="font-weight: bold;">材料：</span>入党申请人的基本情况。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span>了解入党积极分子是否具备条件；手续是否齐全。
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
                <diV>
                    <div v-if="phase >= 203" ref="circle_2_3_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </diV>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 203, 'lineUnActivate': phase < 203 }" style="height: 50%; "></div>
                    <div ref="circle_2_3" :class="{ 'circleActivate': phase >= 203, 'circleUnActivate': phase < 203 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 204, 'lineUnActivate': phase < 204 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 203, 'unArrivePhase': phase < 203 }">指定培养联系人</span>
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
                                        <span style="font-weight: bold;">数量：</span>1-2 名正式党员。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;">任务：</span>向入党积极分子介绍党的基本知识；了解入党积极分子的政治觉悟道德品质、现实表现和家庭情况等，做好培养教育工作，引导入党积极分子端正入党动机；及时向党支部汇报入党积极分子情况；向党支部提出能否将入党积极分子列为发展对象的意见。
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
                <div>
                    <div v-if="phase >= 204" ref="circle_2_4_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </diV>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 204, 'lineUnActivate': phase < 204 }" style="height: 50%; "></div>
                    <div ref="circle_2_4" :class="{ 'circleActivate': phase >= 204, 'circleUnActivate': phase < 204 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 205, 'lineUnActivate': phase < 205 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 204, 'unArrivePhase': phase < 204 }">积极分子培训班</span>
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
                                            style="font-weight: bold;">任务：</span>成为入党积极分子后，应当积极听党课、参加党内有关活动，参与一定的社会工作以及集中培训等。
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
            <!-- <v-col cols=1 class="bg-blue"></v-col> -->
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div>

                    <div v-if="phase >= 205" ref="circle_2_5_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </diV>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 205, 'lineUnActivate': phase < 205 }" style="height: 50%; "></div>
                    <div  ref="circle_2_5" :class="{ 'circleActivate': phase >= 205, 'circleUnActivate': phase < 205 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 205, 'lineUnActivate': phase < 205 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 205, 'unArrivePhase': phase < 205 }">提交思想汇报</span>
                                    <span v-if="phase >= 205" class="text-h6"
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
            this.setPosition(this.$refs.circle_2_1, this.$refs.circle_2_1_date, -50, -15)
            this.setPosition(this.$refs.circle_2_2, this.$refs.circle_2_2_date, -50, -15)
            this.setPosition(this.$refs.circle_2_3, this.$refs.circle_2_3_date, -50, -15)
            this.setPosition(this.$refs.circle_2_4, this.$refs.circle_2_4_date, -50, -15)
            this.setPosition(this.$refs.circle_2_5, this.$refs.circle_2_5_date, -50, -15)
            this.setPosition(this.$refs.circle_2_1, this.$refs.circle_2_1_dialogue, -60, -80)

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