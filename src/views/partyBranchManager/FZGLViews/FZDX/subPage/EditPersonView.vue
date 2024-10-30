<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <el-dialog v-model="dialogVisible" title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入党介绍人选择" width="850" height="600"
            draggable align-center>
            <div style="margin: 0px 20px;">
                <v-row>
                    <v-col cols="9" style="background-color: white;">
                        <div class="flex-grow-1 overflow-auto">
                            <div
                                style="background-color: #F35339; border-radius: 10px; height: 50px; display: flex; align-items: center; margin-bottom: 10px;">
                                <span style="color: #ffffff;margin: 0 20px;font-size: 16px;">权限</span>
                                <el-select v-model="queryItems.userType" placeholder="用户类型" size="normal"
                                    style="width: 200px;margin: 0 10px;">
                                    <el-option v-for="item in userTypes" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                                <el-button class="redBtn" size="normal" type="primary" style="margin-left: 30px"
                                    @click="">查询</el-button>
                                <el-button class="whiteBtn" size="normal" @click="">清除</el-button>
                            </div>
                            <el-table ref="multipleTable" :data="tableData" max-height="400" :key="tableKey"
                                style="border-radius: 15px;background-color: #F7F7F7;"
                                @selection-change="handleSelectionChange"
                                >
                                <el-table-column type="selection">
                                </el-table-column>
                                <el-table-column prop="userId" label="学工号" align='center'>
                                </el-table-column>
                                <el-table-column prop="name" label="姓名" align='center'>
                                </el-table-column>
                                <el-table-column prop="phoneNumber" label="手机号码" align='center'>
                                </el-table-column>
                            </el-table>
                            <div style="display: inline-block;margin-top: 10px;">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                    :current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList"
                                    background :page-size="queryItems.pageSize" small :pager-count="3"
                                    layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
                                </el-pagination>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="3" style="background-color: white;">
                        <v-row style="margin-top: 20px;margin-left: 3px;">
                            <span>已选人员(</span>
                            <span style="color: #2B99FF;">{{ checkNum }}</span>
                            <span>)</span>
                        </v-row>
                        <v-row>
                            <el-table :data="checkedPersons" style="width: 100%" max-height="250">
                                <el-table-column prop="name" label=""/>
                                <el-table-column prop="phoneNumber" label="" width="120" />
                            </el-table>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button class="redBtn" type="primary" @click="choosePersons">提交</el-button>
                    <el-button class="whiteBtn" @click="dialogVisible = false">取消</el-button>
                </div>
            </template>
        </el-dialog>
        <v-row class="d-flex justify-space-around mb-6" style="height: 10%;background-color: #ffffff;margin-top: 20px;">
            <v-col cols="4">
                <span style="color: red;margin-left: 30px;">*</span><span>学工号</span><input required disabled
                    class="disableInput"
                    v-model="localFormData.userId">
            </v-col>
            <v-col cols="4">
                <span style="color: red;margin-left: 30px;">*</span><span>姓名</span><input required disabled
                    class="disableInput"
                    v-model="localFormData.name">
            </v-col>
            <v-col cols="4">
                <span style="color: red;">*</span><span style="margin-right: 10px;">团员身份</span>
                <el-select v-model="localFormData.isCommunistYouthLeagueMember" :placeholder="placeholder" size="large" style="width: 200px" disabled>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col style="background-color: #f7f7f7; height: 60%;padding: 20px;border-radius: 20px;">
            <v-row>
                <v-col spans="6">
                    <div style="margin-bottom: 5px;"><span>《群众意见调查表》提交时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.qzyjdcbTime" type="date" placeholder="yyyy-mm-dd" size="large"
                        style="width: 90%;" />
                    </div>
                </v-col>
                <v-col spans="6">
                    <div style="margin-bottom: 5px;"><span>《班主任导师意见表》提交时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.bzrdsyjTime" type="date" placeholder="yyyy-mm-dd" size="large"
                        style="width: 90%;" />
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col spans="6">
                    <div style="margin-bottom: 5px;"><span>支委会确认为发展对象时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.zhiweihuiquerenFZDXTime" type="date" placeholder="yyyy-mm-dd" size="large"
                        style="width: 90%;" />
                    </div>
                </v-col>
                <v-col spans="6">
                    <div style="margin-bottom: 5px;"><span>《入党对象政治审查综合表》提交时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.rddxzzsczhbTime" type="date" placeholder="yyyy-mm-dd" size="large"
                        style="width: 90%;" />
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col spans="6">
                    <div style="margin-bottom: 5px;"><span>发展对象备案时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.fzdxbanTime" type="date" placeholder="yyyy-mm-dd" size="large"
                        style="width: 90%;" />
                    </div>
                </v-col>
                <v-col spans="6">
                    <div style="margin-bottom: 5px;"><span>党校培训班参与时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.dxpxTime" type="date" placeholder="yyyy-mm-dd" size="large"
                        style="width: 90%;" />
                    </div>
                </v-col>
            </v-row>

            <v-row style="width: 100%;margin-top: 30px;">
                <v-col cols="6">
                    <div style="margin-bottom: 5px;"><span>入党介绍人</span></div>
                    <div>
                        <input class="customInput" placeholder="" v-model="pageFormData.rdjsr"
                        @click="clickTalkersInput" style="width: 92%;margin-left: -0px;">
                    </div>
                </v-col>
                <v-col cols="3" style="padding-left: 30px">
                    <div style="margin-bottom: 5px;"><span>思想汇报提交时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.sxhbtjTime" type="date" placeholder="yyyy-mm-dd" size="large" 
                        style="width: 90%;" />
                    </div>
                </v-col>
                <v-col cols="3">
                    <div style="margin-bottom: 5px;"><span>下次应提交时间</span></div>
                    <div>
                        <el-date-picker v-model="pageFormData.xcytjTime" type="date" placeholder="系统自动接入" size="large" disabled
                        style="width: 90%;" />
                    </div>
                </v-col>
            </v-row>
            <v-row class="fill-height" style="width: 100%;">

            </v-row>
        </v-col>
        </v-row>
        
        <v-row style="height: 20%;width: 100%;">
            <v-col cols="7">
            </v-col>
            <v-col cols="5">
                <el-button class="whiteBtn" type="primary" style="margin-left: 20px; height: 36px; float: right;"
                    @click="$emit('backMainPage')">取消</el-button>
                <el-button class="redBtn" type="primary"
                    style="margin-left: 20px; height: 36px;float: right;">保存</el-button>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus'
const props = defineProps({
    pageType: {
        type: String,
        default: "Edit"
    },
    formData: {
        type: Object,
        default: () => ({
        userId: '',
        name: '',
        fzdxqdTime: '',
        fzdxbanTime: '',
        rdjsr: '',
        dxpxTime: '',
        rddxzhbTime: '',
        sxhbTime: '',
        qzyjdcbTime: '',
        bzrdsyjTime: '',
        isCommunistYouthLeagueMember: '是'
        })
    }
})

// Creating a mutable local state from props.formData
const localFormData = ref({...props.formData})

const checkNum = ref(0)
const totalNum = ref(2)

//我的建议是根据学号发送一个请求来获得这些时间
const pageFormData = ref({
    qzyjdcbTime: '',
    bzrdsyjTime: '',
    zhiweihuiquerenFZDXTime: '',
    rddxzzsczhbTime: '',
    fzdxbanTime: '',
    dxpxbcyTime: '',
    rdjsr: '',
    sxhbtjTime: '',
    xcytjTime:'2020-12-29',
})

const checkedPersons = ref([
    {
        name: '郭宗豪',
        phone: '17357191229'
    },
    {
        name: '鲁兴',
        phone: '12324352234'
    }
]);

const choosePersons = () =>{
    var names = ""
    for(var i=0;i<checkedPersons.value.length-1;i++){
        names = names+checkedPersons.value[i].name+"，"
    }
    if (checkedPersons.value.length>0){
        names = names+checkedPersons.value[i].name
    }
    localFormData.value.rdjsr = names
    dialogVisible.value = false
    checkedPersons.value = []
}

const queryItems = ref({
    userType: '',
    pageSize: ''
});

const tableBottom = ref({
    totalNum: 100,
    pageSizeList: [10, 20, 30, 40]
});

const handleSelectionChange = (selection) => {
    console.log(selection)

    checkedPersons.value = selection
    checkNum.value = selection.length

};

const userTypes = ref([
    { label: '非党员学生', value: '非党员学生' },
    { label: '党员学生', value: '党员学生' },
    { label: '支部书记', value: '支部书记' },
    { label: '院党委/团委', value: '院党委/团委' },
    { label: '系统管理员', value: '系统管理员' }
]);

const dialogVisible = ref(false)


const options = ref([
    { value: '是', label: '是' },
    { value: '否', label: '否' }
])

const tableData = ref([
    {
        userId: '22351006',
        name: '郭宗豪',
        phoneNumber: "17342627342"
    },
    {
        userId: '22351007',
        name: '鲁兴',
        phoneNumber: "12345678905"
    },
    {
        userId: '22351006',
        name: '郭宗豪',
        phoneNumber: "17342627342"
    },
    {
        userId: '22351007',
        name: '鲁兴',
        phoneNumber: "12345678905"
    },
    {
        userId: '22351006',
        name: '郭宗豪',
        phoneNumber: "17342627342"
    },
    {
        userId: '22351007',
        name: '鲁兴',
        phoneNumber: "12345678905"
    },
    {
        userId: '22351006',
        name: '郭宗豪',
        phoneNumber: "17342627342"
    },
    {
        userId: '22351007',
        name: '鲁兴',
        phoneNumber: "12345678905"
    },
    {
        userId: '22351006',
        name: '郭宗豪',
        phoneNumber: "17342627342"
    },
    {
        userId: '22351007',
        name: '鲁兴',
        phoneNumber: "12345678905"
    },
    {
        userId: '22351006',
        name: '郭宗豪',
        phoneNumber: "17342627342"
    },
    {
        userId: '22351007',
        name: '鲁兴',
        phoneNumber: "12345678905"
    },
    // 更多数据...
]);


const phaseOptions = ref([
    { label: '共青团员', value: '共青团员' },
    { label: '入党申请人', value: '入党申请人' },
    { label: '积极分子', value: '积极分子' },
    { label: '发展对象', value: '发展对象' },
    { label: '预备党员', value: '预备党员' },
    { label: '正式党员', value: '正式党员' },
])

const clickTalkersInput = () => {
    console.log("点击了谈话人")
    dialogVisible.value = true
}

const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
    queryItems.value.pageSize = val;
    queryList();
};

const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    queryItems.value.pageIndex = val;
    queryList();
};

</script>

<style>
.disableInput {
    cursor: not-allowed;
    margin-left: 10px;
    font-size: 15px;
    width: 200px;
    height: 40px;
    border: 1px solid #ccc;
    /* 外边框样式 */
    border-radius: 5px;
    /* 可选的，添加圆角 */
    background-color: #E3E3E3;
}

.customInput {
    margin-left: 10px;
    background-color: white;
    font-size: 15px;
    width: 200px;
    height: 40px;
    border: 1px solid #ccc;
    /* 外边框样式 */
    border-radius: 2px;
    /* 可选的，添加圆角 */
}

.el-select {
    --el-select-input-focus-border-color: #red !important;
}

.el-select__placeholder.is-transparent {
    color: #3E3E3E;
}

.el-select-dropdown__item {
    align-self: center;
}

.el-select-dropdown__item.is-hovering {
    background-color: #C83C23;
    color: #fff;
}

.checkFileBtn {
    background-color: #37A0FF;
    border: none;
}

.el-select__wrapper.is-focused.el-tooltip__trigger.el-tooltip__trigger {
    background-color: #F7F7F7;
}

input {
    text-indent: 5px;
}
</style>

<style src="@/style/button.css"></style>