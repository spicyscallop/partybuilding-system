<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="预备党员阶段" icon="mdi-book-open-variant" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row class="flex-grow-1">
                <v-dialog width="50%" v-model="editDialog.isOpen" persistent>
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-toolbar class="ml-5" color="white" title="发展阶段管理"></v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            学工号
                                            <v-text-field v-model="editDialog.data.userNumber" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            姓名
                                            <v-text-field v-model="editDialog.data.userName" class="ml-3" variant="outlined"
                                                density="compact" hide-details="auto" readonly></v-text-field>
                                        </v-col>

                                        <v-col cols="11" class="d-flex flex-row align-center">
                                            发展阶段
                                            <v-select v-model="editDialog.data.developmentPhase" class="ml-3"
                                                :items="['入党申请人阶段', '入党积极分子阶段', '发展对象阶段', '预备党员阶段']" variant="outlined"
                                                hide-details="auto" density="compact"></v-select>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            入党介绍人
                                            <v-text-field v-model="editDialog.data.cultivateContacts" class="ml-3"
                                                variant="outlined" density="compact" hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            预备党员接受时间（支部大会）
                                            <VDatePicker v-model="editDialog.data.branchPrepareTime"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            党校委派谈话时间
                                            <VDatePicker v-model="editDialog.data.committeeTalk"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            党委审批时间
                                            <VDatePicker v-model="editDialog.data.examineTime"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            思想汇报提交时间
                                            <VDatePicker v-model="editDialog.data.prepareThoughtReport"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            党校培训参与时间
                                            <VDatePicker v-model="editDialog.data.preparePartyTraining"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            提出转正申请时间
                                            <VDatePicker v-model="editDialog.data.applyFullTime"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            《群众意见调查表》提交时间
                                            <VDatePicker v-model="editDialog.data.probationaryPublicTime"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>

                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            转正时间
                                            <VDatePicker v-model="editDialog.data.branchFullTime"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col cols="5" class="d-flex flex-row align-center">
                                            党委转正审批时间
                                            <VDatePicker v-model="editDialog.data.committeeFullTime"
                                                :popover="datePicker.clickPop">
                                                <template #default="{ inputValue, inputEvents }">
                                                    <v-text-field class="date-picker"
                                                        prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                        density="compact" hide-details="auto" :value="inputValue"
                                                        @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                                </template>
                                            </VDatePicker>
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

                <v-col class="d-flex">
                    <v-sheet class="d-flex flex-grow-1" rounded="lg" max-width="100%">
                        <v-col class="d-flex flex-grow-1 flex-column">
                            <v-row class="flex-shrink-1 flex-grow-0 ma-0">
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">学工号</v-label>
                                    <v-text-field variant="outlined" density="compact" hide-details="auto"
                                        v-model="query.userNumber" @keydown.enter="processQuery"></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">姓名</v-label>
                                    <v-text-field variant="outlined" density="compact" hide-details="auto"
                                        v-model="query.userName" @keydown.enter="processQuery"></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">预备党员确定时间</v-label>
                                    <VDatePicker v-model="query.branchPrepareTime">
                                        <template #default="{ inputValue, inputEvents }">
                                            <v-text-field prepend-inner-icon="mdi-calendar-month" variant="outlined"
                                                density="compact" hide-details="auto" :value="inputValue"
                                                @keydown.enter="processQuery" v-on="inputEvents"></v-text-field>
                                        </template>
                                    </VDatePicker>
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
                                                    学工号
                                                </th>
                                                <th class="row-head-l3">
                                                    姓名
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in table" :key="item.userNumber">
                                                <th>
                                                    <v-checkbox-btn value="Jacob"></v-checkbox-btn>
                                                </th>
                                                <td>{{ item.userNumber }}</td>
                                                <td>{{ item.userName }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-col>
                                <v-col class="pa-0 fill-height" style="width: 0; flex: 1 1 0;">
                                    <v-table class="data-table-inner data-table-center fill-height" fixed-header>
                                        <thead>
                                            <tr class="text-center">
                                                <th style="width: 100px;">
                                                    入党介绍人
                                                </th>
                                                <th style="width: 150px;">
                                                    预备党员接受时间
                                                    <br />
                                                    （支部大会）
                                                </th>
                                                <th style="width: 150px;">
                                                    党委委派
                                                    <br />
                                                    谈话时间
                                                </th>
                                                <th style="width: 150px;">
                                                    党委审批
                                                    <br />
                                                    时间
                                                </th>
                                                <th style="width: 150px;">
                                                    思想汇报
                                                    <br />
                                                    提交时间
                                                </th>
                                                <th style="width: 150px;">
                                                    党校培训
                                                    <br />
                                                    参与时间
                                                </th>
                                                <th style="width: 150px;">
                                                    提出转正
                                                    <br />
                                                    申请时间
                                                </th>
                                                <th style="width: 150px;">
                                                    《群众意见调查表<br />
                                                    表》提交时间
                                                </th>
                                                <th style="width: 150px;">
                                                    转正时间
                                                    <br />
                                                    （支部大会）
                                                </th>
                                                <th style="width: 150px;">
                                                    党委转正
                                                    <br />
                                                    审批时间
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in table" :key="item.userNumber">
                                                <td>{{ item.cultivateContacts }}</td>
                                                <td>{{ timestampToString(item.branchPrepareTime) }}</td>
                                                <td>{{ timestampToString(item.committeeTalk) }}</td>
                                                <td>{{ timestampToString(item.examineTime) }}</td>
                                                <td>{{ timestampToString(item.prepareThoughtReport) }}</td>
                                                <td>{{ timestampToString(item.preparePartyTraining) }}</td>
                                                <td>{{ timestampToString(item.applyFullTime) }}</td>
                                                <td>{{ timestampToString(item.probationaryPublicTime) }}</td>
                                                <td>{{ timestampToString(item.branchFullTime) }}</td>
                                                <td>{{ timestampToString(item.committeeFullTime) }}</td>
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

import { syncScroller } from "@/plugins/utility.js"

function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
}

export default {
    components: {
        SubpageTitle
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
            stateMap: {
                "接收预备党员": [false, true, false, false, false, false, false, false, false, false],
                "上级党委派人谈话": [false, false, true, false, false, false, false, false, false, false],
                "党委审批通过": [false, false, false, true, false, false, false, false, false, false],
                "参加预备党员阶段党校培训班": [false, false, false, false, false, true, false, false, false, false],
                "提出转正": [false, false, false, false, false, false, true, false, false, false],
                "征求群众意见": [false, false, false, false, false, false, false, true, false, false],
                "预备党员转正": [false, false, false, false, false, false, false, false, true, false],
                "党委审批预备党员转正": [false, false, false, false, false, false, false, false, false, true],
                "变更身份为党员": [false, false, false, false, false, false, false, false, false, false],
            },
            editDialog: {
                isOpen: false,
                userNumber: 0,
                state: null,
                data: null,
                dataUnedited: null,
            },
            table: null,
            query: {
                userNumber: "",
                userName: "",
                branchPrepareTime: ""
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
            this.editDialog.state = this.table[index].state;
            this.editDialog.data = JSON.parse(JSON.stringify(this.table[index]));
            this.editDialog.dataUnedited = JSON.parse(JSON.stringify(this.table[index]));
        },
        getValidData() {
            let data = JSON.parse(JSON.stringify(this.editDialog.data));
            ["applyFullTime", "branchFullTime", "branchPrepareTime",
                "committeeFullTime", "committeeTalk", "examineTime",
                "preparePartyTraining", "prepareThoughtReport",
                "probationaryPublicTime"]
                .forEach((key) => {
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
            axios.post("/stages/prepare",
                qs.stringify(this.getValidData())
            ).then(() => {
                this.processQuery(true);
            });
        },
        cleanQuery() {
            Object.keys(this.query).forEach((key) => {
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

            if (queryParam["branchPrepareTime"])
                queryParam["branchPrepareTime"] = dayjs(queryParam["branchPrepareTime"]).format("YYYY-MM-DD");

            queryParam["pageNumber"] = this.page;
            queryParam["pageSize"] = this.pageSize.substring(0, 2);

            axios.get("/stages/prepare", {
                params: queryParam
            }).then(response => {
                this.pages = response.data.data.pages;
                if (!this.pages) this.pages = 1;
                this.table = response.data.data.prepareStageVOList;

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
        },
        toPage(e) {
            e.preventDefault();
            e.target.blur();

            let index = parseInt(e.target.innerText);

            if (!index) return;

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
                this.query[key]
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
    margin-left: auto;
    margin-right: 0px;
    max-width: 150px;
    width: 150px;
    min-width: 150px;
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