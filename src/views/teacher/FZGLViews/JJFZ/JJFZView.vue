<template>
  <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
    <v-col class="d-flex fill-height flex-column">
      <v-row v-if="!goTo.visiblePersonView" style="height: 80px;">
        <div
            style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
          <v-col cols="10">
            <span style="margin-left: 30px;">学工号</span>
            <input placeholder="    请输入学工号" v-model="queryItems.userId"
                   style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
            <span style="margin-left: 30px;">姓名</span>
            <input placeholder="    请输入姓名" v-model="queryItems.name"
                   style=" margin-left:10px;background-color: white;font-size: 12px;height: 25px; width: 10%;">
            <span style="margin-left: 30px;">积极分子确定时间</span>
            <el-date-picker v-model="queryItems.applyTime" type="daterange" range-separator="——"
                            start-placeholder="开始日期" end-placeholder="结束日期"
                            style="width: 25%;margin-left: 20px;" />
          </v-col>
          <v-col cols="2">
            <el-button class="redBtn" @click="queryList">查询</el-button>
            <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
          </v-col>
        </div>
      </v-row>

      <v-row v-if="!goTo.visiblePersonView" class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto">
          <el-table ref="multipleTable" :data="tableData" max-height="80vh"
                    style="border-radius: 15px;background-color: #F7F7F7;">
            <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" :width="item.width || ''"  align="center">
              <template v-slot="scope" v-if="item.type === 'date'">
                {{ formatTime(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </v-row>

      <v-row v-if="!goTo.visiblePersonView" style="background-color: #E9E9E9;">
        <v-col cols="5">
          <el-button class="redBtn" style="margin-left: 30px;" @click="goToEditPersonView">编辑</el-button>
          <el-button class="whiteBtn" style="border-color: #A5A5A5;">删除</el-button>
        </v-col>
        <v-col cols="7">
          <div style="display: inline-block;float: right;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList" background
                           :page-size="queryItems.pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="tableBottom.totalNum">
            </el-pagination>
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
import EditPersonView from '@/views/teacher/FZGLViews/JJFZ/subPage/EditPersonView.vue';
import AddPersonView from '@/views/teacher/FZGLViews/JJFZ/subPage/AddPersonView.vue';

export default {
  components: {
    SubpageTitle,
    DropDownBox,
    AttributeSelection,
    EditPersonView,
    AddPersonView,
  },
  data() {
    return {
      queryItems: {
        userId: '',
        name: '',
        applyTime: [],
        pageSize: 10,
      },
      tableData: [],
      tableBottom: {
        currentPage: 1,
        pageSizeList: [10, 20, 30, 50],
        totalNum: 0,
      },
      goTo: {
        visiblePersonView: false,
        subPage: 0,
        pageType: '',
        data: {},
      },
      columns: [
        {
          label: '学工号',
          prop: 'userNumber',
        },
        {
          label: '姓名',
          prop: 'userName',
        },
        {
          label: '联系培养人',
          prop: 'cultivateContacts',
        },
        {
          label: '思想汇报提交时间',
          prop: 'thoughtReport',
          type: 'date'
        },
        {
          label: '积极分子确定时间',
          prop: 'activistTime',
          type: 'date'
        },
        {
          label: '《入党积极分子-考察登记表》提交时间',
          prop: 'talkRegistrationTime',
          type: 'date',
          width: '300'
        },
        {
          label: '党校参与时间',
          prop: 'activistPartyTraining',
          type: 'date'
        },
      ]
    };
  },
  methods: {
    formatTime(timestamp) {
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1; // 月份从 0 开始，所以需要加 1
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let formattedDate = `${year}-${month}-${day}`;
      // 如果时、分、秒不全为 00，则添加时间部分
      if (hours !== 0 || minutes !== 0 || seconds !== 0) {
        formattedDate += ` ${hours}:${minutes}:${seconds}`;
      }
      return formattedDate;
    },
    queryList() {
      const data = {
        page: {
          pageNumber: this.tableBottom.currentPage,
          pageSize: this.queryItems.pageSize,
          searchCount: true,
        },
        userNumber: this.queryItems.userId,
        userName: this.queryItems.name,
        startActivistsSetTime: this.queryItems.applyTime[0] || null,
        endActivistsSetTime: this.queryItems.applyTime[1] || null,
      };

      this.$axios.post('/api/stage/page', data)
          .then(response => {
            this.tableData = response.data.records;
            this.tableBottom.totalNum = response.data.total;
          })
          .catch(error => {
            console.error('请求失败:', error);
          });
    },
    clearInputMessage() {
      this.queryItems.userId = '';
      this.queryItems.name = '';
      this.queryItems.applyTime = [];
    },
    handleSizeChange(size) {
      this.queryItems.pageSize = size;
      this.tableBottom.currentPage = 1;
      this.queryList();
    },
    handleCurrentChange(page) {
      this.tableBottom.currentPage = page;
      this.queryList();
    },
    goToEditPersonView() {
      // 实现编辑功能的逻辑
    },
    // 如果有其他方法，请在此处添加
  },
  mounted() {
    this.queryList();
  },
};
</script>


<style src="./JJFZView.css"></style>
<style src="../Common.css"></style>