<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="d-flex align-center">
                <v-col cols="12">
                    <SubpageTitle text="档案管理" :width="43" :height="43">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row>
                <div style="background-color: #F35339; height: 100%; width: 100%; border-radius: 20px; padding: 10px; display: flex; justify-content: space-between;">
                    <v-col cols="10">
                        <v-row>
                            <v-col cols="7" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 60px;">档案标题</span>
                                <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.archiveTitle" placeholder="请输入内容"></el-input>
                            </v-col>
                            <v-col cols="5" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 60px;">档案编号</span>
                                <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.archiveNumber" placeholder="请输入内容"></el-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="7" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 60px;">发布时间</span>
                                <el-date-picker
                                    style="margin-left: 20px"
                                    v-model="dateRange"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </v-col>
                            <v-col cols="5" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 60px;">档案类型</span>
                                <el-select v-model="queryItems.archiveType" placeholder="请选择" style="flex: 1; margin-left: 20px;">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" class="d-flex">
                        <el-button class="redBtn" @click="queryList" style="margin-right: 10px;">查询</el-button>
                        <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
                    </v-col>
                </div>
            </v-row>
            <v-row style="width: 100%;" class="mt-5">
				<div style="display: flex; width: 100%; justify-content: flex-end;">
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">新增档案</el-button>
						<el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="handleBatchDelete">删除档案</el-button>
				</div>
			</v-row>
             <v-row class="d-flex flex-column h-100 mt-10 mb-10">
                <el-table
                    :key="tableKey"
                    :data="xtgg"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="archiveNumber" label="档案编号" width="200"></el-table-column>
                <el-table-column prop="archiveTitle" label="档案标题"></el-table-column>
                <el-table-column prop="branchName" label="支部名称" width="120"></el-table-column>
                <el-table-column prop="createTime" label="发布时间" width="120">
                    <template #default="{ row }">
                        <span>{{ formatDate(row.createTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="archiveType" label="档案类型" width="100"></el-table-column>
                <el-table-column label="档案内容" width="100">
                    <template #default="{ row }">
                        <el-button link @click="handleWatch(row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{ row }">
                    <el-button link @click="handleEdit(row)">编辑</el-button>
                    <el-button link style="color: red;" @click="handleDelete(row.id)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </v-row>
            <v-row style="background-color: #E9E9E9;">
                <v-col cols="5">
                </v-col>
                <v-col cols="7">
                    <div style="display: inline-block;float: right;">
                        <div style="display: inline-block;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="queryItems.page.pageNumber" :page-sizes="tableBottom.pageSizeList" background
                                :page-size="queryItems.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </v-col>
            </v-row>

            <el-dialog
                :title="isEdit ? '编辑档案' : '新增档案'"
                v-model="addAndEditDialogVisible"
                width="40%"
                @close="onDialogClose()"
            >
                <!-- 表单 -->
                <el-form
                    :model="form"
                    :rules="rules"
                    ref="form"
                    label-width="100px"
                    class="add-form"
                >
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <!-- 档案标题 -->
                            <el-form-item label="档案标题" prop="archiveTitle" required>
                                <el-input v-model="form.archiveTitle" placeholder="请输入档案标题"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <!-- 档案编号 -->
                            <el-form-item label="档案编号" prop="archiveNumber">
                                <el-input v-model="form.archiveNumber" placeholder="请输入档案编号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <!-- 档案类型 -->
                            <el-form-item label="档案类型" prop="archiveType" required>
                                <el-select v-model="form.archiveType" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <!-- 备注 -->
                            <el-form-item label="备注" prop="remarks">
                                <el-input v-model="form.remarks" placeholder="请输入备注"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <!-- 档案内容 -->
                    <el-form-item label="档案内容" prop="archiveContent">
                        <el-input
                            type="textarea"
                            v-model="form.archiveContent"
                            placeholder="请输入档案内容"
                            :rows="5"
                        ></el-input>
                    </el-form-item>
                </el-form>

                <!-- 底部按钮 -->
                <template #footer>
                    <el-button class="redBtn" @click="handleSubmit">提交</el-button>
                    <el-button class="whiteBtn" @click="addAndEditDialogVisible = false">取消</el-button>
                </template>
            </el-dialog>

            <el-dialog
                title="档案内容"
                v-model="watchDialogVisible"
                fullscreen
            >
                <!-- 展示档案内容 -->
                <div class="content-display">
                    <div class="content-text">{{ currentContent }}</div>
                </div>
                <!-- 底部按钮 -->
                <template #footer>
                    <el-button class="whiteBtn" @click="watchDialogVisible = false">关闭</el-button>
                </template>
            </el-dialog>
        </v-col>
    </v-container>
</template>


<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import "@/style/Common.css"

export default {
  components: {
      SubpageTitle,
      DropDownBox,
      AttributeSelection,
      ArrowDown,
  },
  data() {
      return {
          addAndEditDialogVisible: false,
          watchDialogVisible: false,
          tableKey: 0,
          isEdit: false,
          currentRowId: "",
          tableBottom: {
              totalNum: 0,
              pageSizeList: [5, 10, 20, 30, 40]
          },
          queryItems: {
              id: "",  // 档案唯一标识
              archiveNumber: "", // 档案编号
              archiveTitle: "", // 档案标题
              archiveType: "", // 档案类型
              branchId: "", // 支部ID
              page: {
                  pageNumber: 1,
                  pageSize: 10,
                  searchCount: true
              }
          },
          xtgg: [], // 档案列表数据
          form: {
              archiveTitle: "", // 档案标题
              archiveNumber: "", // 档案编号
              archiveType: "", // 档案类型
              archiveContent: "", // 档案内容
              branchId: "", // 支部ID
              remarks: "", // 备注
              fileId: 0, // 关联文件标识
              isUploaded: 0, // 文件是否上传，0否，1是
          },
          currentContent: "",
          rules: {
              archiveTitle: [{ required: true, message: '请输入档案标题', trigger: 'blur' }],
              archiveType: [{ required: true, message: '请选择档案类型', trigger: 'change' }],
          },
          institutionOptions: [
              { label: '校党委', value: '校党委' },
              { label: '支部书记', value: '支部书记' },
          ],
          typeOptions: [
              { label: '党员基本信息', value: '党员基本信息' },
              { label: '入党积极分子', value: '入党积极分子' },
              { label: '年度理论学习', value: '年度理论学习' },
              { label: '红色教育基地', value: '红色教育基地' },
              { label: '组织生活会', value: '组织生活会' },
              { label: '党建工作目标', value: '党建工作目标' },
          ],
          pickerOptions: {
              shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                  }
              }, {
                  text: '最近一个月',
                  onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                  }
              }, {
                  text: '最近三个月',
                      onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                  }
              }]
          },
          selectedIds: [],
          dateRange: [],
      }
  },
  mounted() {
      this.queryList()
  },
  watch: {
      dateRange: {
          handler(newVal) {
              // 格式化为 yyyy-mm-dd
              if (newVal && newVal.length === 2) {
                  this.queryItems.createTime = this.formatDateToYMD(newVal[0]); // 使用createTime字段
              } else {
                  this.queryItems.createTime = '';
              }
          },
          deep: true,
      }
  },
  methods: {
      queryList() {
          // 使用新的后端接口
          this.$axios.post('/archive/page', this.queryItems)
              .then(response => {
                  if (response.success) {
                      this.xtgg = response.data.records;
                      this.tableBottom.totalNum = response.data.total;
                  } else {
                      this.$message.error(response.msg || "获取档案信息失败");
                  }
              })
              .catch(error => {
                  this.$message.error("获取档案信息失败: " + error.message);
                  console.error('获取档案信息失败:', error);
              });
      },
      goTo(route) {
          this.$router.push(route);
      },
      handleSizeChange(val) {
          this.queryItems.page.pageSize = val;
          this.queryList();
      },
      handleCurrentChange(val) {
          this.queryItems.page.pageNumber = val;
          this.queryList();
      },
      headerRowStyle() {
          return {
              backgroundColor: '#F7F7F7',
              color: '#3E3E3E',
          }
      },
      handleSelectionChange(vals) {
          this.selectedIds = vals.map(item => item.id)
      },
      // 格式化日期为 yyyy-mm-dd
      formatDateToYMD(date) {
          if (!date) return '';
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0'); // 补零
          const day = String(d.getDate()).padStart(2, '0'); // 补零
          return `${year}-${month}-${day}`;
      },
      formatDate(date) {
          if (!date) return '';
          return date.split(' ')[0];
      },
      handleWatch(row) {
          this.currentContent = row.archiveContent || "暂无内容"
          this.watchDialogVisible = true
      },
      clearInputMessage() {
          this.queryItems.archiveTitle = "";
          this.queryItems.archiveNumber = "";
          this.queryItems.archiveType = "";
          this.queryItems.id = "";
          this.queryItems.createTime = "";
          this.dateRange = [];
      },
      clearAddForm() {
          this.form = {
              archiveTitle: "", // 档案标题
              archiveNumber: "", // 档案编号
              archiveType: "", // 档案类型
              archiveContent: "", // 档案内容
              branchId: "", // 支部ID
              remarks: "", // 备注
              fileId: 0, // 关联文件标识
              isUploaded: 0, // 文件是否上传，0否，1是
          };
          this.currentRowId = "";
          this.isEdit = false;
          
          // 如果表单引用存在，重置表单验证状态
          if (this.$refs.form) {
              this.$refs.form.resetFields();
          }
      },
      // 点击新增按钮
      handleAdd() {
          // 先关闭对话框
          this.addAndEditDialogVisible = false;
          
          // 使用 nextTick 确保 DOM 更新后再执行下面的操作
          this.$nextTick(() => {
              this.isEdit = false;
              this.clearAddForm();
              this.addAndEditDialogVisible = true;
          });
      },
      // 点击编辑按钮
      handleEdit(row) {
          // 获取详情
          this.$axios.get('/archive/get', { params: { id: row.id } })
              .then(response => {
                  if (response.success) {
                      const data = response.data;
                      this.addAndEditDialogVisible = true;
                      this.isEdit = true;
                      this.currentRowId = data.id;
                      
                      this.$nextTick(() => {
                          // 回显数据
                          this.form.archiveTitle = data.archiveTitle;
                          this.form.archiveNumber = data.archiveNumber;
                          this.form.archiveType = data.archiveType;
                          this.form.archiveContent = data.archiveContent || '';
                          this.form.branchId = data.branchId || '';
                          this.form.remarks = data.remarks || '';
                          this.form.fileId = data.fileId || 0;
                          this.form.isUploaded = data.isUploaded || 0;
                      });
                  } else {
                      this.$message.error(response.msg || "获取档案详情失败");
                  }
              })
              .catch(error => {
                  this.$message.error("获取档案详情失败: " + error.message);
                  console.error('获取档案详情失败:', error);
              });
      },
      // 提交（新增或编辑）
      handleSubmit() {
          this.$refs['form'].validate((valid) => {
              if (valid) {
                  let apiUrl = '/archive/add';
                  let successMsg = "添加成功";
                  
                  const params = { ...this.form };
                  
                  if (this.isEdit) {
                      apiUrl = '/archive/update';
                      successMsg = "编辑成功";
                      params.id = this.currentRowId;
                  }
                  
                  this.$axios.post(apiUrl, params)
                      .then(response => {
                          if (response.success) {
                              this.$message.success(successMsg);
                              this.addAndEditDialogVisible = false;
                              this.clearAddForm();
                              this.queryList();
                          } else {
                              this.$message.error(response.msg || "操作失败");
                          }
                      })
                      .catch(error => {
                          this.$message.error("操作失败: " + error.message);
                          console.error('操作失败:', error);
                      });
              } else {
                  return false;
              }
          });
      },
      handleDelete(id) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true,
              confirmButtonClass: 'redBtn',
              cancelButtonClass: 'whiteBtn',
          }).then(() => {
              // 使用新的删除接口
              this.$axios.post('/archive/delete', null, { params: { id } })
                  .then(response => {
                      if (response.success) {
                          this.$message.success("删除成功");
                          this.queryList();
                      } else {
                          this.$message.error(response.msg || "删除失败");
                      }
                  })
                  .catch(error => {
                      this.$message.error("删除失败: " + error.message);
                      console.error('删除失败:', error);
                  });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      handleBatchDelete() {
          if (this.selectedIds.length === 0) {
              this.$message.warning("请选择要删除的记录");
              return;
          }
          this.$confirm('此操作将永久删除这些记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              confirmButtonClass: 'redBtn',
              cancelButtonClass: 'whiteBtn',
          }).then(() => {
              const loading = this.$loading({
                  lock: true,
                  text: '正在删除，请稍候...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)',
              });

              // 创建删除请求队列
              const deletePromises = this.selectedIds.map(id =>
                  this.$axios.post('/archive/delete', null, { params: { id } })
                      .catch(err => {
                          return { id, error: err };
                      })
              );

              Promise.all(deletePromises).then(results => {
                  loading.close();
                  const failedResults = results.filter(result => result && result.error);
                  const successCount = this.selectedIds.length - failedResults.length;
                  const failedCount = failedResults.length;

                  this.queryList();
                  this.selectedIds = [];

                  if (failedCount === 0) {
                      this.$message.success(`成功删除 ${successCount} 条记录`);
                  } else {
                      this.$message.warning(`成功删除 ${successCount} 条记录，失败 ${failedCount} 条`);
                      console.error("删除失败的记录:", failedResults);
                  }
              }).catch(err => {
                  loading.close();
                  this.$message.error("删除过程中发生错误，请稍后重试");
                  console.error(err);
              });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除',
              });
          });
      },
      // dialog 关闭时清空表单验证信息
      onDialogClose() {
          this.$refs['form'].resetFields();
      }
  },
}
</script>

<style scoped>
  .bar {
      background-color: #F35339; 
      height: 100%;
      width: 100%;
      border-radius: 20px;
      color: #fff;
  }
  .content-display {
      padding: 10px;
  }
  .content-display .el-textarea__inner {
      background-color: #f5f5f5; /* 背景色，增强只读感 */
      border: 1px solid #dcdfe6;
      color: #606266;
  }
  .content-text {
      min-height: 100%;
      padding: 15px;
      background-color: #f5f5f5;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      line-height: 1.5;
      word-break: break-word;
      white-space: pre-wrap; /* 识别换行符并换行 */
  }
</style>