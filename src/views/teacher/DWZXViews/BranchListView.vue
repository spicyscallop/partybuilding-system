<template>
  <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
      <v-col class="d-flex fill-height flex-column">
          <v-row style="height: 60px;">
              <v-col cols="8">
                  <SubpageTitle text="支部列表" svg="/src/img/FZJD/发展党员.svg" width="43" height=43>
                  </SubpageTitle>
              </v-col>
          </v-row>
          <v-row style="height: 80px;">
              <div
                  style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
                  <v-col cols="10">
                      <span style="margin-left: 30px;">支部名称</span><input placeholder="    请输入"  v-model="queryItems.partyName"
                          style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                      <span style="margin-left: 30px;">支部书记</span><input placeholder="    请输入"  v-model="queryItems.secretaryName"
                          style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px;width: 10%;">
                        <span style="margin-left: 30px;">学生姓名</span><input placeholder="    请输入"  v-model="queryItems.studentName"
                    style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px;width: 10%;">
                  </v-col>
                  <v-col cols="2">
                      <el-button class="redBtn">查询</el-button>
                      <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
                  </v-col>
              </div>
          </v-row>
          <v-row style="height: 100px;">
              <div style="padding-top: 10px;display: flex; width: 100%;">
                  <v-col cols="10">
                      <el-button class="redBtn" style="margin-left: -10px;">添加支部</el-button>
                  </v-col>
                  
              </div>
          </v-row>
          <v-row class="d-flex flex-column h-100">
              <!-- 设置一个占满剩余空间的 div -->
              <div class="flex-grow-1 overflow-auto">
                  <el-table ref="multipleTable" :data="tableData" max-height="80vh"
                      style="border-radius: 15px;background-color: #F7F7F7;"
                      :key="tableKey"
                      :header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle">
                      <!-- 表格列定义 -->
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <el-table-column prop="branchName" label="支部名称" align='center'>
                      </el-table-column>
                      <el-table-column prop="secretaryName" label="支部书记" align='center'>
                      </el-table-column>
                      <el-table-column prop="partyMemberCount" label="党员数量" align='center'>
                      </el-table-column>
                      <el-table-column label="操作" align='center'>
                        <template #default="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
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

<!-- <script src="./FZDXView.js">

</script> -->
<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import { ArrowDown } from '@element-plus/icons-vue';

export default {
    components: {
      SubpageTitle,
      AttributeSelection,
      ArrowDown
    },
    data() {
        return {
            queryItems: {
                branchName: "",
                secretaryName: "",
                studentName: "",
                pageIndex: 1,
                pageSize: 10,
            },
            tableData: [
                { branchName: '第一党支部', secretaryName: '张三', partyMemberCount: 30 },
                { branchName: '第二党支部', secretaryName: '李四', partyMemberCount: 30 },
                { branchName: '第三党支部', secretaryName: '王五', partyMemberCount: 30 },
                { branchName: '第四党支部', secretaryName: '赵六', partyMemberCount: 30 },
            ],
            tableBottom: {
                totalNum: 100,
                pageSizeList: [10, 20, 30, 40]
            },
        }
    },
    methods: {
        clearInputMessage() {
            queryItems.value.userId = "";
            queryItems.value.name = "";
            queryItems.value.applyTime = "";
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            queryItems.value.pageSize = val;
            queryList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            queryItems.value.pageIndex = val;
            queryList();
        },
        rowStyle({ row, rowIndex }) {
            return {
                color: '#3E3E3E',
                backgroundColor: '#F7F7F7',
                border: '#2E2E2E'
            };
        },
        headerRowStyle() {
            return {
                backgroundColor: '#F7F7F7',
                color: '#3E3E3E',
            }
        }
    }
};
</script>

<style scoped>
@import "./Common.css";
</style>