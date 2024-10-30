<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row style="height: 60px;">
                <v-col cols="8">
                    <SubpageTitle text="预备党员阶段" svg="/src/img/FZJD/发展党员.svg" width="43" height=43>
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
                            style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px;">
                        <span style="margin-left: 30px;">姓名</span><input placeholder="    请输入姓名"  v-model="queryItems.name"
                            style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px;">
                        <span style="margin-left: 30px;">预备党员确定时间</span>
                        <!-- <el-button></el-button> -->
                        <el-date-picker v-model="queryItems.applyTime" type="daterange" range-separator="——"
                            start-placeholder="Start date" end-placeholder="End date"
                            style="width: 300px;margin-left: 20px;" />
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
                        <el-button class="redBtn" style="margin-left: -10px;">批量更改发展阶段</el-button>
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
                        style="border-radius: 15px;background-color: #F7F7F7;"
                        :header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle">
                        <!-- 表格列定义 -->
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column v-if="visList[0]" prop="userId" label="学工号" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[1]" prop="name" label="姓名" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[2]" prop="conversationTime" label="党委委派谈话时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[3]" prop="reviewTime" label="支部委员会审查" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[4]" prop="pre_approvalTime" label="上级党委预审" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[5]" prop="approvalTime" label="党委审批时间" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[5]" prop="submissionTime" label="思想汇报提交时间" align='center'>
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

<script src="./YBDYView.js"> 

</script>

<style src="./YBDYView.css"></style>
<style src="../Common.css"></style>