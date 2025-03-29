<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-col class="d-flex fill-height flex-column">
            <v-row style="height: 60px;">
                <v-col cols="8">
                    <SubpageTitle text="支部列表" svg="/src/img/FZJD/发展党员.svg" :width="43" :height="43">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row>
				<div
					style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
					<v-col cols="10">
						<span style="margin-left: 30px;">支部名称</span>
						<el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.branchName" placeholder="请输入内容"></el-input>
                        <span style="margin-left: 30px;">支部书记</span>
						<el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.branchLeaderName" placeholder="请输入内容"></el-input>
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
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">添加支部</el-button>
					</v-col>
				</div>
			</v-row>
            <v-row class="d-flex flex-column h-100">
                <!-- 设置一个占满剩余空间的 div -->
                <div class="flex-grow-1 overflow-auto">
                    <el-table 
						ref="multipleTable" 
						:data="tableData" 
						max-height="80vh"
                        @selection-change="handleSelectionChange"
                        style="border-radius: 15px;background-color: #F7F7F7;"
                        :header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle"
					>
                        <!-- 表格列定义 -->
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="branch.branchName" label="支部名称" align='center'>
                        </el-table-column>
                        <el-table-column prop="branchLeaderName" label="支部书记" align='center'>
                        </el-table-column>
                        <el-table-column prop="partyMemberCount" label="党员数量" align='center'>
                        </el-table-column>
                        <el-table-column label="操作" align='center'>
                        <template #default="scope">
                            <el-button
                            	@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
								class="redBtn"
								@click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </v-row>
            <v-row style="background-color: #E9E9E9;">
				<v-col cols="5">  
					<el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="deleteBatch">批量删除</el-button>
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
        </v-col>
        <el-dialog
			:title="isEdit ? '编辑支部' : '添加支部'"
			v-model="dialogVisible"
			width="50%">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="支部名称" prop="branchName">
							<el-input v-model="form.branchName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="支部书记" prop="branchLeaderName">
							<el-input v-model="form.branchLeaderName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<el-button @click="submit" class="redBtn">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { pageBranches, deleteBranch, deleteBranchByBatch, addBranch, editBranch } from "@/http/party.js"
import "@/style/Common.css";

export default {
    components: {
      SubpageTitle,
      ArrowDown
    },
    mounted() {
        this.queryList();
    },
    data() {
        return {
			currentRowId: "",
			isEdit: false,
			dialogVisible: false,
            queryItems: {
                branchName: "",
                branchLeaderName: "",
                page: {
					pageNumber: 1,
					pageSize: 10,
                }
            },
            form: {
                branchName: "",
                branchLeaderName: "",
            },
            tableData: [
				{
					branch: {
						id: "",
						branchName: "",
						parentBranchId: "",
						branchInfo: "",
					},
					children: null,
					branchLeaderName: "",
					partyMemberCount: 0,
				},
            ],
            tableBottom: {
                totalNum: 0,
                pageSizeList: [5, 10, 20, 30, 40]
            },
            rules: {
				branchName: [
					{ required: true, message: '请输入支部名称', trigger: 'blur' },
				],
				branchLeaderName: [
					{ required: true, message: '请输入支部书记', trigger: 'blur' },
				],
			},
            selectedIds: [],
        }
    },
    methods: {
        queryList() {
			pageBranches(this.queryItems).then(res => {
				this.tableData = res.data.records;
				this.tableBottom.totalNum = res.data.total;
			})
		},
        clearInputMessage() {
            this.queryItems.branchName = "";
            this.queryItems.branchLeaderName = "";
        },
        handleSizeChange(val) {
            this.queryItems.page.pageSize = val;
            this.queryList();
        },
        handleCurrentChange(val) {
            this.queryItems.page.pageNumber = val;
            this.queryList();
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
        submit() {
			if (!this.isEdit) {
				addBranch(this.form).then(res => {
					this.$message.success("添加支部成功")
					this.dialogVisible = false
					this.clearAddForm()
					this.queryList();
				}).catch(err => {
					this.$message.error("添加支部失败")
					console.log(err);
				});
			} else {
				// TODO: 还需要和后端沟通（resp msg: 对应的父支部Id不存在）
				const editData = { ...this.form, id: this.currentRowId };
				editBranch(editData).then(res => {
					this.$message.success("编辑支部成功")
					this.dialogVisible = false
					this.clearAddForm()
					this.queryList();
				}).catch(err => {
					this.$message.error("编辑支部失败")
					console.log(err);
				});
			}
		},
		handleEdit(index, item) {
			this.isEdit = true
			this.currentRowId = item.branch.id || ""
			this.form.branchName = item.branch.branchName
			this.form.branchLeaderName = item.branchLeaderName
			this.dialogVisible = true;
		},
		clearAddForm() {
			Object.keys(this.form).forEach(key => { this.form[key] = "" })
			this.currentRowId = ""
        },
		handleAdd() {
			this.isEdit = false
			this.clearAddForm();
			this.dialogVisible = true;
		},
		// 删除
		// TODO: 后端目前删除单条支部的接口还有问题
		handleDelete(i, item) {
			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				// center: true,
				dangerouslyUseHTMLString: true,
				confirmButtonClass: 'redBtn',
				cancelButtonClass: 'whiteBtn',
			}).then(() => {
				deleteBranch(item.branch.id).then(res => {
					this.$message.success("删除支部成功")
					this.queryList();
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		// 批量删除
		deleteBatch() {
			if (this.selectedIds.length === 0) {
				this.$message.info("还未选择记录")
				return
			}
			this.$confirm('此操作将永久删除已选中记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				// center: true,
				dangerouslyUseHTMLString: true,
				confirmButtonClass: 'redBtn',
				cancelButtonClass: 'whiteBtn',
			}).then(() => {
				deleteBranchByBatch(this.selectedIds).then(res => {
					this.$message.success("批量删除支部成功")
					this.queryList();
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
        handleSelectionChange(vals) {
			this.selectedIds = vals.map(item => String(item.branch.id))
		},
    }
};
</script>