<template>
  <div class="reminder-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>人员管理</span>
      </div>
      <div style="margin-bottom: 20px;">
        <el-form :inline="true" :model="searchForm" style="display: flex; align-items: center;flex-wrap: wrap;">
          <el-form-item label="学号">
            <el-input v-model="searchForm.userNumber" placeholder="请输入学号" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="searchForm.userName" placeholder="请输入姓名" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="发展阶段">
            <el-select
                v-model="searchForm.developmentPhase"
                placeholder="请选择"
                @change="search"
                style="width:150px">
              <el-option label="共青团员" value="共青团员"></el-option>
              <el-option label="入党申请人" value="入党申请人"></el-option>
              <el-option label="积极分子" value="积极分子"></el-option>
              <el-option label="发展对象" value="发展对象"></el-option>
              <el-option label="预备党员" value="预备党员"></el-option>
              <el-option label="正式党员" value="正式党员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select
                v-model="searchForm.role"
                placeholder="请选择"
                @change="search"
                style="width:150px">
              <el-option label="学生" value="学生"></el-option>
              <el-option label="支部书记" value="支部书记"></el-option>
              <el-option label="学校党委" value="学校党委"></el-option>
              <el-option label="系统管理员" value="系统管理员"></el-option>
            </el-select>
          </el-form-item>
          <!-- 新增按党支部搜索 -->
          <el-form-item label="党支部">
            <el-select
                v-model="searchForm.partyBranchId"
                placeholder="请选择党支部"
                @change="search"
                style="width:150px">
              <el-option
                  v-for="branch in searchBranchOptions"
                  :key="branch.id"
                  :label="branch.branchName"
                  :value="branch.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
          <div style="margin-left: auto; display: flex; gap: 10px; align-items: center">
            <el-tooltip placement="top" content="单个人员新增" v-if="isDangWei">
              <el-icon class="el-icon--right" @click="$router.push({name : 'addUserWithUserList'})">
                <Plus/>
              </el-icon>
            </el-tooltip>

            <el-button v-if="isDangWei" class="bottom-button" type="primary" @click="$refs.importStudentListDialog.openDialog()"
                       style="width:140px;">
              <span class="text">导入学生名单</span>
            </el-button>
            <el-button type="primary" @click="dialogVisible = true" style="width:100px;">
              添加列
            </el-button>
            <!-- 新增：批量删除按钮 -->
            <el-button v-if="isDangWei" type="danger" @click="handleBatchDelete" style="width:100px;">
              批量删除
            </el-button>
          </div>
        </el-form>
        <import-student-list-dialog
            ref="importStudentListDialog"
            @fetchStudents="fetchStudents"
        />
      </div>
      <!-- 在el-table上添加 selection-change 事件，并新增 selection 列 -->
      <el-table :data="tableData" stripe border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 固定左侧列：学工号和用户姓名（不可取消） -->
        <el-table-column prop="userNumber" label="学工号" fixed="left" :formatter="renderCell"></el-table-column>
        <el-table-column prop="userName" label="用户姓名" fixed="left" :formatter="renderCell"></el-table-column>
        <!-- 动态添加的列 -->
        <el-table-column
            v-for="(col, index) in extraColumns"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            :formatter="renderCell">
          <template v-slot="scope">
            <!-- 如果当前列是 'developmentPhase' 则用 el-tag 展示 -->
            <template v-if="col.prop === 'developmentPhase'">
              <el-tag :type="getTagType(scope.row[col.prop])">
                {{ scope.row[col.prop] || '无' }}
              </el-tag>
            </template>
            <template v-else-if="col.prop === 'role'">
              <el-tag :type="getRoleTagType(scope.row[col.prop])">
                {{ scope.row[col.prop] || '无' }}
              </el-tag>
            </template>
            <!-- 其他列继续使用 renderCell 方法 -->
            <template v-else>
              {{ renderCell(scope.row, scope.column, scope.row[col.prop]) }}
            </template>
          </template>
        </el-table-column>
        <!-- 固定右侧操作列 -->
        <el-table-column label="操作" width="180" fixed="right">
          <template v-slot="scope">
            <div style="display: flex; justify-content: center; align-items: center;">
              <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteRow(scope.row)" style="color:#fff;">删除</el-button>
              <el-dropdown trigger="click" @command="handleCommand(scope.row, $event)" v-if="isDangWei">
                <span style="display: flex; align-items: center;">
                  <el-icon class="el-icon--right">
                    <More/>
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="resetPassword">重置密码</el-dropdown-item>
                    <el-dropdown-item command="changeRole">更改书记</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
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
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <el-dialog title="选择要显示的列" v-model="dialogVisible">
        <div v-for="(fields, category) in availableColumns" :key="category" class="column-category">
          <el-checkbox
              :indeterminate="isCategoryIndeterminate(category)"
              :model-value="isCategorySelected(category)"
              @change="handleCategoryChange(category, $event)">
            <div class="category-title category-title-highlight">
              {{ categoryTitle(category) }}（全选）
            </div>
          </el-checkbox>
          <el-checkbox-group v-model="selectedColumnProps">
            <el-checkbox v-for="item in fields" :label="item.prop" :key="item.prop">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <ChangeSecretaryDialog ref="ChangeSecretaryDialog" @success="fetchData"></ChangeSecretaryDialog>
  </div>
</template>

<script>
import {More, Plus} from '@element-plus/icons-vue';
import ImportStudentListDialog from './ImportStudentListDialog.vue';
import ChangeSecretaryDialog from './ChangeSecretaryDialog.vue';
import {getCurrentUser} from "@/utils/auth";

export default {
  name: "StageTable",
  components: {
    More,
    Plus,
    ImportStudentListDialog,
    ChangeSecretaryDialog
  },
  data() {
    return {
      isDangWei: true,
      tableData: [],
      // 默认展示的动态列
      extraColumns: [
        {label: "性别", prop: "sex"},
        {label: "角色", prop: "role"},
        {label: "发展阶段", prop: "developmentPhase"},
        {label: "党支部名称", prop: "branchName"}
      ],
      total: 0,
      pageDTO: {
        pageSize: 10,
        pageNumber: 1,
        searchCount: true
      },
      // 在搜索条件中增加党支部id字段
      searchForm: {
        userNumber: '',
        userName: '',
        developmentPhase: '',
        role: '',
        partyBranchId: ''
      },
      dialogVisible: false,
      selectedColumnProps: [
        "sex",
        "role",
        "developmentPhase",
        "branchName"
      ],
      // 分组展示可选字段（不含固定的学工号和用户姓名）
      availableColumns: {
        basic: [
          {label: "用户ID", prop: "id"},
          {label: "密码", prop: "pwd"},
          {label: "生日", prop: "birthday"},
          {label: "民族", prop: "nationality"},
          {label: "家庭住址", prop: "address"},
          {label: "身份证号", prop: "identityId"},
          {label: "学历", prop: "qualification"},
          {label: "在读状态", prop: "readingStatus"},
          {label: "所在党支部Id", prop: "partyBranchId"},
          {label: "团员编号", prop: "leagueNum"},
          {label: "入团时间", prop: "leagueJoinTime"},
          {label: "电话号码", prop: "phone"},
          {label: "电子邮箱", prop: "email"},
          {label: "入党时间", prop: "partyJoinTime"},
          {label: "党支部名称", prop: "branchName"},
          {label: "性别", prop: "sex"},
          {label: "角色", prop: "role"},
          {label: "发展阶段", prop: "developmentPhase"}
        ],
        application: [
          {label: "入党申请书递交时间", prop: "deliveryTime"},
          {label: "入党申请人谈话登记表文件Id", prop: "talkRegistrationFileId"},
          {label: "谈话人（申请阶段）", prop: "talkApplicantPersonId"},
          {label: "《入党申请人-谈话登记表》提交时间", prop: "talkApplicantTime"}
        ],
        activist: [
          {label: "谈话人（积极阶段）", prop: "talkActivistPersonId"},
          {label: "资格审查时间间隔", prop: "qualificationInterval"},
          {label: "是否满足推优条件", prop: "isPromote"},
          {label: "推优时间", prop: "promoteTime"},
          {label: "确定为积极分子时间", prop: "activistTime"},
          {label: "思想汇报提交时间", prop: "thoughtReport"},
          {label: "培养教育考察登记表提交时间", prop: "educationalVisit"},
          {label: "党校培训班参与时间（积极阶段）", prop: "activistPartyTraining"},
          {label: "培养联系人", prop: "cultivateContacts"},
          {label: "《入党积极分子-考察登记表》提交时间", prop: "talkActivistTime"}
        ],
        development: [
          {label: "群众意见调查表提交时间", prop: "developmentPublicTime"},
          {label: "班主任导师意见征求表提交时间", prop: "teacherTime"},
          {label: "确定为发展对象时间", prop: "confirmTime"},
          {label: "发展对象备案时间", prop: "recordTime"},
          {label: "入党介绍人", prop: "partySponsor"},
          {label: "政治审查表提交时间", prop: "politicalReviewTime"},
          {label: "党校培训班参与时间（发展阶段）", prop: "developPartyTraining"},
          {label: "审查时间", prop: "investigateTime"},
          {label: "预审时间", prop: "preliminaryInvestigateTime"},
          {label: "入党志愿书提交时间", prop: "partyApplicationTime"}
        ],
        probationary: [
          {label: "预备党员被接受时间", prop: "branchPrepareTime"},
          {label: "党委派人谈话时间", prop: "committeeTalk"},
          {label: "党委审批时间", prop: "examineTime"},
          {label: "预备党员思想汇报提交时间", prop: "prepareThoughtReport"},
          {label: "预备党员党校培训班参与时间", prop: "preparePartyTraining"}
        ],
        fullMember: [
          {label: "提出转正申请时间", prop: "applyFullTime"},
          {label: "群众意见调查表（转正前）提交时间", prop: "probationaryPublicTime"},
          {label: "支部大会(转正)时间", prop: "branchFullTime"},
          {label: "党委转正审批时间", prop: "committeeFullTime"}
        ],
        system: [
          {label: "阶段状态", prop: "state"},
          {label: "创建时间", prop: "createTime"},
          {label: "更新时间", prop: "updateTime"},
          {label: "是否删除", prop: "isDeleted"}
        ]
      },
      // 新增：用于存放党支部搜索选项
      searchBranchOptions: [],
      // 新增：用于存放批量选择的行数据
      multipleSelection: []
    };
  },
  created() {
    let user = getCurrentUser();
    this.isDangWei = user && user?.role === '学校党委';

    this.fetchData();
    this.fetchSearchBranches();
  },
  methods: {
    categoryTitle(category) {
      switch (category) {
        case 'basic':
          return '基本信息';
        case 'application':
          return '入党申请阶段';
        case 'activist':
          return '积极分子阶段';
        case 'development':
          return '发展对象阶段';
        case 'probationary':
          return '预备党员阶段';
        case 'fullMember':
          return '正式党员阶段';
        case 'system':
          return '系统信息';
        default:
          return category;
      }
    },
    getTagType(status) {
      switch (status) {
        case '共青团员':
          return 'info';
        case '入党申请人':
          return 'warning';
        case '积极分子':
          return 'primary';
        case '发展对象':
          return 'success';
        case '预备党员':
          return 'danger';
        case '正式党员':
          return 'default';
        default:
          return '';
      }
    },
    getRoleTagType(role) {
      switch (role) {
        case '学生':
          return 'info';
        case '支部书记':
          return 'success';
        case '学校党委':
          return 'warning';
        case '系统管理员':
          return 'danger';
        default:
          return '';
      }
    },
    formatSex(row, column, cellValue) {
      if (cellValue === 0) return "未知";
      if (cellValue === 1) return "男";
      if (cellValue === 2) return "女";
      return "未知";
    },
    renderCell(row, column, cellValue) {
      if (cellValue === null || cellValue === undefined || cellValue === '') {
        return "无";
      }
      if (column.property === "isLeague") {
        return (cellValue === 1 || cellValue === '1' || cellValue === true) ? "是" : "否";
      }
      if (column.property === "sex") {
        return this.formatSex(row, column, cellValue);
      }
      const valueStr = String(cellValue).trim();
      if (/^\d+$/.test(valueStr)) {
        if (valueStr.length === 10 || valueStr.length === 13) {
          let timestamp = Number(cellValue);
          if (valueStr.length === 10) {
            timestamp = timestamp * 1000;
          }
          const date = new Date(timestamp);
          if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          }
        }
      }
      return cellValue;
    },
    fetchData() {
      const params = {
        page: this.pageDTO,
        userNumber: this.searchForm.userNumber,
        userName: this.searchForm.userName,
        developmentPhase: this.searchForm.developmentPhase,
        role: this.searchForm.role,
        partyBranchId: this.searchForm.partyBranchId, // 新增：党支部过滤条件
        needBranchName: true
      };
      this.$axios.post('stage/page', params)
          .then(response => {
            const resData = response.data;
            this.tableData = resData.records;
            this.total = resData.total;
          })
          .catch(error => {
            console.error("数据获取失败：", error);
          });
    },
    fetchSearchBranches() {
      this.$axios.get('/auth/branch/findAllBranches')
          .then(response => {
            this.searchBranchOptions = response.data;
          })
          .catch(error => {
            this.$message.error("获取党支部列表失败");
            console.error(error);
          });
    },
    search() {
      this.pageDTO.pageNumber = 1;
      this.fetchData();
    },
    resetSearch() {
      this.searchForm.userNumber = '';
      this.searchForm.userName = '';
      this.searchForm.developmentPhase = '';
      this.searchForm.role = '';
      this.searchForm.partyBranchId = '';
      this.search();
    },
    edit(row) {
      if (!this.isDangWei) {
        return this.$message.warning("无权限");
      }
      this.$router.push({
        name: 'editUserWithUserList',
        query: {id: row.id}
      });
    },
    deleteRow(row) {
      if (!this.isDangWei) {
        return this.$message.warning("无权限");
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('stage/delete?id=' + row.id)
            .then(response => {
              this.$message.success("删除成功");
              this.fetchData();
            })
            .catch(error => {
              this.$message.error("删除失败");
              console.error("删除失败：", error);
            });
      }).catch(() => {
        this.$message.info("已取消删除");
      });
    },
    handleCommand(row, command) {
      if (command === "resetPassword") {
        this.resetPassword(row);
      } else if (command === "changeRole") {
        this.changeRole(row);
      }
    },
    resetPassword(row) {
      this.$axios.get('/stage/resetPassword?id=' + row.id)
          .then(response => {
            this.$message.success("重置成功");
          })
          .catch(error => {
            this.$message.error("重置失败");
            console.error("重置失败：", error);
          });
    },
    changeRole(row) {
      this.$refs.ChangeSecretaryDialog.show(row.id);
    },
    handleDialogConfirm() {
      let allColumns = [];
      for (const category in this.availableColumns) {
        allColumns = allColumns.concat(this.availableColumns[category]);
      }
      this.extraColumns = allColumns.filter(item => this.selectedColumnProps.includes(item.prop));
      this.dialogVisible = false;
    },
    handleSizeChange(newSize) {
      this.pageDTO.pageSize = newSize;
      this.pageDTO.pageNumber = 1;
      this.fetchData();
    },
    handleCurrentChange(newPage) {
      this.pageDTO.pageNumber = newPage;
      this.fetchData();
    },
    fetchStudents() {
      this.fetchData();
    },
    isCategorySelected(category) {
      const categoryProps = this.availableColumns[category].map(item => item.prop);
      return categoryProps.every(prop => this.selectedColumnProps.includes(prop));
    },
    isCategoryIndeterminate(category) {
      const categoryProps = this.availableColumns[category].map(item => item.prop);
      const selectedCount = categoryProps.filter(prop => this.selectedColumnProps.includes(prop)).length;
      return selectedCount > 0 && selectedCount < categoryProps.length;
    },
    handleCategoryChange(category, checked) {
      const categoryProps = this.availableColumns[category].map(item => item.prop);
      if (checked) {
        this.selectedColumnProps = Array.from(new Set([...this.selectedColumnProps, ...categoryProps]));
      } else {
        this.selectedColumnProps = this.selectedColumnProps.filter(prop => !categoryProps.includes(prop));
      }
    },
    // 新增：记录表格的多选项变化
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    // 新增：批量删除方法
    handleBatchDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择要删除的记录");
        return;
      }
      this.$confirm('此操作将永久删除选中的记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.multipleSelection.map(item => item.id);
        this.$axios.post('stage/deleteByBatch', ids)
            .then(response => {
              this.$message.success("批量删除成功");
              this.fetchData();
              this.multipleSelection = [];
            })
            .catch(error => {
              this.$message.error("批量删除失败");
              console.error("批量删除失败：", error);
            });
      }).catch(() => {
        this.$message.info("已取消删除");
      });
    }
  }
};
</script>

<style scoped>
.reminder-page {
  padding: 20px;
}

.el-table th {
  background-color: #fafafa;
}

.el-button--primary {
  background-color: #1677ff !important;
  border-color: #1677ff !important;
  color: #fff !important;
}

.el-button--danger {
  background-color: #ff4d4f !important;
  border-color: #ff4d4f !important;
  color: #fff !important;
}

.bottom-button .text {
  color: #fff !important;
}

.column-category {
  margin-bottom: 15px;
}

.category-title {
  margin-bottom: 5px;
}

.category-title-highlight {
  font-weight: bold;
  color: #1677ff;
}
</style>
