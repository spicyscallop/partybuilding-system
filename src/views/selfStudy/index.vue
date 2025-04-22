<template>
  <div class="self-study-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>自主学习管理</span>
      </div>
      <div class="controls" style="margin-bottom: 20px; display: flex; align-items: center; flex-wrap: wrap; gap: 10px;">
        <el-form :inline="true" :model="searchForm" style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px;">
          <el-form-item label="学号">
            <el-input v-model="searchForm.userNumber" placeholder="请输入学号" style="width: 150px;" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="searchForm.userName" placeholder="请输入用户名" style="width: 150px;" />
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="searchForm.activityName" placeholder="请输入活动名称" style="width: 150px;" />
          </el-form-item>
          <el-form-item label="发展阶段">
            <el-select
                v-model="searchForm.developmentPhase"
                placeholder="请选择发展阶段"
                @change="search"
                style="width: 150px;"
            >
              <el-option label="共青团员" value="共青团员" />
              <el-option label="入党申请人" value="入党申请人" />
              <el-option label="积极分子" value="积极分子" />
              <el-option label="发展对象" value="发展对象" />
              <el-option label="预备党员" value="预备党员" />
              <el-option label="正式党员" value="正式党员" />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select
                v-model="searchForm.auditStatus"
                placeholder="请选择审核状态"
                @change="search"
                style="width: 150px;"
            >
              <el-option label="审核中" value="审核中" />
              <el-option label="通过" value="通过" />
              <el-option label="拒绝" value="拒绝" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <div style="margin-left: auto; display: flex; gap: 10px; align-items: center;">
          <el-button type="primary" @click="addRecord" style="width: 100px;">新增</el-button>
          <el-button type="danger" @click="handleBatchDelete" style="width: 100px;">批量删除</el-button>
        </div>
      </div>

      <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%;"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <!-- 新增两列：用户名、学工号 -->
        <el-table-column prop="userNumber" label="学工号" fixed="left" />
        <el-table-column prop="username" label="用户名" fixed="left" />
        <el-table-column prop="activityName" label="活动名称" fixed="left" />
        <el-table-column prop="appliedDate" label="申请时间" />
        <el-table-column prop="appliedStudyHour" label="申请学时" />
        <el-table-column prop="developmentPhase" label="发展阶段">
          <template v-slot="scope">
            <el-tag :type="getTagType(scope.row.developmentPhase)">
              {{ scope.row.developmentPhase || '无' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="auditStatus" label="审核状态">
          <template v-slot="scope">
            <el-tag :type="getAuditTagType(scope.row.auditStatus)">
              {{ scope.row.auditStatus || '无' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="auditTime" label="审核时间" />
        <el-table-column label="操作" width="350" fixed="right">
          <template v-slot="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)" style="color: #FFF">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.row)" style="color: #FFF">删除</el-button>
            <!-- 审核通过/拒绝按钮 -->
            <el-button
                size="mini"
                type="success"
                @click="approve(scope.row)"
                :disabled="scope.row.auditStatus==='通过'"
                style="color: #FFF"
            >通过</el-button>
            <el-button
                size="mini"
                type="warning"
                @click="reject(scope.row)"
                :disabled="scope.row.auditStatus==='拒绝'"
                style="color: #FFF"
            >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px; text-align: right;">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="pageDTO.pageNumber"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageDTO.pageSize"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCurrentUser } from '@/utils/auth';
export default {
  name: 'SelfStudyManagement',
  data() {
    return {
      tableData: [],
      total: 0,
      pageDTO: { pageSize: 10, pageNumber: 1 },
      searchForm: {
        userNumber: '',
        userName: '',
        activityName: '',
        developmentPhase: '',
        auditStatus: ''
      },
      multipleSelection: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    getTagType(v) { /* 根据阶段返回 Tag 类型 */ return ''; },
    getAuditTagType(v) {
      if (v === '通过') return 'success';
      if (v === '拒绝') return 'danger';
      return 'warning';
    },
    renderCell(row, col, val) {
      if (val === null || val === undefined || val === '') return '无';
      return val;
    },
    fetchData() {
      const params = {
        developmentPhase: this.searchForm.developmentPhase,
        auditStatus: this.searchForm.auditStatus,
        username: this.searchForm.userName,
        userNumber: this.searchForm.userNumber,
        activityName: this.searchForm.activityName
      };
      this.$axios
          .get('/selfstudy/listByPartyBranch', { params })
          .then(res => {
            this.tableData = res.data;
            this.total = res.data.length;
          });
    },
    search() {
      this.pageDTO.pageNumber = 1;
      this.fetchData();
    },
    resetSearch() {
      Object.keys(this.searchForm).forEach(key => {
        this.searchForm[key] = '';
      });
      this.search();
    },
    addRecord() {
      this.$router.push({ name: 'selfStudyAddOrEdit' });
    },
    edit(row) {
      this.$router.push({ name: 'selfStudyAddOrEdit', query: { id: row.id } });
    },
    deleteRow(row) {
      this.$confirm('确认删除该记录？', '提示', { type: 'warning' })
          .then(() => {
            this.$axios.delete(`/selfstudy/${row.id}`).then(() => {
              this.$message.success('删除成功');
              this.fetchData();
            });
          });
    },
    approve(row) {
      const payload = {id: row.id, auditStatus: '通过'};
      this.$axios.put('/selfstudy', payload).then(() => {
        this.$message.success('已通过');
        this.fetchData();
      });
    },
    reject(row) {
      const payload = {...row, auditStatus: '拒绝'};
      this.$axios.put('/selfstudy', payload).then(() => {
        this.$message.success('已拒绝');
        this.fetchData();
      });
    },
    handleBatchDelete() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择记录');
      }
      this.$confirm('确认批量删除？', '提示', {type: 'warning'})
          .then(() => {
            const ids = this.multipleSelection.map(item => item.id);
            this.$axios
                .delete('/selfstudy/deleteByBatch?ids=' + ids)
                .then(() => {
                  this.$message.success('批量删除成功');
                  this.fetchData();
                });
          });
    },
    handleSizeChange(size) {
      this.pageDTO.pageSize = size;
      this.pageDTO.pageNumber = 1;
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.pageDTO.pageNumber = page;
      this.fetchData();
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    }
  }
};
</script>

<style scoped>
.self-study-page {
  padding: 20px;
}

.el-table th {
  background-color: #fafafa;
}
</style>
