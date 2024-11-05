<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <el-dialog v-model="dialogVisible" title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量管理发展阶段" width="600" draggable align-center>
                <div style="margin: 0px 20px;">
                    <span>选择以下人员</span>
                    <div style="width: 100%;height: 300px;">
                        <el-table :data="satifyStus" :header-row-style="headerRowStyle" :row-style="rowStyle"
                            @selection-change="handleSelectionChange2"
                            :header-cell-style="headerRowStyle" max-height="300px">
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
                        <el-button class="redBtn" type="primary" @click="changeStuPhase">确定</el-button>
                        <el-button class="whiteBtn" @click="dialogVisible = false">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <v-row style="height: 60px;">
                <v-col cols="8">
                    <SubpageTitle text="正式党员阶段" svg="/src/img/FZJD/发展党员.svg" width="43" height=43>
                    </SubpageTitle>
                </v-col>
                <v-col cols="4">
                    <DropDownBox :options="options" style="float:right;" @optionChange="handleOptionChange">
                    </DropDownBox>
                    <div style="display: inline-block; float:right; margin-top: 5px;margin-right: 10px;"><span
                            style="">支部选择</span></div>
                    <img src="/src/img/FZJD/支部选择.png" alt="支部选择"
                        style=" margin-top: 6px;margin-left:0px;width:23px;height=23px; float:right;">
                </v-col>
            </v-row>
            <v-row style="height: 80px;">
                <div
                    style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
                    <v-col cols="10">
                        <span style="margin-left: 30px;">学工号</span><input placeholder="    请输入学工号"  v-model="queryItems.userId"
                            style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                        <span style="margin-left: 30px;">姓名</span><input placeholder="    请输入姓名"  v-model="queryItems.name"
                            style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                        <span style="margin-left: 30px;">正式党员确认时间</span>
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
            <v-row style="height: 100px;">
                <div style="padding-top: 10px;display: flex; width: 100%;">
                    <v-col cols="10">
                        <el-button class="redBtn" style="margin-left: -10px;" @click="showDialog">批量更改发展阶段</el-button>
                        <el-button class="whiteBtn" style="border-color: #A5A5A5;">添加人员信息</el-button>
                    </v-col>
                    <v-col cols="2">
                        <AttributeSelection :optionList=colNames style="display: inline-block;float: right;"
                            @optionChange="changeCheckCols"></AttributeSelection>
                    </v-col>
                </div>
            </v-row>
            <v-row class="d-flex flex-column h-100">
                <!-- 设置一个占满剩余空间的 div -->
                <div class="flex-grow-1 overflow-auto">
                    <el-table ref="multipleTable" :data="tableData" max-height="80vh"
                        :key="tableKey"
                        style="border-radius: 15px;background-color: #F7F7F7;" 
                        :header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle">
                        <!-- 表格列定义 -->
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column v-if="visList[0]" prop="userId" label="学工号" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[1]" prop="name" label="姓名" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[2]" prop="tableTime" label="《群众意见调查表》提交时间" min-width="100px" align='center' >
                        </el-table-column>
                        <el-table-column v-if="visList[3]" prop="applyTime" label="提出转正申请时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[4]" prop="branchMeetingTime" label="支部大会时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[5]" prop="approvalTime" label="党委审批时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[6]" prop="reportTime" label="思想汇报提交时间" align='center'>
                        </el-table-column>
                    </el-table>
                </div>
            </v-row>
            <v-row style="background-color: #E9E9E9;">
                <v-col cols="5">
                    <el-button class="redBtn" style="margin-left: 30px;">编辑</el-button>
                    <el-button class="whiteBtn" style="border-color: #A5A5A5;">删除</el-button>
                </v-col>
                <v-col cols="7">
                    <div style="display: inline-block;float: right;">
                        <div style="display: inline-block;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList" background
                                :page-size="queryItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>


<script setup>
import { ref } from 'vue';
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import { ArrowDown } from '@element-plus/icons-vue';


const dialogVisible = ref(false)
const applyTime = ref('');
const tableBottom = ref({
    totalNum: 100,
    pageSizeList: [10, 20, 30, 40]
});
const queryItems = ref({
    userId: "",
    name: "",
    applyTime: "",
    branchSelect: "",
    pageIndex: 1,
    pageSize: 10,
});
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
const checkedCols = ref(['学工号', '姓名', '《群众意见调查表》提交时间', '提出转正申请时间', '支部大会时间', '党委审批时间','思想汇报提交时间']);
const colNames = ref(['学工号', '姓名', '《群众意见调查表》提交时间', '提出转正申请时间', '支部大会时间', '党委审批时间','思想汇报提交时间']);
const visList = ref([true, true, true, true, true, true, true]);
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
        tableTime: '2021-09-10',
        applyTime: '2021-09-10',
        branchMeetingTime: '2021-10-10',
        approvalTime: '2021-09-10',
        reportTime: '2021-09-10',
    }
]);

// 批量更改发展阶段方法
const showDialog = () => {
    // TODO 向服务器查询可以转正的人员赋值给satifyStus
    dialogVisible.value = true
}
const queryList = () => {
    console.log("执行了查询列表的请求");
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
const handleOptionChange = (newOption) => {
    console.log('选项变化：', newOption);
    selectedOption.value = newOption;
};
const tableKey = ref(0)

const handleCheckChange = () => {
    console.log("处理表格列变动：", checkedCols.value);
    for (let i = 0; i < colNames.value.length; i++){
        visList.value[i]= true
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
const handleCommand = (command) => {
    console.log(command);
    selectedOption.value = command;
};
const toggleSelection = (rows) => {
    if (rows) {
        rows.forEach(row => {
            $refs.multipleTable.toggleRowSelection(row);
        });
    } else {
        $refs.multipleTable.clearSelection();
    }
};
const handleSelectionChange = (val) => {
    multipleSelection = val;
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
</script>



<style src="./ZSDYView.css"></style>
<style src="../Common.css"></style>