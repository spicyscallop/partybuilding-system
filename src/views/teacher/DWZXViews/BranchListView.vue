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
					<v-col cols="2">
                        <!-- 属性筛选 -->
                        <AttributeSelection :optionList=colNames style="display: inline-block;float: right;"
                            @optionChange="changeCheckCols"></AttributeSelection>
                    </v-col>
				</div>
			</v-row>
            <v-row class="d-flex flex-column h-100">
                <!-- 设置一个占满剩余空间的 div -->
                <div class="flex-grow-1 overflow-auto">
                    <el-table
						:key="tableKey"
						ref="multipleTable" 
						:data="tableData" 
						max-height="80vh"
                        @selection-change="handleSelectionChange"
                        style="border-radius: 15px;background-color: #F7F7F7;"
                        :header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle"
					>
                        <el-table-column type="selection" width="40">
                        </el-table-column>
                        <el-table-column v-if="visList[0]" prop="branch.branchName" label="支部名称" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[1]" prop="branchLeaderName" label="支部书记" align='center'>
                        </el-table-column>
                        <el-table-column v-if="visList[2]" prop="partyMemberCount" label="党员数量" align='center' width="100">
                        </el-table-column>
						<el-table-column v-if="visList[3]" prop="preparatoryPartyMemberCount" label="预备党员数量" align='center' width="110">
                        </el-table-column>
						<el-table-column v-if="visList[4]" prop="activeMemberCount" label="积极分子数量" align='center' width="110">
                        </el-table-column>
						<el-table-column v-if="visList[5]" prop="developmentObjectCount" label="发展对象数量" align='center' width="110">
                        </el-table-column>
						<el-table-column v-if="visList[6]" prop="partyApplicantCount" label="团员数量" align='center' width="100">
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
							<el-input v-model="form.branch.branchName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						 <el-form-item label="支部书记" prop="branchSecretaryId" required>
							<el-select v-model="form.branchSecretaryId" placeholder="请选择" style="width: 100%;">
								<el-option
									v-for="branchLeader in branchLeaderList"
									:key="branchLeader.id"
									:label="branchLeader.name"
									:value="branchLeader.id">
								</el-option>
							</el-select>
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
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue'
import { ArrowDown } from '@element-plus/icons-vue';
import { findAllBranchLeader, pageBranches, deleteBranch, deleteBranchByBatch, addBranch, editBranch } from "@/http/party.js"
import "@/style/Common.css";

export default {
    components: {
      SubpageTitle,
	  AttributeSelection,
      ArrowDown
    },
    mounted() {
        this.queryList();
		findAllBranchLeader().then(res => {
			if (res.data.length <= 0) this.branchLeaderList = [{ id: "", name: "" }]
			this.branchLeaderList = res.data.map(item => ({
				id: item.id,
				name: item.userName,
			}))
			// console.log(this.branchLeaderList)
		}).catch(err => {
			this.$message.error("支部书记列表请求出错")
		})
    },
    data() {
        return {
			tableKey: 0,
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
                branch: {
					branchName: "",
				},
				branchSecretaryId: "",
            },
            tableData: [
				{
					branch: {
						id: "",
						branchName: "",
						branchInfo: "",
					},
					children: null,
					branchLeaderName: "",
					branchSecretaryId: "",
					partyMemberCount: 0,
					activeMemberCount: 0,
					developmentObjectCount: 0,
					preparatoryPartyMemberCount: 0,
					partyApplicantCount: 0
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
			branchLeaderList: [],
			checkedCols: [
				'支部名称',
				'支部书记',
				'党员数量',
				'预备党员数量',
				'积极分子数量',
				'发展对象数量',
				'共青团员数量',
			],
			colNames: [
				'支部名称',
				'支部书记',
				'党员数量',
				'预备党员数量',
				'积极分子数量',
				'发展对象数量',
				'共青团员数量',
			],
			visList: [true, true, true, true, true, true, true],
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
				let editData = { ...this.form};
				editData.branch.id = this.currentRowId
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
			this.form.branch.branchName = item.branch.branchName
			this.form.branchSecretaryId = item.branchSecretaryId
			this.dialogVisible = true;
		},
		clearAddForm() {
			this.form.branch = {
				branchName: "",
			};
			this.form.branchSecretaryId = ""
			this.currentRowId = ""
        },
		handleAdd() {
			this.isEdit = false
			this.clearAddForm();
			this.dialogVisible = true;
		},
		// 删除
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
		handleCheckChange() {
			for (let i = 0; i < this.colNames.length; i++) {
				this.visList[i] = true
			}
			for (let i = 0; i < this.colNames.length; i++) {
				let flag = false;
				for (let j = 0; j < this.checkedCols.length; j++) {
					if (this.colNames[i] === this.checkedCols[j]) {
						flag = true;
						break;
					}
				}
				this.visList[i] = flag;
				this.tableKey += 1;
			}
		},
		changeCheckCols(indexList) {
			let new_checkedCols = [];
			for (let i = 0; i < indexList.length; i++) {
				new_checkedCols.push(this.colNames[indexList[i]]);
			}
			this.checkedCols = new_checkedCols;
			this.handleCheckChange();
		}
    }
};
</script>