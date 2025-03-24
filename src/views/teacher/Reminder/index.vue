<template>
    <div class="reminder-page">
      <el-card style="width: 100%;height: 100%">
        <template #header>
          <div class="card-header">
            <span>约束告警</span>
          </div>
        </template>
        <div style="margin-bottom: 20px;">
          <el-input v-model="searchContent" placeholder="请输入查询内容" style="width:300px; margin-right:10px;"></el-input>
          <el-select v-model="ignoreStatus" placeholder="请选择处理状态" style="width:150px; margin-right:10px;">
            <el-option label="全部" :value="null"></el-option>
            <el-option label="已处理" :value="true"></el-option>
            <el-option label="未处理" :value="false"></el-option>
          </el-select>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>
        <el-table :data="reminders" style="width: 100%;">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="studentNumber" label="学号"></el-table-column>
          <el-table-column prop="studentName" label="姓名"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="isIgnore" label="处理状态" width="120">
            <template v-slot="scope">
              <span>{{ scope.row.isIgnore ? '已处理' : '未处理' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="scope">
              <el-button v-if="!scope.row.isIgnore" type="success" size="mini" @click="handleProcessed(scope.row)">
                标记已处理
              </el-button>
              <el-button v-else type="warning" size="mini" @click="handleProcessed(scope.row)">
                标记为未处理
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
            @current-change="handlePageChange"
            style="margin-top:20px;">
        </el-pagination>
      </el-card>

    </div>
  </template>
  
  <script>
  export default {
    name: 'ReminderManagement',
    data() {
      return {
        searchContent: '',
        ignoreStatus: false,
        reminders: [],
        total: 0,
        pageSize: 10,
        pageNumber: 1
      };
    },
    methods: {
      handleSearch() {
        this.pageNumber = 1;
        this.fetchReminders();
      },
      fetchReminders() {
        const params = {
          content: this.searchContent,
          ...(this.ignoreStatus !== null && { isIgnore: this.ignoreStatus }),
          page: {
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }
        };
        this.$axios
          .post('/reminders/page', params)
          .then((res) => {
            if (res.code === "200") {
              this.reminders = res.data.records;
              this.total = res.data.total;
            } else {
              this.$message.error(res.msg || '查询失败');
            }
          })
          .catch((err) => {
            console.error(err);
            this.$message.error('查询异常');
          });
      },
      handlePageChange(page) {
        this.pageNumber = page;
        this.fetchReminders();
      },
      handleProcessed(row) {
        const newStatus = !row.isIgnore;
        const params = {
          id: row.id,
          isIgnore: newStatus
        };
        this.$axios
          .post('/reminders/update', params)
          .then((res) => {
            if (res.code === "200") {
              this.$message.success(newStatus ? '标记已处理成功' : '标记为未处理成功');
              this.fetchReminders();
            } else {
              this.$message.error(res.msg || '更新失败');
            }
          })
          .catch((err) => {
            console.error(err);
            this.$message.error('更新异常');
          });
      }
    },
    created() {
      this.fetchReminders();
    }
  };
  </script>
  
  <style scoped>
  .reminder-page {
    padding: 20px;
  }
  </style>
  