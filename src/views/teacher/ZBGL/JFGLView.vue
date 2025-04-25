<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="d-flex align-center">
                <v-col cols="12">
                    <SubpageTitle text="经费管理" :width="43" :height="43">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row>
                <div style="background-color: #F35339; height: 100%; width: 100%; border-radius: 20px; padding: 10px; display: flex; justify-content: space-between;">
                    <v-col cols="10">
                        <v-row>
                            <v-col cols="6" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 80px;">项目名称</span>
                                <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.title" placeholder="请输入项目名称"></el-input>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 80px;">项目编号</span>
                                <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.id" placeholder="请输入项目编号"></el-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 80px;">项目类型</span>
                                <el-select v-model="queryItems.isExpenditure" placeholder="请选择" style="margin-left: 20px; width: 100%;">
                                    <el-option
                                        v-for="item in projectTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </v-col>
                            <v-col cols="4" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 80px;">项目年度</span>
                                <el-select v-model="queryItems.startSetTime" placeholder="请选择项目年度" style="margin-left: 20px; width: 100%;">
                                    <el-option
                                        v-for="item in yearOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </v-col>
                            <v-col cols="4" class="d-flex align-center">
                                <span style="white-space: nowrap; min-width: 80px;">金额区间</span>
                                <el-input 
                                    style="margin-left: 20px; width: 40%;"
                                    v-model="queryItems.minCost" 
                                    placeholder="最低金额">
                                </el-input>
                                <span style="margin: 0 10px;">-</span>
                                <el-input 
                                    style="width: 40%;"
                                    v-model="queryItems.maxCost" 
                                    placeholder="最高金额">
                                </el-input>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" class="d-flex">
                        <el-button class="redBtn" @click="queryList" style="margin-right: 10px;">查询</el-button>
                        <el-button class="whiteBtn" @click="clearInputMessage">清除</el-button>
                    </v-col>
                </div>
            </v-row>
            <v-row style="padding: 20px 0;">
                <v-col cols="12" class="d-flex justify-space-between">
                    <div>
                        <el-button class="redBtn" @click="handleAdd">新增项目</el-button>
                        <el-button class="whiteBtn" style="margin-left: 10px;" @click="handleBatchDelete">删除项目</el-button>
                    </div>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column h-100">
                <el-table
                    :key="tableKey"
                    :data="tableData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="项目编号" width="120"></el-table-column>
                <el-table-column prop="title" label="项目名称"></el-table-column>
                <el-table-column prop="cost" label="经费金额" width="120"></el-table-column>
                <el-table-column label="项目类型" width="120">
                    <template #default="{ row }">
                        <span>{{ row.isExpenditure === 1 ? '支出' : '收入' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="入账时间" width="140">
                    <template #default="{ row }">
                        <span>{{ formatDate(row.createTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="项目内容" width="120">
                    <template #default="{ row }">
                        <el-button link @click="handleWatch(row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" fixed="right">
                    <template #default="{ row }">
                        <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
                        <el-button link type="danger" @click="handleDelete(row.id)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </v-row>
            <v-row style="background-color: #E9E9E9; margin-top: 10px;">
                <v-col cols="5">
                    <el-checkbox v-model="isAllSelected" @change="handleSelectAll">全选</el-checkbox>
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
                :title="isEdit ? '编辑项目' : '新增项目'"
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
                            <el-form-item label="项目名称" prop="title" required>
                                <el-input v-model="form.title" placeholder="请输入项目名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目类型" prop="isExpenditure" required>
                                <el-select v-model="form.isExpenditure" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                        v-for="item in projectTypeOptions"
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
                            <el-form-item label="项目年度" prop="startSetTime" required>
                                <el-select v-model="form.startSetTime" placeholder="请选择" style="width: 100%;">
                                    <el-option
                                        v-for="item in yearOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经费金额" prop="cost" required>
                                <el-input v-model="form.cost" placeholder="请输入经费金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!-- 项目内容 -->
                    <el-form-item label="项目内容">
                        <el-input
                            type="textarea"
                            v-model="form.describe"
                            placeholder="请输入项目内容描述"
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
                title="项目内容"
                v-model="watchDialogVisible"
                width="50%"
            >
                <!-- 展示项目内容 -->
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
            isAllSelected: false,
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
                title: "", // 项目名称
                id: "", // 项目编号
                isExpenditure: "", // 项目类型
                startSetTime: "", // 项目开始时间
                endSetTime: "", // 项目结束时间
                minCost: "", // 最小金额
                maxCost: "", // 最大金额
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    searchCount: true
                }
            },
            tableData: [],
            form: {
                title: "", // 项目名称
                isExpenditure: "", // 项目类型
                startSetTime: "", // 项目年度
                cost: "", // 经费金额
                describe: "", // 项目描述
            },
            currentContent: "",
            rules: {
                title: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
                isExpenditure: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
                startSetTime: [{ required: true, message: '请选择项目年度', trigger: 'change' }],
                cost: [
                    { required: true, message: '请输入经费金额', trigger: 'blur' },
                    { pattern: /^\d+(\.\d+)?$/, message: '请输入有效的金额', trigger: 'blur' }
                ]
            },
            projectTypeOptions: [
                { label: '收入', value: 0 },
                { label: '支出', value: 1 }
            ],
            yearOptions: [
                { label: '2025', value: '2025' },
                { label: '2024', value: '2024' },
                { label: '2023', value: '2023' },
                { label: '2022', value: '2022' },
                { label: '2021', value: '2021' }
            ],
            selectedIds: []
        }
    },
    mounted() {
        this.queryList();
    },
    methods: {
        queryList() {
            // 使用后端接口查询数据
            const params = {
                title: this.queryItems.title,
                id: this.queryItems.id,
                isExpenditure: this.queryItems.isExpenditure,
                startSetTime: this.queryItems.startSetTime,
                endSetTime: this.queryItems.endSetTime,
                minCost: this.queryItems.minCost,
                maxCost: this.queryItems.maxCost,
                page: {
                    pageNumber: this.queryItems.page.pageNumber,
                    pageSize: this.queryItems.page.pageSize,
                    searchCount: true
                }
            };

            this.$axios.post('/fundManage/page', params)
                .then(response => {
                    if (response.success) {
                        this.tableData = response.data.records;
                        this.tableBottom.totalNum = response.data.total;
                    } else {
                        this.$message.error(response.msg || "获取数据失败");
                    }
                })
                .catch(error => {
                    this.$message.error("获取数据失败: " + error.message);
                    console.error('获取数据失败:', error);
                });
        },
        handleSelectAll(val) {
            if (val) {
                this.tableData.forEach(row => {
                    this.$refs.multipleTable?.toggleRowSelection(row, true);
                });
            } else {
                this.$refs.multipleTable?.clearSelection();
            }
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
        handleSelectionChange(vals) {
            this.selectedIds = vals.map(item => item.id);
        },
        formatDate(date) {
            if (!date) return '';
            return date.split(' ')[0];
        },
        handleWatch(row) {
            this.currentContent = row.describe || "暂无内容";
            this.watchDialogVisible = true;
        },
        clearInputMessage() {
            this.queryItems.title = "";
            this.queryItems.id = "";
            this.queryItems.isExpenditure = "";
            this.queryItems.startSetTime = "";
            this.queryItems.endSetTime = "";
            this.queryItems.minCost = "";
            this.queryItems.maxCost = "";
        },
        clearAddForm() {
            this.form = {
                title: "",
                isExpenditure: "",
                startSetTime: "",
                cost: "",
                describe: ""
            };
            this.currentRowId = "";
            this.isEdit = false;
            
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
        },
        handleAdd() {
            this.addAndEditDialogVisible = false;
            this.$nextTick(() => {
                this.isEdit = false;
                this.clearAddForm();
                this.addAndEditDialogVisible = true;
            });
        },
        handleEdit(row) {
            // 使用后端接口获取详细信息
            this.$axios.get('/fundManage/getById', { params: { id: row.id } })
                .then(response => {
                    if (response.success) {
                        const data = response.data;
                        this.addAndEditDialogVisible = true;
                        this.isEdit = true;
                        this.currentRowId = data.id;
                        
                        this.$nextTick(() => {
                            this.form.title = data.title;
                            this.form.isExpenditure = data.isExpenditure;
                            this.form.startSetTime = data.startSetTime;
                            this.form.cost = data.cost;
                            this.form.describe = data.describe || '';
                        });
                    } else {
                        this.$message.error(response.msg || "获取详情失败");
                    }
                })
                .catch(error => {
                    this.$message.error("获取详情失败: " + error.message);
                    console.error('获取详情失败:', error);
                });
        },
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    const params = {
                        title: this.form.title,
                        isExpenditure: this.form.isExpenditure,
                        startSetTime: this.form.startSetTime,
                        cost: Number(this.form.cost),
                        describe: this.form.describe || ''
                    };
                    
                    let apiUrl = '/fundManage/add';
                    let successMsg = "添加成功";
                    
                    if (this.isEdit) {
                        apiUrl = '/fundManage/update';
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
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true,
                confirmButtonClass: 'redBtn',
                cancelButtonClass: 'whiteBtn',
            }).then(() => {
                // 使用后端批量删除接口
                this.$axios.delete('/fundManage/deleteByBatch', { data: [id] })
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
                this.$message.warning("请选择要删除的项目");
                return;
            }
            this.$confirm(`此操作将永久删除选中的 ${this.selectedIds.length} 个项目, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                confirmButtonClass: 'redBtn',
                cancelButtonClass: 'whiteBtn',
            }).then(() => {
                // 使用后端批量删除接口
                this.$axios.delete('/fundManage/deleteByBatch', { data: this.selectedIds })
                    .then(response => {
                        if (response.success) {
                            this.$message.success(`成功删除 ${this.selectedIds.length} 个项目`);
                            this.selectedIds = [];
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
        onDialogClose() {
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
        }
    }
}
</script>

<style scoped>
.content-display {
    padding: 10px;
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
    white-space: pre-wrap;
}
</style>