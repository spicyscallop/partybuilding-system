<template>
    <div>
        <v-row>
            <v-col cols=1 class="" style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex;">
                    <div v-if="phase >= 401" ref="circle_4_1_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div class="" style="width: 5px; height: 10%; "></div>
                    <div :class="{ 'lineActivate': phase >= 401, 'lineUnActivate': phase < 401 }" style="height: 40%; "></div>
                    <div ref="circle_4_1" :class="{ 'circleActivate': phase >= 401, 'circleUnActivate': phase < 401 }" style="">
                    </div>
                    <div :class="{ 'lineActivate': phase >= 402, 'lineUnActivate': phase < 402 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 401, 'unArrivePhase': phase < 401, 'completed-title': activePhase >= 4 }">支部委员会审查</span>
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
                                        <span style="font-weight: bold;">要求：</span>征求党员和群众的意见；对发展对象进行严格审查；集体讨论是否合格。
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
                    <div v-if="phase >= 402" ref="circle_4_2_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 402, 'lineUnActivate': phase < 402 }" style="height: 50%; "></div>
                    <div ref="circle_4_2" :class="{ 'circleActivate': phase >= 402, 'circleUnActivate': phase < 402 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 403, 'lineUnActivate': phase < 403 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 402, 'unArrivePhase': phase < 402, 'completed-title': activePhase >= 4 }">上级党委预审</span>
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
                                        <span style="font-weight: bold;">方式：</span>审查发展对象条件、培养教育情况等；根据需要，听取执纪执法部门意见。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span>审查结果书面通知党支部；向审查合格的发展对象发放《中国共产党入党志愿书》。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">注意：</span>发展对象未来3个月内将离开工作、学习单位的，一般不办理接收预备党员手续。
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
                    <div v-if="phase >= 403" ref="circle_4_3_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 403, 'lineUnActivate': phase < 403 }" style="height: 50%; "></div>
                    <div ref="circle_4_3" :class="{ 'circleActivate': phase >= 403, 'circleUnActivate': phase < 403 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 404, 'lineUnActivate': phase < 404 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 403, 'unArrivePhase': phase < 403, 'completed-title': activePhase >= 4 }">提交《入党志愿书》</span>
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
                                        <span style="font-weight: bold;">要求：</span>在入党介绍人的指导下，由本人按照要求如实填写。
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
                    <div v-if="phase >= 404" ref="circle_4_4_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 404, 'lineUnActivate': phase < 404 }" style="height: 50%; "></div>
                    <div ref="circle_4_4" :class="{ 'circleActivate': phase >= 404, 'circleUnActivate': phase < 404 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 405, 'lineUnActivate': phase < 405 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 404, 'unArrivePhase': phase < 404, 'completed-title': activePhase >= 4 }">提交思想汇报</span>
                                    <span v-if="phase >= 4" class="text-h6"
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
                            <v-row>
                                <v-col class="ml-10 mt-4 ">
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span
                                            style="font-weight: bold;"></span>2023.09.28&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已提交
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
                    <div v-if="phase >= 405" ref="circle_4_5_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 405, 'lineUnActivate': phase < 405 }" style="height: 50%; "></div>
                    <div ref="circle_4_5" :class="{ 'circleActivate': phase >= 405, 'circleUnActivate': phase < 405 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 406, 'lineUnActivate': phase < 406 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 405, 'unArrivePhase': phase < 405, 'completed-title': activePhase >= 4 }">支部大会讨论</span>
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
                                        <span style="font-weight: bold;">要求：</span>在入党介绍人的指导下，由本人按照要求如实填写。
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
                    <div v-if="phase >= 406" ref="circle_4_6_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 406, 'lineUnActivate': phase < 406 }" style="height: 50%; "></div>
                    <div ref="circle_4_6" :class="{ 'circleActivate': phase >= 406, 'circleUnActivate': phase < 406 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 407, 'lineUnActivate': phase < 407 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 406, 'unArrivePhase': phase < 406, 'completed-title': activePhase >= 4 }">党组织派人谈话</span>
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
                                        <span style="font-weight: bold;">人员：</span>党委委员或组织员。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">目的：</span>作进一步了解，并帮助发展对象提高对党的认识。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span>谈话人应当将谈话情况和自己对发展对象能否入党的意见，如实填写在《中国共产党入党志愿书》上，并向党委汇报。
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
                    <div v-if="phase >= 407" ref="circle_4_7_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 407, 'lineUnActivate': phase < 407 }" style="height: 50%; "></div>
                    <div ref="circle_4_7" :class="{ 'circleActivate': phase >= 407, 'circleUnActivate': phase < 407 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 408, 'lineUnActivate': phase < 408 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 407, 'unArrivePhase': phase < 407, 'completed-title': activePhase >= 4 }">上级党委审批</span>
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
                                        <span style="font-weight: bold;">内容：</span>是否具备党员条件、入党手续是否完备
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">要求：</span>集体讨论和表决。两个以上发展对象应当逐个审议和表决
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">时间：</span>3个月内，特殊情况不超过 6 个月。
                                    </p>
                                    <p class="text-h6" style="color:#898989;width: 95%;">
                                        <span style="font-weight: bold;">注意：</span>党总支、乡镇(街道)所属的基层党委以及党组不能审批预备党员。除另有规定外，临时党组织不能接收、审批预备党员。
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
                    <div v-if="phase >= 408" ref="circle_4_8_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 408, 'lineUnActivate': phase < 408 }" style="height: 50%; "></div>
                    <div ref="circle_4_8" :class="{ 'circleActivate': phase >= 408, 'circleUnActivate': phase < 408 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 409, 'lineUnActivate': phase < 409 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 408, 'unArrivePhase': phase < 408, 'completed-title': activePhase >= 4 }">再上一级党委组织部门备案</span>
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
                                        <span style="font-weight: bold;">目的：</span>掌握预备党员结构、分布、质量等情况;发现问题，及时解决。
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
                    <div v-if="phase >= 409" ref="circle_4_9_date" style="position: absolute;">
                        <h4>09.28</h4>
                        <h4>2023</h4>
                    </div>
                </div>
                <div class="fill-height positionLine"
                    style="padding: 0px; display: flex; flex-direction: column; align-items: center;">
                    <div :class="{ 'lineActivate': phase >= 409, 'lineUnActivate': phase < 409 }" style="height: 50%; "></div>
                    <div ref="circle_4_9" :class="{ 'circleActivate': phase >= 409, 'circleUnActivate': phase < 409 }"
                        style="margin-top: auto; margin-bottom: auto;"></div>
                    <div :class="{ 'lineActivate': phase >= 409, 'lineUnActivate': phase < 409 }" style="height: 50%;"></div>
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
                                        :class="{ 'arrivePhase': phase >= 409, 'unArrivePhase': phase < 409, 'completed-title': activePhase >= 4 }">编入党支部和党小组</span>
                                </v-col>
                                <v-col class="mr-3 mt-8" style="margin-right: 1%;">
                                    <v-col class="text-center" style="background-color: #d5d5d5;border-radius: 10px;">
                                        <p class="text-h7">&nbsp;尚未满足审查时效/最早时效：10.28</p>
                                    </v-col>
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
            this.setPosition(this.$refs.circle_4_1, this.$refs.circle_4_1_date, -50, -15)
            this.setPosition(this.$refs.circle_4_2, this.$refs.circle_4_2_date, -50, -15)
            this.setPosition(this.$refs.circle_4_3, this.$refs.circle_4_3_date, -50, -15)
            this.setPosition(this.$refs.circle_4_4, this.$refs.circle_4_4_date, -50, -15)
            this.setPosition(this.$refs.circle_4_5, this.$refs.circle_4_5_date, -50, -15)
            this.setPosition(this.$refs.circle_4_6, this.$refs.circle_4_6_date, -50, -15)
            this.setPosition(this.$refs.circle_4_7, this.$refs.circle_4_7_date, -50, -15)
            this.setPosition(this.$refs.circle_4_8, this.$refs.circle_4_8_date, -50, -15)
            this.setPosition(this.$refs.circle_4_9, this.$refs.circle_4_9_date, -50, -15)
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