<template>
	<v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
		<v-col class="d-flex fill-height flex-column">
			<v-row style="height: 60px;">
				<v-col cols="8">
					<SubpageTitle text="人员列表">
					</SubpageTitle>
				</v-col>
				<v-col cols="4">
					<el-select v-model="queryItems.developmentPhase" style="width: 200px;float: right;" @change="handleOptionChange">
						<el-option label="全部" value="全部"></el-option>
						<el-option v-for="item in developmentPhaseOptions" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
					<div style="display: inline-block; float:right; margin-top: 5px;margin-right: 10px;">
						<span style="">发展阶段</span>
					</div>
					<img src="/src/img/FZJD/支部选择.png" alt="发展阶段"
						style=" margin-top: 6px;margin-left:0px;width:23px;height:23px; float:right;">
				</v-col>
			</v-row>
			<v-row>
				<div
					style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
					<v-col cols="10">
						<span style="margin-left: 30px;">学工号</span>
						<el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.userNumber" placeholder="请输入内容"></el-input>
						<span style="margin-left: 30px;">姓名</span>
						<el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.userName" placeholder="请输入内容"></el-input>
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
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">添加人员信息</el-button>
					</v-col>
					<v-col cols="2">
						<AttributeSelection :optionList=colNames style="display: inline-block;float: right;"
							@optionChange="changeCheckCols"></AttributeSelection>
					</v-col>
				</div>
			</v-row>
			<v-row class="d-flex flex-column h-100">
				<!-- 设置一个占满剩余空间的 div -->
				<div class="flex-grow-1 overflow-auto">
					<el-table ref="multipleTable" :data="tableData" max-height="80vh"
						@selection-change="handleSelectionChange"
						:key="tableKey"
						style="border-radius: 15px;background-color: #F7F7F7;" 
						:header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle">
						<!-- 表格列定义 -->
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column v-if="visList[0]" prop="userNumber" label="学工号" align='center'>
						</el-table-column>
						<el-table-column v-if="visList[1]" prop="userName" label="姓名" align='center'>
						</el-table-column>
						<el-table-column v-if="visList[2]" prop="isLeague" label="团员身份" min-width="100px" align='center' :formatter=formatter>
						</el-table-column>
						<el-table-column v-if="visList[3]" prop="developmentPhase" label="发展阶段" align='center'>
						</el-table-column>
						<el-table-column v-if="visList[4]" prop="branchName" label="所在支部" align='center' width="260">
						</el-table-column>
						<el-table-column v-if="visList[5]" prop="branchLeaderName" label="支部书记" align='center' width="130">
						</el-table-column>
						<el-table-column label="操作" align='center' width="200">
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
					<el-button class="whiteBtn" style="border-color: #A5A5A5;">批量删除</el-button>
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
			:title="dialogTitle"
			v-model="dialogVisible"
			width="50%">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="学工号" prop="userNumber">
							<el-input v-model="form.userNumber"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="姓名" prop="userName">
							<el-input v-model="form.userName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="发展阶段" prop="developmentPhase">
							<el-select v-model="form.developmentPhase" placeholder="请选择">
								<el-option
									v-for="item in developmentPhaseOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="所在支部" prop="branchName">
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
				<el-button type="primary" @click="submit()" class="redBtn">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>

	</v-container>
</template>


<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { findByPhase, deleteItem, deleteByBatch, addItem, updateItem } from "@/http/party"
import "@/style/Common.css"

export default {
	components: {
		SubpageTitle,
		DropDownBox,
		AttributeSelection,
		ArrowDown,
	},
	mounted() {
		this.queryItems.developmentPhase = this.$route.query.phase ? this.$route.query.phase : "";

		this.queryList();
	},
	data() {
		return {
			developmentPhase: "",
			tableKey: 0,
			dialogTitle: "",
			dialogVisible: false,
			applyTime: "",
			tableBottom: {
				totalNum: 0,
				pageSizeList: [10, 20, 30, 40]
			},
			tableData: [
				{
					userNumber: "",
					userName: "",
					isLeague: false,
					developmentPhase: "",
					branchName: "",
					branchLeaderName: "",
				},
			],
			form: {
				id: "",
				userNumber: "",
				userName: "",
				developmentPhase: "",
				branchName: "",
				branchLeaderName: "",
			},
			queryItems: {
				userNumber: "",
				userName: "",
				developmentPhase: "",
				page: {
					pageNumber: 0,
					pageSize: 10,
				},
				needBranchLeaderName: true,
				needBranchName: true,
			},
			// 属性筛选
			checkedCols: ['学工号', '姓名', '团员身份', '发展阶段', '所在支部', '支部书记'],
			colNames: ['学工号', '姓名', '团员身份', '发展阶段', '所在支部', '支部书记'],
			visList: [true, true, true, true, true, true, true],
			developmentPhaseOptions: [
				{ label: '正式党员', value: '正式党员' },
				{ label: '预备党员', value: '预备党员' },
				{ label: '发展对象', value: '发展对象' },
				{ label: '积极分子', value: '积极分子' },
				{ label: '入党申请人', value: '入党申请人' },
				{ label: '共青团员', value: '共青团员' },
			],
			rules: {
				userNumber: [
					{ required: true, message: '请输入学工号', trigger: 'blur' },
				],
				userName: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				developmentPhase: [
					{ required: true, message: '请选择发展阶段', trigger: 'change' },
				],
			},
			selectedIds: [],
		}
	},
	methods: {
		queryList() {
			if (this.queryItems.developmentPhase === "全部") this.queryItems.developmentPhase = "";
			findByPhase(this.queryItems).then(res => {
				this.tableData = res.data.records;
				this.tableBottom.totalNum = res.data.total;
			})
		},
		submit() {
			if (this.dialogTitle === "添加人员信息") {
				addItem(this.form).then(res => {
					
				})
			} else if (this.dialogTitle === "编辑人员信息") {
				updateItem(this.form).then(res => {
					console.log("update ", this.form);
				})
			}
		},
		handleEdit(index, item) {
			this.dialogTitle = "编辑人员信息";
			this.form = {
				...item
			}

			this.dialogVisible = true;
		},
		handleAdd() {
			this.dialogTitle = "添加人员信息";
			Object.keys(this.form).forEach(key => { this.form[key] = "" })
			this.form.developmentPhase = this.queryItems.developmentPhase;

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
				// 根据id请求删除
				deleteItem(item.id)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},

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
				dangerouslyUseHTMLString: true, // 允许使用 HTML
				confirmButtonClass: 'redBtn', // 自定义确认按钮的类名
				cancelButtonClass: 'whiteBtn', // 自定义取消按钮的类名
			}).then(() => {
				deleteByBatch(this.selectedIds).then(res => {
					this.queryList();
					this.$message.success("删除成功")
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		handleOptionChange() {
			this.queryList();
		},
		formatter(row, col, cellVal) {
			return cellVal ? '是' : '否'; 
		},
		clearInputMessage() {
			this.queryItems.userId = "";
			this.queryItems.name = "";
			this.queryItems.applyTime = "";
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
		handleCheckChange() {
			console.log("处理表格列变动：", this.checkedCols);
			for (let i = 0; i < this.colNames.length; i++){
				this.visList[i]= true
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
				// 用于更新表格
				this.tableKey += 1;
			}
		},
		changeCheckCols(indexList) {
			console.log("cols变化");
			let new_checkedCols = [];
			for (let i = 0; i < indexList.length; i++) {
				new_checkedCols.push(this.colNames[indexList[i]]);
			}
			this.checkedCols = new_checkedCols;
			this.handleCheckChange();
		},
		handleSelectionChange(vals) {
			this.selectedIds = vals.map(item => item.id)
		},
	},
}
</script>
