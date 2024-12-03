<template>
	<v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
		<v-col class="d-flex fill-height flex-column">
			<v-row style="height: 60px;">
				<v-col cols="8">
					<SubpageTitle text="权限管理" width="43" height=43>
					</SubpageTitle>
				</v-col>
			</v-row>
			<v-row style="height: 80px;">
				<div
					style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
					<v-col cols="10">
						<!-- 用户权限 -->
						<span style="margin-left: 30px;">用户权限</span>
						<el-select v-model="queryItems.userAccess" placeholder="请选择" style="width: 20%; margin-left: 20px;">
							<el-option
							v-for="item in accessOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>

						<!-- 注册时间 -->
						<span style="margin-left: 30px;">注册时间</span>
						<el-select v-model="queryItems.registerTime" placeholder="请选择" style="width: 20%; margin-left: 20px;">
							<el-option
							v-for="item in registerTimeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
						<span style="margin-left: 30px;">学工号</span>
						<el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.userId" placeholder="请输入内容"></el-input>
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
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="importData">导入</el-button>
						<el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="goToAddPersonView">添加人员信息</el-button>
					</v-col>
				</div>
			</v-row>
			<v-row class="d-flex flex-column h-100">
				<!-- 设置一个占满剩余空间的 div -->
				<div class="flex-grow-1 overflow-auto">
					<el-table ref="multipleTable" :data="tableData" max-height="80vh"
						:key="tableKey"
						style="border-radius: 15px;background-color: #F7F7F7;" 
						:header-row-style="headerRowStyle" :row-style="rowStyle" :header-cell-style="headerRowStyle">
						<!-- 表格列定义 -->
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column v-if="visList[0]" prop="userId" label="学工号" align='center' width="100">
						</el-table-column>
						<el-table-column v-if="visList[1]" prop="name" label="姓名" align='center' width="220">
						</el-table-column>
						<el-table-column v-if="visList[2]" prop="access" label="用户权限" min-width="100px" align='center' width="160">
						</el-table-column>
						<el-table-column v-if="visList[3]" prop="registerTime" label="注册时间" align='center' width="160">
						</el-table-column>
						<el-table-column v-if="visList[4]" prop="phone" label="手机号" align='center' width="260">
						</el-table-column>
						<el-table-column label="操作" align='center' width="180">
						  <template #default="scope">
							  <el-button
							  size="mini"
							  class="whiteBtn"
							  @click="handleEdit(scope.$index, scope.row)">管理</el-button>
							  <el-button
							  size="mini"
							  class="redBtn"
							  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						  </template>
						</el-table-column>
					</el-table>
				</div>
			</v-row>
			<v-row style="background-color: #E9E9E9;">
				<v-col cols="5">  
					<el-button class="redBtn" style="margin-left: 30px;">编辑</el-button>
					<el-button class="whiteBtn" style="border-color: #A5A5A5;">删除</el-button>
				</v-col>
				<v-col cols="7">
					<div style="display: inline-block;float: right;">
						<div style="display: inline-block;">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
								:current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList" background
								:page-size="queryItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
							</el-pagination>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-col>

		<el-dialog
			title="管理权限信息"
			v-model="dialogVisible"
			width="50%"
			:before-close="handleClose">
			<el-form :model="accessForm" :rules="accessManageRules" ref="accessForm" label-width="100px" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="10">
						<el-form-item label="学工号" prop="userId">
							<el-input v-model="accessForm.userId" :disabled="accessFormCanNotEdit.userId"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="accessForm.name" :disabled="accessFormCanNotEdit.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="10">
						<el-form-item label="当前权限" prop="currentAccess" required>
							<el-select v-model="accessForm.currentAccess" placeholder="请选择" :disabled="accessFormCanNotEdit.currentAccess">
								<el-option
								v-for="item in accessOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="更改权限" prop="updatedAccess">
							<el-select v-model="accessForm.updatedAccess" placeholder="请选择" :disabled="accessFormCanNotEdit.updatedAccess">
								<el-option
									v-for="item in accessOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="10">
					<el-col :span="10">
						<el-form-item label="注册时间" prop="registerTime" required>
							<el-select v-model="accessForm.registerTime" placeholder="请选择" :disabled="accessFormCanNotEdit.registerTime">
								<el-option
								v-for="item in registerTimeOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号" prop="phone" required>
							<el-input v-model="accessForm.phone" :disabled="accessFormCanNotEdit.phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="备注" prop="remark">
					<el-input :rows="10" type="textarea" v-model="accessForm.remark" :disabled="accessFormCanNotEdit.remark"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" @click="saveEdit()" class="redBtn">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>

		<el-dialog
			title="导入"
			v-model="importDialogVisible"
			width="50%"
			:before-close="handleClose">
			<upload-excel-component :on-success="handleImportSuccess" :before-upload="beforeUpload" />
			<!-- <el-table :data="importTableData" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column v-for="item of importTableHeader" :key="item" :prop="item" :label="item" />
			</el-table> -->
			<template #footer>
				<el-button type="primary" @click="saveImport()" class="redBtn">确 定</el-button>
				<el-button @click="importDialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>
	</v-container>
  </template>
  
  
  <script>
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import DropDownBox from '@/components/dropDown/DropDownBox.vue';
  import AttributeSelection from '@/components/dropDown/AttributeSelection.vue';
  import UploadExcelComponent from '@/components/UploadExcel/index.vue'
  import { ArrowDown } from '@element-plus/icons-vue';
  import { getPersonAccessList, updatePersonAccess, deleteItem } from "@/http/permission.js"
  import "@/style/Common.css"
  
  /**
   * 用户权限
   */
  const UserAccessDict = {
	formalPartyMember: "正式党员",
	studentPartyMember: "党员学生",
	branchSecretary: "支部书记",
	facultyPartyCommitteeYouthLeagueCommittee: "院党委/团委",
	systemAdministrator: "系统管理员",
	unassigned: "未分配"
  };
  
  /**
   * 注册时间
   */
  const RegisterTimeDict = {
	"withinAWeek": "一周内",
	"withinAMonth": "一月内",
	"withinSixMonths": "半年内",
	"withinAYear": "一年内",
	"allTime": "全部"
};
  
  export default {
	components: {
		SubpageTitle,
		DropDownBox,
		AttributeSelection,
		ArrowDown,
		UploadExcelComponent,
	},
	data() {
		return {
			tableKey: 0,
			importDialogVisible: false,
			dialogVisible: false,
			applyTime: "",
			tableBottom: {
			  totalNum: 100,
			  pageSizeList: [10, 20, 30, 40]
			},
			tableData: [
			  {
				  userId: '22351006',
				  name: '郭宗豪',
				  access: UserAccessDict.branchSecretary,
				  registerTime: RegisterTimeDict.withinAWeek,
				  phone: "123543534",
			  },
			  {
				userId: '22351006',
				  name: '郭宗豪',
				  access: UserAccessDict.formalPartyMember,
				  registerTime: RegisterTimeDict.allTime,
				  phone: "123543534",
			  },
			  {
				userId: '22351006',
				  name: '郭宗豪',
				  access: UserAccessDict.branchSecretary,
				  registerTime: RegisterTimeDict.withinAWeek,
				  phone: "123543534",
			  }
			],
			importTableData: [],
			importTableHeader: [],
			queryItems: {
			  userAccess: "",
			  registerTime: "",
			  userId: "",
			  pageIndex: 1,
			  pageSize: 10,
			},
			visList: [true, true, true, true, true, true, true],
			accessOptions: [
			  { label: '非党员学生', value: '非党员学生' },
			  { label: '党员学生', value: '党员学生' },
			  { label: '支部书记', value: '支部书记' },
			  { label: '院党委/团委', value: '院党委/团委' },
			  { label: '系统管理员', value: '系统管理员' },
			  { label: '未分配', value: '未分配' },
			],
			registerTimeOptions: [
				{ label: '一周内', value: '一周内'},
				{ label: '一月内', value: '一月内'},
				{ label: '半年内', value: '半年内'},
				{ label: '一年内', value: '一年内'},
				{ label: '全部', value: '全部'},
			],
			selectedOption: '请选择党支部',
			accessForm: {
				userId: "",
				name: "",
				currentAccess: "",
				updatedAccess: "",
				registerTime: "",
				phone: "",
				remark: "",
			},
			accessFormCanNotEdit: {
				userId: true,
				name: true,
				currentAccess: true,
				updatedAccess: false,
				registerTime: true,
				phone: true,
				remark: false,
			},
			accessManageRules: {
				userId: [
					{ required: true, message: '请输入学工号', trigger: 'blur' },
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				currentAccess: [
					{ required: true, message: '请选择当前权限', trigger: 'change' },
				],
				registerTime: [
					{ required: true, message: '请选择注册时间', trigger: 'change' },
				],
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
				],
			}
		}
	},
	mounted() {
		this.queryList();
	},
	methods: {
		clearInputMessage() {
			this.queryItems.userId = "";
			this.queryItems.name = "";
			this.queryItems.applyTime = "";
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.queryItems.pageSize = val;
			this.queryList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.queryItems.pageIndex = val;
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
		showDialog() {
			this.dialogVisible = true
		},
		queryList() {
		  console.log("执行了查询列表的请求");
		  getPersonAccessList(this.queryItems).then(res => {
			this.tableData = res.data;
		  });
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
		handleSelectionChange(val) {
		  this.multipleSelection = val;
		},
		handleCommand(command) {
		  console.log(command);
		  this.selectedOption = command;
		},
	   toggleSelection(rows) {
		  if (rows) {
			  rows.forEach(row => {
				  this.$refs.multipleTable.toggleRowSelection(row);
			  });
		  } else {
			  this.$refs.multipleTable.clearSelection();
		  }
		},
		handleOptionChange (newOption) {
		  console.log('选项变化：', newOption);
		  this.selectedOption = newOption;
		},
		handleEdit(i, val) {
			this.accessForm = JSON.parse(JSON.stringify(val))
			this.accessForm.currentAccess = val.access
			this.dialogVisible = true
		},
		saveEdit() {
			// 根据userId请求修改
			updatePersonAccess(this.accessForm).then((res) => {
				this.queryList();
				dialogVisible = false
			})
		},
		handleDelete(i, val) {
			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				// center: true,
				dangerouslyUseHTMLString: true, // 允许使用 HTML
				confirmButtonClass: 'redBtn', // 自定义确认按钮的类名
				cancelButtonClass: 'whiteBtn', // 自定义取消按钮的类名
			}).then(() => {
				// 根据userId请求删除
				deleteItem(val.userId)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		// 表格导入
		importData() {
			this.importDialogVisible = true
		},
		saveImport() {
			// 发送请求
		},
		beforeUpload(file) {
			const isLt1M = file.size / 1024 / 1024 < 1
			if (isLt1M) {
				return true
			}
			this.$message({
				message: 'Please do not upload files larger than 1m in size.',
				type: 'warning'
			})
			return false
		},
		handleImportSuccess({ results, header }) {
			this.importTableData = results
			this.importTableHeader = header
		}
	},
  }
  </script>