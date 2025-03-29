<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="d-flex align-center">
                <v-col cols="12">
                    <SubpageTitle text="学习样板" :width="43" :height="43">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row>
                <div style="background-color: #F35339; height: 100%; width: 100%; border-radius: 20px; padding: 10px; display: flex; justify-content: space-between;">
                    <v-col cols="10">
                        <v-row>
                            <v-col cols="7" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 60px;">文章标题</span>
                                <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.title" placeholder="请输入内容"></el-input>
                            </v-col>
                            <v-col cols="5" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 60px;">文章编号</span>
                                <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.id" placeholder="请输入内容"></el-input>
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
                                <span style="white-space: nowrap; min-width: 60px;">发布单位</span>
                                <el-select v-model="queryItems.institution" placeholder="请选择" style="flex: 1; margin-left: 20px;">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option
                                        v-for="item in institutionOptions"
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
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">新增文章</el-button>
						<el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="handleBatchDelete">删除文章</el-button>
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
                <el-table-column prop="id" label="文章编号" width="200"></el-table-column>
                <el-table-column prop="title" label="文章名称"></el-table-column>
                <el-table-column prop="institution" label="发布单位" width="120"></el-table-column>
                <el-table-column prop="createTime" label="发布时间" width="120">
                    <template #default="{ row }">
                        <span>{{ formatDate(row.createTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="文章类型" width="100"></el-table-column>
                <el-table-column prop="content" label="文章内容" width="100">
                    <template #default="{ row }">
                        <el-button type="text" @click="handleWatch(row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{ row }">
                    <el-button type="text" @click="handleEdit(row)">编辑</el-button>
                    <el-button type="text" style="color: red;" @click="handleDelete(row.id)">删除</el-button>
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
                :title="isEdit ? '编辑文章' : '新增文章'"
                v-model="addAndEditDialogVisible"
                width="40%"
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
                            <!-- 文章标题 -->
                            <el-form-item label="文章标题" prop="title" required>
                                <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <!-- 发布单位 -->
                            <el-form-item label="发布单位" prop="institution" required>
                                <el-select v-model="form.institution" placeholder="请选择发布单位" style="width: 100%;">
                                    <el-option
                                        v-for="item in institutionOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <!-- 文章类型 -->
                            <el-form-item label="文章类型" prop="type" required>
                                <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
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
                            <!-- 文章类型 -->
                            <el-form-item label="外部链接" prop="url" required>
                                <el-input v-model="form.url" placeholder="请输入链接"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <!-- 文件是否上传 -->
                    <!-- <el-form-item label="文件是否上传">
                        <el-checkbox v-model="form.isFileUpload">是</el-checkbox>
                        <el-checkbox v-model="form.isFileUpload">否</el-checkbox>
                    </el-form-item> -->

                    <!-- 文章内容 -->
                    <el-form-item label="文章内容">
                        <el-input
                            type="textarea"
                            v-model="form.content"
                            placeholder="请输入文章内容"
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
                title="文章内容"
                v-model="watchDialogVisible"
                fullscreen
            >
                <!-- 展示文章内容 -->
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
  import { getXtggInfo, addXtggItem, deleteXtggItem, editXtggItem } from "@/http/party.js"
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
                id: "",
                title: "",
                institution: "",
                startCreateTime: "", // 开始日期
                endCreateTime: "",   // 结束日期
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    searchCount: true
                },
                isStudyExample: true,
            },
            xtgg: [],
            form: {
                title: "",
                institution: "",
                type: "",
                content: "",
                url: "",
                isStudyExample: true,
            },
            currentContent: "",
            rules: {
                title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
                institution: [{ required: true, message: '请选择发布单位', trigger: 'change' }],
                type: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
                url: [{ required: true, message: '请输入外部链接', trigger: 'blur' }],
            },
            institutionOptions: [
                { label: '校党委', value: '校党委' },
                { label: '支部书记', value: '支部书记' },
            ],
            typeOptions: [
                { label: '优秀事迹', value: '优秀事迹' },
                { label: '先进支部建设', value: '先进支部建设' },
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
                    this.queryItems.startCreateTime = this.formatDateToYMD(newVal[0]);
                    this.queryItems.endCreateTime = this.formatDateToYMD(newVal[1]);
                } else {
                    this.queryItems.startCreateTime = '';
                    this.queryItems.endCreateTime = '';
                }
            },
            deep: true,
        }
    },
    methods: {
        queryList() {
            if (this.queryItems.institution === "全部") this.queryItems.institution = "";
			getXtggInfo(this.queryItems).then(res => {
                this.xtgg = res.data.records
                this.tableBottom.totalNum = res.data.total
            }).catch(err => {
                this.$message.error("获取文章信息失败")
                console.log(err);
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
        getStatus(row) {
            // 如果 updateTime 或 createTime 为空，返回默认状态
            if (!row.createTime || !row.updateTime) {
                return '未更改';
            }

            // 将时间字符串转换为 Date 对象进行比较
            const createTime = new Date(row.createTime);
            const updateTime = new Date(row.updateTime);

            // 如果 updateTime 大于 createTime，返回“已更改”，否则返回“未更改”
            return updateTime > createTime ? '已更改' : '未更改';
        },
        handleWatch(row) {
            this.currentContent = row.content || "暂无内容"
            this.watchDialogVisible = true
        },
        clearInputMessage() {
            this.queryItems.title = ""
            this.queryItems.institution = ""
            this.queryItems.id = ""
            this.dateRange = []
        },
        clearAddForm() {
            this.form.title = "";
            this.form.type = "";
            this.form.institution = "";
            this.form.content = "";
            this.form.url = "";
            this.currentRowId = "";
            this.isEdit = false;
        },
        // 点击新增按钮
        handleAdd() {
            this.isEdit = false;
            this.clearAddForm();
            this.addAndEditDialogVisible = true;
        },
        // 点击编辑按钮
        handleEdit(row) {
            this.isEdit = true;
            this.currentRowId = row.id;
            // 回显数据
            this.form.title = row.title;
            this.form.institution = row.institution;
            this.form.type = row.type;
            this.form.content = row.content || '';
            this.form.url = row.url || '';
            this.addAndEditDialogVisible = true;
        },
        // 提交（新增或编辑）
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.isEdit) {
                        const editData = { ...this.form, id: this.currentRowId };
                        editXtggItem(editData).then(res => {
                            this.queryList();
                            this.$message.success("编辑成功");
                            this.addAndEditDialogVisible = false;
                            this.clearAddForm();
                        }).catch(err => {
                            this.$message.error("编辑失败")
                            console.log(err);
                        });
                    } else {
                        addXtggItem(this.form).then(res => {
                            this.queryList();
                            this.$message.success("添加成功");
                            this.addAndEditDialogVisible = false;
                            this.clearAddForm();
                        }).catch(err => {
                            this.$message.error("添加失败")
                            console.log(err);
                        });
                    }
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
				// center: true,
				dangerouslyUseHTMLString: true,
				confirmButtonClass: 'redBtn',
				cancelButtonClass: 'whiteBtn',
			}).then(() => {
				deleteXtggItem(id).then(res => {
                    this.queryList();
                    this.$message.success("删除成功")
                }).catch(err => {
                    this.$message.error("删除失败")
                    console.log(err)
                })
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

                const deletePromises = this.selectedIds.map(id =>
                    deleteXtggItem(id).catch(err => {
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