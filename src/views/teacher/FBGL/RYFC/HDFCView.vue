<template>
    <v-col class="d-flex fill-height flex-column">
        <v-row>
            <div style="background-color: #F35339; height: 100%; width: 100%; border-radius: 20px; padding: 10px; display: flex; justify-content: space-between;">
                <v-col cols="10">
                    <v-row>
                        <v-col cols="8" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">活动名称</span>
                            <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.title" placeholder="请输入内容"></el-input>
                        </v-col>
                        <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">记录编号</span>
                            <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.id" placeholder="请输入内容"></el-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">发布时间</span>
                            <el-date-picker
                                v-model="queryItems.createTime"
                                type="date"
                                style="margin-left: 20px;"
                                placeholder="选择日期">
                            </el-date-picker>
                        </v-col>
                        <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">发布单位</span>
                            <el-select v-model="queryItems.publishingUnit" placeholder="请选择" style="flex: 1; margin-left: 20px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option
                                    v-for="item in publishingUnitOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </v-col>
                        <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">活动类型</span>
                            <el-select v-model="queryItems.activityType" placeholder="请选择" style="flex: 1; margin-left: 20px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option
                                    v-for="item in activityTypeOptions"
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
                <el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">新增记录</el-button>
                <el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="handleBatchDelete">删除记录</el-button>
            </div>
        </v-row>
            <v-row class="d-flex flex-column h-100 mt-10 mb-10">
            <el-table
                :key="tableKey"
                :data="hdfc"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="记录编号" width="200"></el-table-column>
            <el-table-column prop="title" label="活动名称"></el-table-column>
            <el-table-column prop="publishingUnit" label="发布单位" width="120"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="120">
                <template #default="{ row }">
                    <span>{{ formatDateToYMD(row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="activityType" label="活动类型" width="100"></el-table-column>
            <el-table-column prop="activityContent" label="活动内容" width="100">
                <template #default="{ row }">
                    <el-button link @click="handleWatch(row)">查看</el-button>
                </template>
            </el-table-column>
            <!-- 操作 -->
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
            :title="isEdit ? '编辑记录' : '新增记录'"
            v-model="addAndEditDialogVisible"
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
                        <el-form-item label="活动名称" prop="title" required>
                            <el-input v-model="form.title" placeholder="请输入活动名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="记录编号" prop="id">
                            <el-input v-model="form.id" placeholder="提交后自动生成" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <!-- 发布单位 -->
                        <el-form-item label="发布单位" prop="publishingUnit" required>
                            <el-select v-model="form.publishingUnit" placeholder="请选择发布单位" style="width: 100%;">
                                <el-option
                                    v-for="item in publishingUnitOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="活动类型" prop="activityType" required>
                            <el-select v-model="form.activityType" placeholder="请选择" style="width: 100%;">
                                <el-option
                                    v-for="item in activityTypeOptions"
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
                        <el-form-item label="发布时间" prop="createTime">
                            <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                disabled
                                placeholder="提交后自动更新">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="封面图片">
                            <el-upload
                                action
                                ref="upload"
                                :accept="fileType.join(',')"
                                :auto-upload="false"
                                :file-list="fileList"
                                :on-change="handleChange"
                                :on-preview="handlePreview"
                                :before-upload="beforeUpload"
                                list-type="picture"
                                >
                                <el-button size="small">{{ isEdit ? "重新上传" : "点击上传" }}</el-button>
                                <template v-slot:tip>
                                    <div class="el-upload__tip">只能上传 jpg/jpeg/png 文件，且不超过 2mb</div>
                                </template>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <!-- 活动内容 -->
                <el-form-item label="活动内容" prop="activityContent" required>
                    <el-input
                        type="textarea"
                        v-model="form.activityContent"
                        placeholder="请输入活动内容"
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
            title="活动内容"
            v-model="watchDialogVisible"
            fullscreen
        >
            <!-- 展示公告内容 -->
            <div class="content-display">
                <div class="content-text">{{ currentContent }}</div>
            </div>
            <!-- 底部按钮 -->
            <template #footer>
                <el-button class="whiteBtn" @click="watchDialogVisible = false">关闭</el-button>
            </template>
        </el-dialog>
    </v-col>
  </template>
  
  
<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { 
    fileUpload,
    getActivityHighlightsPage, 
    addActivityHighlight, 
    updateActivityHighlight,
    deleteActivityHighlight, 
    deleteActivityHighlightByBatch 
} from "@/http/api";
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
                publishingUnit: "",
                createTime: "",
                activityType: "",
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    searchCount: true
                }
            },
            hdfc: [
                { id: "", title: "", publishingUnit: "", activityType: "", activityContent: "", creatTime: ""},
            ],
            form: {
                id: "",
                title: "",
                publishingUnit: "",
                activityType: "",
                createTime: "",
                activityContent: "",
            },
            currentContent: "",
            rules: {
                title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
                publishingUnit: [{ required: true, message: '请选择发布单位', trigger: 'change' }],
                activityType: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
                activityContent: [{ required: true, message: '请选择活动内容', trigger: 'change' }],
            },
            publishingUnitOptions: [
                { label: '校党委', value: '校党委' },
                { label: '支部书记', value: '支部书记' },
            ],
            activityTypeOptions: [
                { label: 'xxx', value: 'xxx' },
            ],
            selectedIds: [],
            // 封面上传
            fileList: [],
            // 允许的文件类型
            fileType: ["png", "jpg", "jpeg"],
        }
    },
    mounted() {
        this.queryList()
    },
    methods: {
        queryList() {
            if (this.queryItems.publishingUnit === "全部") this.queryItems.publishingUnit = "";
            if (this.queryItems.activityType === "全部") this.queryItems.activityType = "";
            getActivityHighlightsPage(this.queryItems).then(res => {
                this.hdfc = res.data.records;
                this.tableBottom.totalNum = res.data.total;
            }).catch(err => {
                this.$message.error("获取活动风采失败")
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
            this.currentContent = row.activityContent || "暂无内容"
            this.watchDialogVisible = true
        },
        clearInputMessage() {
            this.queryItems.title = ""
            this.queryItems.id = ""
            this.queryItems.createTime = ""
            this.queryItems.publishingUnit = ""
            this.queryItems.activityType = ""
        },
        clearAddForm() {
            this.form = {
                id: "",
                title: "",
                publishingUnit: "",
                activityType: "",
                createTime: "",
                activityContent: "",
                fileId: "",
            },
            this.currentRowId = "";
            this.fileList = [];
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
            this.addAndEditDialogVisible = true;
            this.isEdit = true;
            this.currentRowId = row.id;
            this.$nextTick(() => {
                this.form = {
                    id: row.id,
                    title: row.title,
                    publishingUnit: row.publishingUnit,
                    activityType: row.activityType,
                    createTime: this.formatDate(row.createTime),
                    activityContent: row.activityContent || "",
                    fileId: row.fileId || ""
                }
            })
        },
        // 提交（新增或编辑）
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.isEdit) {
                        const file = this.fileList[0];
                        if (!this.form.fileId && !file) {
                            this.$message.error("请上传封面图片");
                            return;
                        }
                        if (file) {
                            this.uploadCoverImage(file.raw).then(res => {
                                this.form.fileId = res.id
                                this.form.createTime = new Date().getTime();
                                updateActivityHighlight(this.form).then(res => {
                                    this.queryList();
                                    this.$message.success("编辑成功");
                                    this.addAndEditDialogVisible = false;
                                    this.clearAddForm();
                                }).catch(err => {
                                    this.$message.error("编辑失败")
                                    console.log(err);
                                });
                            }).catch(err => {
                                this.$message.error("上传封面图片失败");
                            });
                        }
                    } else {
                        const file = this.fileList[0];
                        if (!file) {
                            this.$message.error("请上传封面图片");
                            return;
                        }
                        this.uploadCoverImage(file.raw).then(res => {
                            this.form.fileId = res.id
                            addActivityHighlight(this.form).then(res => {
                                this.queryList();
                                this.$message.success("添加成功");
                                this.addAndEditDialogVisible = false;
                                this.clearAddForm();
                            }).catch(err => {
                                this.$message.error("添加失败")
                                console.log(err);
                            });
                        }).catch(err => {
                            this.$message.error("上传封面图片失败");
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
                deleteActivityHighlight(id).then(res => {
                    this.queryList();
                    this.$message.success("删除成功");
                }).catch(err => {
                    this.$message.error("删除失败")
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
                deleteActivityHighlightByBatch(this.selectedIds).then(res => {
                    this.queryList();
                    this.$message.success(`成功删除 ${this.selectedIds.length} 条记录`);
                }).catch(err => {
                    this.$message.error("批量删除失败")
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        // 封面图片上传
        uploadCoverImage(file) {
            const formData = new FormData();
            formData.append('file', file);

            return fileUpload(formData).then(response => {
                return response.data; // 返回文件路径
            }).catch(error => {
                this.$message.error('上传封面图片失败');
                console.error(error);
                return null;
            });
        },
        beforeUpload(file) {
            const isValidType = this.fileType.includes(file.type.split('/')[1].toLowerCase());
            if (!isValidType) {
                this.$message.error('只能上传 png/jpg/jpeg 文件');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传文件大小不能超过 2G!");
                return false;
            }
            return true;
        },
        handleChange(file, list) {
            if (list.length > 0) {
                this.fileList = [list[list.length - 1]]
            }
        },
        // dialog 关闭时清空表单验证信息
        onDialogClose() {
            this.$refs['form'].resetFields();
            this.clearAddForm();
        },
        handlePreview(file) {
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
    /* 新增样式：标签样式 */
    .tab-label {
        cursor: pointer;
        padding: 5px 10px;
        font-size: 16px;
        color: #606266;
    }
    .tab-label:hover {
        color: #F35339;
    }
    .tab-active {
        color: #F35339;
        font-weight: bold;
        border-bottom: 2px solid #F35339;
    }
    .tab-divider {
        margin: 0 5px;
        color: #606266;
    }
    .el-button--small{
        background-color: #C83C23;
        border-color: #C83C23;
        color: white;
    }
</style>