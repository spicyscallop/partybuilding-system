<template>
    <v-col class="d-flex fill-height flex-column">
        <v-row>
            <div style="background-color: #F35339; height: 100%; width: 100%; border-radius: 20px; padding: 10px; display: flex; justify-content: space-between;">
                <v-col cols="10">
                    <v-row>
                        <v-col cols="8" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">奖项名称</span>
                            <el-input style="margin-left: 20px; width: 100%;" v-model="queryItems.name" placeholder="请输入内容"></el-input>
                        </v-col>
                        <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">奖项编号</span>
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
                        <!-- <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">获奖人</span>
                            <el-select v-model="queryItems.winner" placeholder="请选择" style="flex: 1; margin-left: 20px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option
                                    v-for="item in winnerOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </v-col> -->
                        <v-col cols="4" class="d-flex align-center">
                            <span style="white-space: nowrap; min-width: 60px;">荣誉等级</span>
                            <el-select v-model="queryItems.honorLevel" placeholder="请选择" style="flex: 1; margin-left: 20px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option
                                    v-for="item in honorLevelOptions"
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
                    <el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">新增奖项</el-button>
                    <el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="handleBatchDelete">删除奖项</el-button>
            </div>
        </v-row>
        <v-row class="d-flex flex-column h-100 mt-10 mb-10">
            <el-table
                :key="tableKey"
                :data="ryjx"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="奖项编号" width="200"></el-table-column>
            <el-table-column prop="name" label="奖项名称"></el-table-column>
            <!-- <el-table-column prop="winner" label="获奖人" width="120"></el-table-column> -->
            <el-table-column prop="createTime" label="发布时间" width="120">
                <template #default="{ row }">
                    <span>{{ formatDate(row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="honorLevel" label="荣誉等级" width="100"></el-table-column>
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
            :title="isEdit ? '编辑奖项' : '新增奖项'"
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
                        <el-form-item label="奖项名称" prop="name" required>
                            <el-input v-model="form.name" placeholder="请输入奖项名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="奖项编号" prop="id">
                            <el-input v-model="form.id" placeholder="提交后自动生成" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <!-- <el-col :span="12">
                        <el-form-item label="获奖单位" prop="winner" required>
                            <el-select v-model="form.winner" placeholder="请选择获奖单位" style="width: 100%;">
                                <el-option
                                    v-for="item in winnerOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="获奖等级" prop="honorLevel" required>
                            <el-select v-model="form.honorLevel" placeholder="请选择" style="width: 100%;">
                                <el-option
                                    v-for="item in honorLevelOptions"
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
                </el-row>
            </el-form>

            <!-- 底部按钮 -->
            <template #footer>
                <el-button class="redBtn" @click="handleSubmit">提交</el-button>
                <el-button class="whiteBtn" @click="addAndEditDialogVisible = false">取消</el-button>
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
    getPrizePage, 
    addPrize, 
    updatePrize,
    deletePrize, 
    deletePrizeByBatch 
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
            tableKey: 0,
            isEdit: false,
            currentRowId: "",
            tableBottom: {
                totalNum: 0,
                pageSizeList: [5, 10, 20, 30, 40]
            },
            queryItems: {
                id: "",
                name: "",
                // winner: "",
                createTime: "",
                honorLevel: "",
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    searchCount: true
                }
            },
            ryjx: [],
            form: {
                id: "",
                name: "",
                // winner: "",
                honorLevel: "",
                createTime: "",
            },
            rules: {
                name: [{ required: true, message: '请输入奖项名称', trigger: 'blur' }],
                // winner: [{ required: true, message: '请选择获奖单位', trigger: 'change' }],
                honorLevel: [{ required: true, message: '请选择获奖等级', trigger: 'change' }],
            },
            // winnerOptions: [
            //     { label: '软件学院团队', value: '软件学院团队' },
            //     { label: 'xx实验室', value: 'xx实验室' },
            // ],
            honorLevelOptions: [
                { label: '国家级', value: '国家级' },
                { label: '省部级', value: '省部级' },
                { label: '校级', value: '校级' },
            ],
            selectedIds: [],
        }
    },
    mounted() {
        this.queryList()
    },
    methods: {
        queryList() {
            if (this.queryItems.honorLevel === "全部") this.queryItems.honorLevel = "";
            // if (this.queryItems.winner === "全部") this.queryItems.winner = "";
            getPrizePage(this.queryItems).then(res => {
                this.ryjx = res.data.records;
                this.tableBottom.totalNum = res.data.total;
            })
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
        clearInputMessage() {
            this.queryItems = {
                id: "",
                name: "",
                // winner: "",
                createTime: "",
                honorLevel: "",
            }
        },
        clearAddForm() {
            this.form = {
                id: "",
                name: "",
                // winner: "",
                honorLevel: "",
                createTime: "",
            },
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
            this.addAndEditDialogVisible = true;
            this.isEdit = true;
            this.currentRowId = row.id;
            // 回显数据
            this.$nextTick(() => {
                this.form = {
                    id: row.id,
                    name: row.name,
                    // winner: form.winner,
                    honorLevel: row.honorLevel,
                    createTime: this.formatDateToYMD(row.createTime),
                }
            })
        },
        // 提交（新增或编辑）
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.isEdit) {
                        updatePrize(this.form).then(res => {
                            this.queryList();
                            this.$message.success("编辑成功");
                            this.addAndEditDialogVisible = false;
                            this.clearAddForm();
                        }).catch(err => {
                            this.$message.error("编辑失败")
                            console.log(err);
                        });
                    } else {
                        addPrize(this.form).then(res => {
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
                deletePrize(id).then(res => {
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
                deletePrizeByBatch(this.selectedIds).then(res => {
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
</style>