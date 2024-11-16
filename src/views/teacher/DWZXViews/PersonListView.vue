<template>
  <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
      <v-col class="d-flex fill-height flex-column">
          <v-row style="height: 60px;">
              <v-col cols="8">
                  <SubpageTitle text="人员列表" width="43" height=43>
                  </SubpageTitle>
              </v-col>
              <v-col cols="4">
                  <DropDownBox :options="options" style="float:right;" @optionChange="handleOptionChange">
                  </DropDownBox>
                  <div style="display: inline-block; float:right; margin-top: 5px;margin-right: 10px;"><span
                          style="">发展阶段</span></div>
                  <img src="/src/img/FZJD/支部选择.png" alt="支部选择"
                      style=" margin-top: 6px;margin-left:0px;width:23px;height:23px; float:right;">
              </v-col>
          </v-row>
          <v-row style="height: 80px;">
              <div
                  style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
                  <v-col cols="10">
                      <span style="margin-left: 30px;">支部名称</span><input placeholder="    请输入"  v-model="queryItems.branchName"
                          style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                      <span style="margin-left: 30px;">支部书记</span><input placeholder="    请输入姓名"  v-model="queryItems.branchSecretary"
                          style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
                      <span style="margin-left: 30px;">人员姓名</span><input placeholder="    请输入姓名"  v-model="queryItems.name"
                      style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
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
                      <el-button class="redBtn" style="border-color: #A5A5A5;">添加人员信息</el-button>
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
                      <el-table-column v-if="visList[0]" prop="userId" label="学工号" align='center' width="100">
                      </el-table-column>
                      <el-table-column v-if="visList[1]" prop="name" label="姓名" align='center' width="180">
                      </el-table-column>
                      <el-table-column v-if="visList[2]" prop="isLeagueMember" label="团员身份" min-width="100px" align='center' :formatter=formatter width="80">
                      </el-table-column>
                      <el-table-column v-if="visList[3]" prop="developmentStage" label="发展阶段" align='center' width="140">
                      </el-table-column>
                      <el-table-column v-if="visList[4]" prop="branch" label="所在支部" align='center' width="260">
                      </el-table-column>
                      <el-table-column v-if="visList[5]" prop="branchSecretary" label="支部书记" align='center' width="130">
                      </el-table-column>
                      <el-table-column label="操作" align='center' width="200">
                        <template #default="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            class="redBtn"
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


<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import { ArrowDown } from '@element-plus/icons-vue';

/**
 * 党员发展阶段
 */
const DevelopmentStage = {
  FormalPartyMember: '正式党员',
  ProbationaryPartyMember: '预备党员',
  DevelopmentTarget: '发展对象',
  Activist: '积极分子',
  Applicant: '入党申请人',
  LeagueMember: '共青团员'
};



export default {
  components: {
      SubpageTitle,
      DropDownBox,
      AttributeSelection,
      ArrowDown,
  },
  data() {
      return {
          tableKey: 0,
          dialogVisible: false,
          applyTime: "",
          tableBottom: {
            totalNum: 100,
            pageSizeList: [10, 20, 30, 40]
          },
          tableData: [
            {
                userId: '22351006',
                name: '郭宗豪',
                isLeagueMember: true,
                developmentStage: DevelopmentStage.Applicant,
                branch: "浙江大学软件学院第一党支部",
                branchSecretary: "某某某",
            },
            {
                userId: '22351006',
                name: '郭宗豪',
                isLeagueMember: true,
                developmentStage: DevelopmentStage.Applicant,
                branch: "浙江大学软件学院第一党支部",
                branchSecretary: "某某某",
            },
            {
                userId: '22351006',
                name: '郭宗豪',
                isLeagueMember: true,
                developmentStage: DevelopmentStage.Applicant,
                branch: "浙江大学软件学院第一党支部",
                branchSecretary: "某某某",
            }
          ],
          queryItems: {
            branchName: "",
            branchSecretary: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
          },
          satifyStus: [
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
            // 更多数据...
          ],
          // 属性筛选
          checkedCols: ['学工号', '姓名', '团员身份', '发展阶段', '所在支部', '支部书记'],
          colNames: ['学工号', '姓名', '团员身份', '发展阶段', '所在支部', '支部书记'],
          visList: [true, true, true, true, true, true, true],
          options: [
            { label: '正式党员', value: '正式党员' },
            { label: '预备党员', value: '预备党员' },
            { label: '发展对象', value: '发展对象' },
            { label: '积极分子', value: '积极分子' },
            { label: '入党申请人', value: '入党申请人' },
            { label: '共青团员', value: '共青团员' },
          ],
          selectedOption: '请选择党支部',
      }
  },
  methods: {
      formatter(row, col, cellVal) {
        return cellVal ? '是' : '否'; 
      },
      clearInputMessage() {
          this.queryItems.userId = "";
          this.queryItems.name = "";
          this.queryItems.applyTime = "";
      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.queryItems.pageSize = val;
          this.queryList();
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.queryItems.pageIndex = val;
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
      },
      showDialog() {
          this.dialogVisible = true
      },
      queryList() {
        console.log("执行了查询列表的请求");
      },
      handleCheckChange() {
        console.log("处理表格列变动：", this.checkedCols);
        for (let i = 0; i < this.colNames.length; i++){
            this.visList[i]= true
        }
        for (let i = 0; i < this.colNames.length; i++) {
            let flag = false;
            for (let j = 0; j < this.checkedCols.length; j++) {
                if (this.colNames[i] === this.checkedCols[j]) {
                    flag = true;
                    break;
                }
            }
            this.visList[i] = flag;
            // 用于更新表格
            this.tableKey += 1;
        }
      },
      changeCheckCols(indexList) {
        console.log("cols变化");
        let new_checkedCols = [];
        for (let i = 0; i < indexList.length; i++) {
            new_checkedCols.push(this.colNames[indexList[i]]);
        }
        this.checkedCols = new_checkedCols;
        this.handleCheckChange();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCommand(command) {
        console.log(command);
        this.selectedOption = command;
      },
     toggleSelection(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
      },
      handleOptionChange (newOption) {
        console.log('选项变化：', newOption);
        this.selectedOption = newOption;
      },
  },
}
</script>

<style>
@import "./Common.css"
</style>