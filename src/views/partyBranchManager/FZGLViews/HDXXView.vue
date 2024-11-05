<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="活动信息管理" icon="mdi-book-open-variant" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row class="flex-grow-1">
                <v-dialog width="50%" v-model="editDialog.isOpen" persistent>
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-toolbar class="ml-5" color="white" title="添加活动信息"></v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            活动名称
                                            <v-text-field v-model="editDialog.data.activityName" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            活动编号
                                            <v-text-field v-model="editDialog.data.activityNumber" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"
                                                readonly></v-text-field>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            发展阶段
                                            <v-select v-model="editDialog.data.developmentPhase" class="ml-3"
                                                :items="['入党申请人阶段', '入党积极分子阶段', '发展对象阶段', '预备党员阶段']" variant="outlined"
                                                hide-details="auto" density="compact"></v-select>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            活动时间
                                            <VDatePicker v-model="editDialog.data.activityDate"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="ml-3 date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            主办单位
                                            <v-text-field v-model="editDialog.data.activitySponsor" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            活动类型
                                            <v-select v-model="editDialog.data.activityType" class="ml-3"
                                                :items="['推优活动', '培训活动', '思想汇报', '其他活动']" variant="outlined"
                                                hide-details="auto" density="compact"></v-select>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            提交文件
                                            <v-text-field v-model="editDialog.data.additionFile" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            参与人员
                                            <v-text-field class="ml-3" variant="outlined" density="compact"
                                                hide-details="auto">缺字段</v-text-field>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            通知内容
                                            <v-btn class="ml-3" @click="announceDialog.isOpen = true">添加通知</v-btn>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            已提交人员
                                            <v-text-field class="ml-3" variant="outlined" density="compact"
                                                hide-details="auto">缺字段</v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="d-flex flex-column justify-start">
                                            备注
                                            <v-textarea v-model="editDialog.data.remark" class="mt-3" variant="outlined"
                                                density="compact" hide-details="auto"></v-textarea>
                                        </v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            附加文件
                                            <v-btn class="ml-3">选取文件</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions class="justify-end ml-5">
                                <v-btn variant="text" @click="submitEditDialog">提交</v-btn>
                                <v-btn variant="text" @click="isActive.value = false">取消</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
                <v-dialog width="50%" v-model="announceDialog.isOpen" persistent>
                    <template v-slot:default="{ isActive }">
                        <v-card id="AnnounceDialog">
                            <v-toolbar class="ml-5" color="white" title="添加活动信息"></v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            通知标题
                                            <v-text-field v-model="editDialog.data.userNumber" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            文件上传
                                            <v-text-field v-model="editDialog.data.userName" class="ml-3" variant="outlined"
                                                density="compact" hide-details="auto" readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" style="height: 100%">
                                            <QuillEditor toolbar="#quill-toolbar" :modules="modules">
                                                <template #toolbar>
                                                    <div id="quill-toolbar">
                                                        <span class="ql-formats">
                                                            <button class="ql-bold"></button>
                                                            <button class="ql-italic"></button>
                                                            <button class="ql-underline"></button>
                                                            <button class="ql-strike"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-blockquote"></button>
                                                            <button class="ql-code-block"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-header" value="1"></button>
                                                            <button class="ql-header" value="2"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-list" value="ordered"></button>
                                                            <button class="ql-list" value="bullet"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-script" value="sub"></button>
                                                            <button class="ql-script" value="super"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-indent" value="-1"></button>
                                                            <button class="ql-indent" value="+1"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-direction" value="rtl"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <select class="ql-size">
                                                                <option value="small"></option>
                                                                <option selected="selected"></option>
                                                                <option value="large"></option>
                                                                <option value="huge"></option>
                                                            </select>
                                                        </span>

                                                        <span class="ql-formats">
                                                            <select class="ql-header">
                                                                <option value="1"> </option>
                                                                <option value="2"></option>
                                                                <option value="3"></option>
                                                                <option value="4"></option>
                                                                <option value="5"></option>
                                                                <option value="6"></option>
                                                                <option selected="selected"></option>
                                                            </select>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <select class="ql-font">
                                                                <option selected="selected" value="SimSun">宋体</option>
                                                                <option value="SimHei">黑体</option>
                                                                <option value="Microsoft-YaHei">微软雅黑</option>
                                                                <option value="KaiTi">楷体</option>
                                                                <option value="FangSong">仿宋</option>
                                                                <option value="Arial">Arial</option>
                                                                <option value="Times-New-Roman">Times New Roman</option>
                                                                <option value="sans-serif">Sans Serif</option>
                                                            </select>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <select class="ql-color">
                                                                <option selected="selected"></option>
                                                                <option value="#e60000"></option>
                                                                <option value="#ff9900"></option>
                                                                <option value="#ffff00"></option>
                                                                <option value="#008a00"></option>
                                                                <option value="#0066cc"></option>
                                                                <option value="#9933ff"></option>
                                                                <option value="#ffffff"></option>
                                                                <option value="#facccc"></option>
                                                                <option value="#ffebcc"></option>
                                                                <option value="#ffffcc"></option>
                                                                <option value="#cce8cc"></option>
                                                                <option value="#cce0f5"></option>
                                                                <option value="#ebd6ff"></option>
                                                                <option value="#bbbbbb"></option>
                                                                <option value="#f06666"></option>
                                                                <option value="#ffc266"></option>
                                                                <option value="#ffff66"></option>
                                                                <option value="#66b966"></option>
                                                                <option value="#66a3e0"></option>
                                                                <option value="#c285ff"></option>
                                                                <option value="#888888"></option>
                                                                <option value="#a10000"></option>
                                                                <option value="#b26b00"></option>
                                                                <option value="#b2b200"></option>
                                                                <option value="#006100"></option>
                                                                <option value="#0047b2"></option>
                                                                <option value="#6b24b2"></option>
                                                                <option value="#444444"></option>
                                                                <option value="#5c0000"></option>
                                                                <option value="#663d00"></option>
                                                                <option value="#666600"></option>
                                                                <option value="#003700"></option>
                                                                <option value="#002966"></option>
                                                                <option value="#3d1466"></option>
                                                            </select>
                                                            <select class="ql-background">
                                                                <option value="#000000"></option>
                                                                <option value="#e60000"></option>
                                                                <option value="#ff9900"></option>
                                                                <option value="#ffff00"></option>
                                                                <option value="#008a00"></option>
                                                                <option value="#0066cc"></option>
                                                                <option value="#9933ff"></option>
                                                                <option selected="selected"></option>
                                                                <option value="#facccc"></option>
                                                                <option value="#ffebcc"></option>
                                                                <option value="#ffffcc"></option>
                                                                <option value="#cce8cc"></option>
                                                                <option value="#cce0f5"></option>
                                                                <option value="#ebd6ff"></option>
                                                                <option value="#bbbbbb"></option>
                                                                <option value="#f06666"></option>
                                                                <option value="#ffc266"></option>
                                                                <option value="#ffff66"></option>
                                                                <option value="#66b966"></option>
                                                                <option value="#66a3e0"></option>
                                                                <option value="#c285ff"></option>
                                                                <option value="#888888"></option>
                                                                <option value="#a10000"></option>
                                                                <option value="#b26b00"></option>
                                                                <option value="#b2b200"></option>
                                                                <option value="#006100"></option>
                                                                <option value="#0047b2"></option>
                                                                <option value="#6b24b2"></option>
                                                                <option value="#444444"></option>
                                                                <option value="#5c0000"></option>
                                                                <option value="#663d00"></option>
                                                                <option value="#666600"></option>
                                                                <option value="#003700"></option>
                                                                <option value="#002966"></option>
                                                                <option value="#3d1466"></option>
                                                            </select>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <select class="ql-align">
                                                                <option selected="selected"></option>
                                                                <option value="center"></option>
                                                                <option value="right"></option>
                                                                <option value="justify"></option>
                                                            </select>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-clean"></button>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button class="ql-link"></button>
                                                            <button class="ql-image"></button>
                                                            <button class="ql-video"></button>
                                                        </span>
                                                    </div>
                                                </template>
                                            </QuillEditor>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions class="justify-end ml-5">
                                <v-btn variant="text" @click="isActive.value = false">提交</v-btn>
                                <v-btn variant="text" @click="isActive.value = false">取消</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>

                </v-dialog>
                <v-col class="d-flex">
                    <v-sheet class="d-flex flex-grow-1" rounded="lg" max-width="100%">
                        <v-col class="d-flex flex-grow-1 flex-column">
                            <v-row class="flex-shrink-1 flex-grow-0 ma-0">
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">发展阶段</v-label>
                                    <v-select v-model="query.developmentPhase" class="ml-3"
                                        :items="['入党申请人阶段', '入党积极分子阶段', '发展对象阶段', '预备党员阶段', '全部']" variant="outlined"
                                        hide-details="auto" density="compact"></v-select>
                                </v-col>
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">活动时间</v-label>
                                    <v-select v-model="query.days" class="ml-3" :items="['一周内', '一月内', '半年内', '全部']"
                                        variant="outlined" hide-details="auto" density="compact"></v-select>
                                </v-col>
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">活动编号</v-label>
                                    <v-text-field variant="outlined" density="compact" hide-details="auto"
                                        v-model="query.activityNumber" @keydown.enter="processQuery"></v-text-field>
                                </v-col>
                                <v-col class="flex-shrink-1 flex-grow-0">
                                    <v-btn elevation="1" color="party-1" @click="processQuery">查询</v-btn>
                                </v-col>
                                <v-col class="flex-shrink-1 flex-grow-0">
                                    <!-- Elevation with search act-->
                                    <v-btn :elevation="isQueryEmpty ? 1 : 4" @click="cleanQuery">清除</v-btn>
                                </v-col>
                            </v-row>
                            <v-row id="data-table" class="flex-grow-1 flex-shrink-1 fill-height"
                                style="flex-basis: 0; min-height: 200px; --scrollbar-width: 0px; --scrollbar-height: 0px;">
                                <v-col class="pa-0 fill-height" style="flex: 0 0 300px">
                                    <v-table ref="data-table-left" class="data-table-inner data-table-left fill-height"
                                        fixed-header>
                                        <thead>
                                            <tr class="text-center">
                                                <th class="row-head-l1">
                                                    <v-checkbox-btn value="Jacob"></v-checkbox-btn>
                                                </th>
                                                <th class="row-head-l2">
                                                    活动编号
                                                </th>
                                                <th class="row-head-l3">
                                                    活动名称
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in table" :key="item.userNumber">
                                                <th>
                                                    <v-checkbox-btn value="Jacob"></v-checkbox-btn>
                                                </th>
                                                <td>{{ item.activityNumber }}</td>
                                                <td>{{ item.activityName }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-col>
                                <v-col class="pa-0 fill-height" style="width: 0; flex: 1 1 0;">
                                    <v-table class="data-table-inner data-table-center fill-height" fixed-header>
                                        <thead>
                                            <tr class="text-center">
                                                <th style="width: 150px;">
                                                    发展阶段
                                                </th>
                                                <th style="width: 150px;">
                                                    主办单位
                                                </th>
                                                <th style="width: 150px;">
                                                    活动时间
                                                </th>
                                                <th style="width: 150px;">
                                                    活动类型
                                                </th>
                                                <th style="width: 150px;">
                                                    提交文件/申请学时
                                                </th>
                                                <th style="width: 150px;">
                                                    状态
                                                </th>
                                                <th style="width: 150px;">
                                                    通知内容
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in table" :key="item.userNumber">
                                                <td>{{ item.developmentPhase }}</td>
                                                <td>{{ item.activitySponsor }}</td>
                                                <td>{{ timestampToString(item.activityDate) }}</td>
                                                <td>{{ item.activityType }}</td>
                                                <td>{{ item.appliedStudyHour }}</td>
                                                <td>{{ item.state }}</td>
                                                <td>{{ item.remark }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-col>
                                <v-col class="pa-0 fill-height" style="flex: 0 0 90px">
                                    <v-table class="data-table-inner  data-table-right fill-height" fixed-header>
                                        <thead>
                                            <tr class="text-center">
                                                <th class="row-head-l1">
                                                    操作
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in table" :key="item.userNumber">
                                                <td>
                                                    <v-btn @click="openEditDialog(item.userNumber)" density="comfortable"
                                                        icon="mdi-pencil-outline" variant="text">
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-col>

                            </v-row>
                            <v-row id="data-table-footer" class="flex-shrink-1 flex-grow-0 flex-row-reverse">
                                <v-row class="align-center ma-0">
                                    <v-col class="flex-shrink-0 flex-grow-1">
                                        <v-checkbox-btn style="padding-left: 4px;" label="全选"></v-checkbox-btn>
                                    </v-col>
                                    <v-col cols="2" class="pa-0" style="min-width: 135px;">
                                        <v-select class="ml-3" :items="['10条/页', '20条/页', '50条/页']" variant="outlined"
                                            v-model="pageSize" hide-details="auto" density="compact"></v-select>
                                    </v-col>
                                    <v-col cols="2" class="pa-0" style="min-width: 155px;">
                                        <v-pagination v-model="page" :length="pages" total-visible="1"></v-pagination>
                                    </v-col>
                                    <v-col class="d-flex flex-row flex-grow-0 flex-shrink-1 align-center"
                                        style="white-space: nowrap;">
                                        <div>前往第</div>

                                        <div contenteditable class="mx-3"
                                            style="min-width: 50px;min-height: 40px;padding: 6px 8px; font-size:16px;border: 1px solid #ababab;border-radius: 4px;"
                                            @keydown.enter="toPage">
                                        </div>
                                        <div>页</div>
                                    </v-col>
                                </v-row>
                            </v-row>
                        </v-col>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';

import axios from "axios";
import dayjs from "dayjs";
import qs from 'qs';

import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';

import { syncScroller } from "@/plugins/utility.js"

function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
}

let Font = Quill.import('formats/font');
Font.whitelist = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
Quill.register(Font, true);

export default {
    components: {
        SubpageTitle,
        QuillEditor
    },
    setup: () => {
        const modules = {
            name: 'blotFormatter',
            module: BlotFormatter,
            options: {/* options */ }
        }
        return { modules }
    },
    emits: ["drawerToggle"],
    data() {
        return {
            datePicker: {
                clickPop: {
                    visibility: 'click',
                    hideDelay: 0
                }
            },
            event: null,
            editDialog: {
                isOpen: false,
                userNumber: 0,
                data: null,
                dataUnedited: null,
            },
            announceDialog: {
                isOpen: false
            },
            table: null,
            query: {
                developmentPhase: "全部",
                days: "全部",
                activityNumber: ""
            },
            pageSize: "10条/页",
            page: 1,
            // Max Page Count
            pages: 1,
        }
    },
    methods: {
        openEditDialog(userNumber) {
            this.editDialog.userNumber = userNumber;
            this.editDialog.isOpen = true;
            let index = this.table.findIndex(obj =>
                obj.userNumber == userNumber
            );

            this.editDialog.data = JSON.parse(JSON.stringify(this.table[index]));
            this.editDialog.dataUnedited = JSON.parse(JSON.stringify(this.table[index]));
        },
        getValidData() {
            let data = JSON.parse(JSON.stringify(this.editDialog.data));
            ["activityDate", "createTime", "updateTime"].forEach((key) => {
                if (data.hasOwnProperty(key)) {
                    let time = dayjs(data[key]);
                    if (time.isValid()) {
                        data[key] = time.format("YYYY-MM-DD");
                    } else {
                        delete data[key];
                    }
                }
            });

            Object.keys(data).forEach((key) => {
                if (!data[key]) delete data[key];
            });

            ["userNumber", "userName"].forEach((key) => {
                if (data.hasOwnProperty(key)) {
                    if (key == "userNumber") {
                        data["userList[0].userNumber"] = data[key];
                        delete data[key];
                    } else if (key == "userName") {
                        data["userList[0].username"] = data[key];
                        delete data[key];
                    }
                }
            });

            return data;
        },
        submitEditDialog() {
            this.editDialog.isOpen = false;
            axios.put("/activities/",
                qs.stringify(this.getValidData())
            ).then(() => {
                this.processQuery(true);
            });
        },
        cleanQuery() {
            Object.keys(this.query).forEach((key) => {
                if (key == "developmentPhase" || key == "days")
                    this.query[key] = "全部";
                else
                    this.query[key] = "";
            });

            this.processQuery(true);
        },
        processQuery(skipVerify = false, fn = () => { }) {
            let queryParam = {};
            let process = false;

            Object.keys(this.query).forEach(key => {
                if (this.query[key]) {
                    queryParam[key] = this.query[key];
                    process = true;
                }
            });

            if (!skipVerify && !process)
                return;

            if (queryParam["developmentPhase"] == "全部")
                delete queryParam["developmentPhase"];

            if (queryParam["days"])
                switch (queryParam["days"]) {
                    case "一周内":
                        queryParam["days"] = "7";
                        break;
                    case "一月内":
                        queryParam["days"] = "30";
                        break;
                    case "半年内":
                        queryParam["days"] = "180";
                        break;
                    case "全部":
                        delete queryParam["days"];
                        break;
                }

            queryParam["pageNumber"] = this.page;
            queryParam["pageSize"] = this.pageSize.substring(0, 2);

            axios.get("/activities/", {
                params: queryParam
            }).then(response => {
                this.pages = response.data.data.pages;

                if (!this.pages) this.pages = 1;
                this.table = response.data.data.activities;
                this.table = [{
                    developmentPhase: "null",
                    activitySponsor: "null",
                    activityDate: "null",
                    activityType: "null",
                    appliedStudyHour: "null",
                }]

                this.$nextTick(() => {
                    let outer = document.querySelector("#data-table > div:nth-child(1) > div > div");
                    let val = - (outer.offsetWidth - outer.clientWidth) + 'px';
                    document.querySelector("#data-table > div:nth-child(1) > div > div").style.setProperty("--scrollbar-width", val);
                    document.querySelector("#data-table > div:nth-child(2) > div > div").style.setProperty("--scrollbar-width", val);
                    document.querySelector("#data-table > div:nth-child(3) > div > div").style.setProperty("--scrollbar-width", val);

                    outer = document.querySelector("#data-table > div:nth-child(2) > div > div");
                    val = outer.offsetHeight - outer.clientHeight + 'px';
                    document.querySelector("#data-table > div:nth-child(1) > div > div").style.setProperty("--scrollbar-height", val);
                    document.querySelector("#data-table > div:nth-child(2) > div > div").style.setProperty("--scrollbar-height", val);
                    document.querySelector("#data-table > div:nth-child(3) > div > div").style.setProperty("--scrollbar-height", val);

                    fn();
                });
            });

            if (true) {
                this.table = [{
                    activityNumber: "20230521003",
                    activityType: "培训活动",
                    activityName: "培训班",
                    developmentPhase: "入党申请人阶段",
                    activitySponsor: "浙江大学软件学院",
                    activityDate: "2023-05-21",
                    appliedStudyHour: "2",
                    state: "已参加",
                    remark: ""
                }]

                this.$nextTick(() => {
                    let outer = document.querySelector("#data-table > div:nth-child(1) > div > div");
                    let val = - (outer.offsetWidth - outer.clientWidth) + 'px';
                    document.querySelector("#data-table > div:nth-child(1) > div > div").style.setProperty("--scrollbar-width", val);
                    document.querySelector("#data-table > div:nth-child(2) > div > div").style.setProperty("--scrollbar-width", val);
                    document.querySelector("#data-table > div:nth-child(3) > div > div").style.setProperty("--scrollbar-width", val);

                    outer = document.querySelector("#data-table > div:nth-child(2) > div > div");
                    val = outer.offsetHeight - outer.clientHeight + 'px';
                    document.querySelector("#data-table > div:nth-child(1) > div > div").style.setProperty("--scrollbar-height", val);
                    document.querySelector("#data-table > div:nth-child(2) > div > div").style.setProperty("--scrollbar-height", val);
                    document.querySelector("#data-table > div:nth-child(3) > div > div").style.setProperty("--scrollbar-height", val);
                });
            }
        },
        toPage(e) {
            e.preventDefault();
            e.target.blur();

            let index = parseInt(e.target.innerText);

            if (index > 0 && index <= this.pages) {
                this.page = e.target.innerText;
            } else if (index > this.pages) {
                // Set to max page
                e.target.innerText = this.pages;
                this.page = this.pages;
            }
        },
        utcToDate(UTC) {
            return dayjs(UTC).format("YYYY-MM-DD");
        },
        timestampToString(timestamp) {
            let time = dayjs(timestamp);
            if (!time.isValid())
                return;

            return time.format("YYYY/MM/DD");
        }
    },
    computed: {
        isQueryEmpty() {
            return !Object.keys(this.query).some(key =>
                (key != "days" && key != "developmentPhase" && this.query[key]) ||
                ((key == "days" || key == "developmentPhase") && this.query[key] !== "全部")
            );
        }
    },
    watch: {
        page(newVal, oldVal) {
            this.processQuery(true);
        },
        pageSize(newVal, oldVal) {
            this.processQuery(true);
        }
    },
    mounted: function () {
        this.processQuery(true, () => {
            this.event = syncScroller(
                document.querySelector("#data-table > div:nth-child(1) > div > div"),
                document.querySelector("#data-table > div:nth-child(2) > div > div"),
                document.querySelector("#data-table > div:nth-child(3) > div > div")
            );
        });
    },
    destroyed() {
        this.event()
    }
}
</script>

<style lang="scss" scoped>
.date-picker {
    min-width: 150px;
}

:deep(#AnnounceDialog) {
    .ql-editor {
        min-height: 300px;

        p {
            font-family: "SimSun";
        }
    }

    #quill-toolbar .ql-font span[data-value="SimSun"]::before {
        font-family: "SimSun";
    }

    #quill-toolbar .ql-font span[data-value="Microsoft-YaHei"]::before {
        font-family: "Microsoft YaHei";
    }

    #quill-toolbar .ql-font span[data-value="KaiTi"]::before {
        font-family: "KaiTi";
    }

    #quill-toolbar .ql-font span[data-value="FangSong"]::before {
        font-family: "FangSong";
    }

    #quill-toolbar .ql-font span[data-value="Arial"]::before {
        font-family: "Arial";
    }

    #quill-toolbar .ql-font span[data-value="Times-New-Roman"]::before {
        font-family: "Times-New-Roman";
    }

    #quill-toolbar .ql-font span[data-value="sans-serif"]::before {
        font-family: "Sans Serif";
    }

    .ql-font-SimSun {
        font-family: "SimSun";
    }

    .ql-font-SimHei {
        font-family: "SimHei";
    }

    .ql-font-Microsoft-YaHei {
        font-family: "Microsoft YaHei";
    }

    .ql-font-KaiTi {
        font-family: "KaiTi";
    }

    .ql-font-FangSong {
        font-family: "FangSong";
    }

    .ql-font-Arial {
        font-family: "Arial";
    }

    .ql-font-Times-New-Roman {
        font-family: "Times New Roman";
    }

    .ql-font-sans-serif {
        font-family: "sans-serif";
    }
}

:deep(#data-table) {

    .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
    .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
        border: 0;
    }

    .data-table-inner {
        overflow: hidden;
        position: relative;

        tr {
            height: 56px;
        }

        .v-table__wrapper {
            height: 100% !important;
            overflow-y: visible;
            white-space: nowrap;
            position: absolute;
            left: 0;
        }
    }

    .data-table-left {

        .v-table__wrapper {
            overflow-x: hidden;
            right: var(--scrollbar-width);
            padding-bottom: var(--scrollbar-height);
        }
    }

    .data-table-center {
        box-shadow:
            inset 1px 0 0 rgba(var(--v-border-color), var(--v-border-opacity)),
            inset -1px 0 0 rgba(var(--v-border-color), var(--v-border-opacity));

        .v-table__wrapper {
            right: var(--scrollbar-width);
        }
    }

    .data-table-right {

        .v-table__wrapper {
            overflow-x: hidden;
            right: 0;
            padding-bottom: var(--scrollbar-height);
        }
    }
}

#data-table-footer {
    box-shadow: inset 0 1px 0 rgba(var(--v-border-color), var(--v-border-opacity))
}
</style>