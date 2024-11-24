<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <el-dialog v-model="dialogVisible" title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量管理发展阶段" width="600" draggable
                align-center>
                <div style="margin: 0px 20px;">
                    <span>选择以下人员</span>
                    <div style="width: 100%;height: 300px;">
                        <el-table :data="satifyStus" :header-row-style="headerRowStyle" :row-style="rowStyle"
                            @selection-change="handleSelectionChange2" :header-cell-style="headerRowStyle"
                            max-height="300px">
                            <el-table-column type="selection" width="30px">
                            </el-table-column>
                            <el-table-column prop="userId" label="学工号" align='center'>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" align='center'>
                            </el-table-column>
                            <el-table-column prop="isSatify" label="是否满足推优条件" align='center'>
                            </el-table-column>
                        </el-table>
                    </div>
                    <span>是否选择将上述人员转入下一阶段</span>
                </div>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button class="redBtn" type="primary" @click="changeStuPhase">提交</el-button>
                        <el-button class="whiteBtn" @click="dialogVisible = false">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <v-row style="height: 60px;">
                <v-col cols="8">
                    <SubpageTitle text="入党申请人阶段" svg="/src/img/FZJD/发展党员.svg" width=43 height=43>
                    </SubpageTitle>
                </v-col>
                <v-col cols="4">
                    <el-select v-model="selectedOption" placeholder="支部选择" size="large"
                        style="width: 200px;float: right;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <div style="display: inline-block; float:right; margin-top: 5px;margin-right: 10px;"><span
                            style="">支部选择</span>
                    </div>
                    <img src="/src/img/FZJD/支部选择.png" alt="支部选择"
                        style=" margin-top: 6px;margin-left:0px;width:23px;height:23px; float:right;">
                </v-col>
            </v-row>
            <v-row v-if="!goTo.visiblePersonView" style="height: 80px;">
                <div
                    style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
                    <v-col cols="10">
                        <span style="margin-left: 30px;">学工号</span><input placeholder="    请输入学工号"
                            v-model="queryItems.userId"
                            style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px;width: 10%;">
                        <span style="margin-left: 30px;">姓名</span><input placeholder="    请输入姓名"
                            v-model="queryItems.name"
                            style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px;width: 10%;">
                        <span style="margin-left: 30px;">申请书递交时间</span>
                        <!-- <el-button></el-button> -->
                        <el-date-picker v-model="queryItems.applyTime" type="daterange" range-separator="——"
                            start-placeholder="Start date" end-placeholder="End date"
                            style="width: 25%;margin-left: 20px;" />
                    </v-col>
                    <v-col cols="2">
                        <el-button class="redBtn" @click="queryList">查询</el-button>
                        <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
                    </v-col>
                </div>
            </v-row>
            <v-row v-if="!goTo.visiblePersonView" style="height: 100px;">
                <div style="padding-top: 10px;display: flex; width: 100%;">
                    <v-col cols="10">
                        <el-button class="redBtn" @click="showDialog" style="margin-left: -10px;">批量更改发展阶段</el-button>
                        <el-button class="whiteBtn" style="border-color: #A5A5A5;"
                            @click="goToAddPersonView">添加人员信息</el-button>
                    </v-col>
                    <v-col cols="2">
                        <!-- 属性筛选 -->
                        <AttributeSelection :optionList=colNames style="display: inline-block;float: right;"
                            @optionChange="changeCheckCols"></AttributeSelection>
                    </v-col>
                </div>
            </v-row>
            <v-row v-if="!goTo.visiblePersonView" class="d-flex flex-column h-100">
                <!-- 设置一个占满剩余空间的 div -->
                <div class="flex-grow-1 overflow-auto">
                    <el-table ref="multipleTable" :data="tableData" max-height="80vh" :key="tableKey"
                        style="border-radius: 15px;background-color: #F7F7F7;" :header-row-style="headerRowStyle"
                        @selection-change="handleSelectionChange" :row-style="rowStyle"
                        :header-cell-style="headerRowStyle">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column v-if="visList[0]" prop="userNumber" label="学工号" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[1]" prop="userName" label="姓名" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[2]" prop="deliveryTime" label="入党申请书递交时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[3]" prop="talker" label="谈话人" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[4]" prop="talkRegistrationTime" label="《入党申请人谈话登记表》提交时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[5]" prop="isLeague" label="团员身份"
                            align='center'>
                        </el-table-column>
                    </el-table>
                </div>
            </v-row>
            <v-row v-if="!goTo.visiblePersonView" style="background-color: #E9E9E9;">
                <v-col cols="5">
                    <el-button class="redBtn" style="margin-left: 30px;" @click="goToEditPage">编辑</el-button>
                    <el-button class="whiteBtn" style="border-color: #A5A5A5;">删除</el-button>
                </v-col>
                <v-col cols="7">
                    <div style="display: inline-block;float: right;">
                        <div style="display: inline-block;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList"
                                background :page-size="queryItems.pageSize"
                                layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="goTo.visiblePersonView" class="fill-height">
                <AddPersonView v-if="goTo.subPage==0" @backMainPage="backMainPage" :pageType="goTo.pageType" :formData="goTo.data">
                </AddPersonView>
                <EditPersonView v-if="goTo.subPage==1" @backMainPage="backMainPage" :pageType="goTo.pageType" :formData="goTo.data">
                </EditPersonView>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SubpageTitle from '@/components/SubpageTitle.vue'
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue'
import AddPersonView from '@/views/teacher/FZGLViews/RDSQ/subPage/AddPersonView.vue'
import EditPersonView from '@/views/teacher/FZGLViews/RDSQ/subPage/EditPersonView.vue'
import { ElMessage } from 'element-plus'
import axios from 'axios';

//页面显示变量
const goTo = ref({
    visiblePersonView: false,
    subPage : 1,
    pageType: 'Add',
    data: null
});

const dialogVisible = ref(false)

const queryItems = ref({
    userId: "",
    name: "",
    applyTime: [],
    branchSelect: "",
    pageIndex: 1,
    pageSize: 10,
});

const tableBottom = ref({
    currentPage: 1,
    totalNum: 100,
    pageSizeList: [10, 20, 30, 40]
});

const checkedCols = ref(['学工号', '姓名', '入党申请书递交时间', '谈话人', '《入党申请人谈话登记表》提交时间', '团员身份']);
const colNames = ref(['学工号', '姓名', '入党申请书递交时间', '谈话人', '《入党申请人谈话登记表》提交时间', '团员身份']);
const visList = ref([true, true, true, true, true, true]);
const selectedOption = ref('请选择党支部');
const options = ref([
    { label: '第一党支部', value: '第一党支部' },
    { label: '第二党支部', value: '第二党支部' },
    { label: '第三党支部', value: '第三党支部' },
    { label: '第四党支部', value: '第四党支部' }
]);
const tableData = ref([
    {
        userId: '22351006',
        name: '郭宗豪',
        applyTime: '2021-09-10',
        talkerName: 'hgfhf',
        talkerTime: '2021-10-10',
        isCommunistYouthLeagueMember: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        applyTime: '2021-09-10',
        talkerName: 'hgfhf',
        talkerTime: '2021-10-10',
        isCommunistYouthLeagueMember: '是'
    }
    // 更多数据...
]);
const selectStus = ref([])

const satifyStus = ref([
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    {
        userId: '22351006',
        name: '郭宗豪',
        isSatify: '是'
    },
    {
        userId: '22351007',
        name: '鲁兴',
        isSatify: '是'

    },
    // 更多数据...
])

const selectStu = ref({})

// 批量更改发展阶段方法
const showDialog = () => {
    // TODO 向服务器查询可以转正的人员赋值给satifyStus
    dialogVisible.value = true
}

const handleSelectionChange2 = (selection) => {
    selectStus.value = selection
};

const changeStuPhase = () => {
    console.log("批准一下同学修改发展阶段", selectStus.value)
}
// 主页方法
const handleSelectionChange = (selection) => {
    selectStus.value = selection
    selectStu.value = selection[0]
};

const goToAddPersonView = () => {
    goTo.value.pageType = "Add"
    goTo.value.data = {
        userId: '',
        name: '',
        isParty: '',
        talkerName: '',
        applyTime: '',
        submitTime: ''
    }
    goTo.value.subPage = 0
    goTo.value.visiblePersonView = true;
};

const goToEditPage = () => {
    if (selectStus.value.length != 1) {
        console.log(selectStus.value.length)
        ElMessage({
            message: '请选择一名要修改的用户',
            type: 'warning',
        })
    } else {
        goTo.value.pageType = "Edit"
        goTo.value.data = selectStu.value
        goTo.value.subPage = 0
        goTo.value.visiblePersonView = true;
        console.log(selectStus.value[0].name)
    }
}

const backMainPage = () => {
    console.log("change");
    goTo.value.visiblePersonView = false;
};

const queryList = () => {
    // TODO 执行查询列表的请求（需携带相应的参数），并修改tableBottom
    console.log("执行了查询列表的请求");
    console.log('queryItems: ', queryItems)
    const data = {
        page: {
          pageNumber: tableBottom.value.currentPage,
          pageSize: queryItems.value.pageSize,
          searchCount: true,
        },
        userNumber: queryItems.value.userId,
        userName: queryItems.value.name,
        startActivistsSetTime: queryItems.value.applyTime[0] || null,
        endActivistsSetTime: queryItems.value.applyTime[1] || null,
        developmentPhase: "入党申请人"
        // developmentPhase: '积极分子'
    };
    console.log('查询数据', data)
    axios.post('/stage/page', data)
        .then(response => {
        console.log('查询到的数据: ', response.data.data.records)
        tableData.value = response.data.data.records;
        tableBottom.value.totalNum = response.data.data.total;
        console.log('tableData', tableData)
        console.log('tableBottom', tableBottom)
        })
        .catch(error => {
        console.error('请求失败:', error);
        });
};

const clearInputMessage = () => {
    queryItems.value.userId = "";
    queryItems.value.name = "";
    queryItems.value.applyTime = "";
};

const changeCheckCols = (indexList) => {
    console.log("cols变化");
    let new_checkedCols = [];
    for (let i = 0; i < indexList.length; i++) {
        new_checkedCols.push(colNames.value[indexList[i]]);
    }
    checkedCols.value = new_checkedCols;
    handleCheckChange();
};

const tableKey = ref(0)

const handleCheckChange = () => {
    console.log("处理表格列变动：", checkedCols.value);
    for (let i = 0; i < colNames.value.length; i++) {
        visList.value[i] = true
    }
    for (let i = 0; i < colNames.value.length; i++) {
        let flag = false;
        for (let j = 0; j < checkedCols.value.length; j++) {
            if (colNames.value[i] === checkedCols.value[j]) {
                flag = true;
                break;
            }
        }
        visList.value[i] = flag;
        // 用于更新表格
        tableKey.value += 1;
    }
};

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

const rowStyle = ({ row, rowIndex }) => {
    return {
        color: '#3E3E3E',
        backgroundColor: '#F7F7F7',
        border: '#2E2E2E'
    };
};

const headerRowStyle = () => {
    return {
        backgroundColor: '#F7F7F7',
        color: '#3E3E3E',
    };
};

onMounted(() => {
    console.log('初始化页面,查询数据')
    queryList();
});
</script>


<style src="../Common.css"></style>
<style src="@/style/button.css"></style>