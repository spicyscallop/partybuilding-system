<template>
	<v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
		<v-col class="d-flex fill-height flex-column">
			<v-row style="height: 60px;">
				<v-col cols="8">
					<SubpageTitle text="权限管理" :width="43" :height="43">
					</SubpageTitle>
				</v-col>
			</v-row>
			<v-row style="height: 80px;">
				<div
					style="background-color: #F35339; height: 100%;width: 100%;border-radius: 20px;padding-top: 10px;display: flex;">
					<v-col cols="10">
						<!-- 用户权限 -->
						<span style="margin-left: 30px;">用户权限</span>
						<el-select v-model="queryItems.role" placeholder="请选择" style="width: 20%; margin-left: 20px;">
							<el-option label="全部" value="全部"></el-option>
							<el-option
							v-for="item in accessOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>

						<!-- 注册时间 -->
						<!-- <span style="margin-left: 30px;">注册时间</span>
						<el-select v-model="queryItems.createTime" placeholder="请选择" style="width: 20%; margin-left: 20px;">
							<el-option
							v-for="item in registerTimeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select> -->
						<span style="margin-left: 30px;">学工号</span>
						<el-input style="width: 20%; margin-left: 20px;" v-model="queryItems.userNumber" placeholder="请输入内容"></el-input>
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
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="downloadTemplate('批量导入人员表格模板')">模板下载</el-button>
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="importData">批量导入</el-button>
						<el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="addDialogVisible=true">添加人员信息</el-button>
					</v-col>
				</div>
			</v-row>
			<v-row class="d-flex flex-column h-100">
				<!-- 设置一个占满剩余空间的 div -->
				<div class="flex-grow-1 overflow-auto">
					<el-table ref="multipleTable" :data="tableData" max-height="80vh"
						:key="tableKey"
						style="border-radius: 15px;background-color: #F7F7F7;" 
						:header-row-style="headerRowStyle" 
						:row-style="rowStyle" 
						:header-cell-style="headerRowStyle"
						@selection-change="handleSelectionChange"
						>
						<!-- 表格列定义 -->
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column v-if="visList[0]" prop="userNumber" label="学工号" align='center'>
						</el-table-column>
						<el-table-column v-if="visList[1]" prop="userName" label="姓名" align='center'>
						</el-table-column>
						<el-table-column v-if="visList[2]" prop="role" label="用户权限" min-width="100px" align='center'>
						</el-table-column>
						<el-table-column v-if="visList[3]" prop="createTime" label="注册时间" align='center'>
							<template v-slot="scope">
								{{ formatTime(scope.row.createTime) }}
							</template>
						</el-table-column>
						<el-table-column v-if="visList[4]" prop="email" label="邮箱" align='center'>
						</el-table-column>
						<el-table-column label="操作" align='center'>
						  <template #default="scope">
							  <el-button
							  class="whiteBtn"
							  @click="handleEdit(scope.$index, scope.row)">管理</el-button>
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
					<el-button class="redBtn" style="border-color: #A5A5A5;" @click="deleteBatch">批量删除</el-button>
				</v-col>
				<v-col cols="7">
					<div style="display: inline-block;float: right;">
						<div style="display: inline-block;">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
								:current-page="tableBottom.currentPage" :page-sizes="tableBottom.pageSizeList" background
								:page-size="queryItems.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableBottom.totalNum">
							</el-pagination>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-col>

		<el-dialog
			title="管理权限信息"
			v-model="dialogVisible"
			width="50%">
			<el-form :model="accessForm" :rules="accessManageRules" ref="accessForm" label-width="100px" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="10">
						<el-form-item label="学工号" prop="userNumber">
							<el-input v-model="accessForm.userNumber" :disabled="accessFormCanNotEdit.userNumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名" prop="userName">
							<el-input v-model="accessForm.userName" :disabled="accessFormCanNotEdit.userName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="10">
						<el-form-item label="当前权限" prop="currentRole" required>
							<el-select v-model="accessForm.currentRole" placeholder="请选择" :disabled="accessFormCanNotEdit.currentRole">
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
						<el-form-item label="更改权限" prop="updatedRole">
							<el-select v-model="accessForm.updatedRole" placeholder="请选择" :disabled="accessFormCanNotEdit.updatedRole">
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
						<el-form-item label="注册时间" prop="createTime" required>
							<el-input :value="formatTime(accessForm.createTime)" :disabled="accessFormCanNotEdit.createTime"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="accessForm.email" :disabled="accessFormCanNotEdit.email"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<el-button type="primary" @click="saveEdit()" class="redBtn">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>

		<el-dialog
			title="添加人员信息"
			v-model="addDialogVisible"
			width="50%">
			<el-form :model="form" :rules="accessManageRules" ref="form" label-width="100px" class="demo-ruleForm">
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
						<el-form-item label="权限" prop="role">
							<el-select v-model="form.role" placeholder="请选择">
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
					<el-col :span="12">
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="form.email"></el-input>
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
			</el-form>
			<template #footer>
				<el-button type="primary" @click="saveAdd()" class="redBtn">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>


		<el-dialog
			title="导入"
			v-model="importDialogVisible"
			width="80%">
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
  import { getPersonAccessList, updatePersonAccess, deleteItem, addItem, deleteByBatch, downloadTemplate } from "@/http/permission.js"
  import "@/style/Common.css"
  
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
			addDialogVisible: false,
			importDialogVisible: false,
			dialogVisible: false,
			applyTime: "",
			tableBottom: {
			  totalNum: 0,
			  pageSizeList: [5, 10, 20, 30, 40]
			},
			tableData: [],
			importTableData: [],
			importTableHeader: [],
			queryItems: {
			  role: "",
			//   createTime: "",
			  userNumber: "",
			  page: {
				pageNumber: 1,
				pageSize: 10,
			  }
			},
			visList: [true, true, true, true, true, true, true],
			accessOptions: [
				{ label: '支部书记', value: '支部书记' },
				{ label: '学校党委', value: '学校党委' },
				{ label: '系统管理员', value: '系统管理员' },
				{ label: '学生', value: '学生' },
			],
			// registerTimeOptions: [
			// 	{ label: '全部', value: '全部'},
			// 	{ label: '一周内', value: '一周内'},
			// 	{ label: '一月内', value: '一月内'},
			// 	{ label: '半年内', value: '半年内'},
			// 	{ label: '一年内', value: '一年内'},
			// ],
			developmentPhaseOptions: [
				{ label: '共青团员', value: '共青团员' },
				{ label: '入党申请人', value: '入党申请人' },
				{ label: '积极分子', value: '积极分子' },
				{ label: '发展对象', value: '发展对象' },
				{ label: '预备党员', value: '预备党员' },
				{ label: '正式党员', value: '正式党员' },
			],
			form: {
				userNumber: "",
				userName: "",
				role: "",
				email: "",
				developmentPhase: "",
			},
			selectedOption: '请选择党支部',
			accessForm: {
				id: "",
				userNumber: "",
				userName: "",
				currentRole: "",
				updatedRole: "",
				createTime: "",
				email: "",
				developmentPhase: "",
			},
			accessFormCanNotEdit: {
				userNumber: true,
				userName: true,
				currentRole: true,
				updatedRole: false,
				createTime: true,
				email: false,
				developmentPhase: true,
			},
			accessManageRules: {
				userNumber: [
					{ required: true, message: '请输入学工号', trigger: 'blur' },
				],
				userName: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				role: [
					{ required: true, message: '请选择权限', trigger: 'change' },
				],
				currentRole: [
					{ required: true, message: '请选择当前权限', trigger: 'change' },
				],
				createTime: [
					{ required: true, message: '请选择注册时间', trigger: 'change' },
				],
				developmentPhase: [
					{ required: true, message: '请选择发展阶段', trigger: 'change' },
				],
			},
			selectedIds: [],
		}
	},
	mounted() {
		this.queryList();
	},
	methods: {
		queryList() {
			if (this.queryItems.role === "全部") this.queryItems.role = "";
			getPersonAccessList(this.queryItems).then(res => {
				this.tableData = res.data.records;
				this.tableBottom.totalNum = res.data.total;
			});
		},
		clearInputMessage() {
			this.queryItems.userNumber = "";
			this.queryItems.applyTime = "";
			this.queryItems.role = "";
			this.queryItems.createTime = "";
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
		showDialog() {
			this.dialogVisible = true
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
			// 先进行赋值
			this.accessForm = JSON.parse(JSON.stringify(val))
			this.accessForm.currentRole = val.role
			this.dialogVisible = true
		},
		saveEdit() {
			updatePersonAccess({
				id: this.accessForm.id,
				role: this.accessForm.updatedRole,
				email: this.accessForm.email
			}).then((res) => {
				this.queryList();
				this.$message.success("修改成功")
				this.dialogVisible = false
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
				deleteItem(val.id)
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
		},
		formatTime(timestamp) {
			if (!timestamp) {
				return '';
			}
			let date = new Date(timestamp);
			let year = date.getFullYear();
			let month = date.getMonth() + 1; // 月份从 0 开始，所以需要加 1
			let day = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			let formattedDate = `${year}-${month}-${day}`;
			// 如果时、分、秒不全为 00，则添加时间部分
			if (hours !== 0 || minutes !== 0 || seconds !== 0) {
				formattedDate += ` ${hours}:${minutes}:${seconds}`;
			}
			return formattedDate;
		},
		saveAdd() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					addItem(this.form).then(res => {
						this.queryList();
						this.$message.success("添加成功")
						this.addDialogVisible = false
					})
				} else {
					return false;
				}
			});
		},
		handleSelectionChange(vals) {
			this.selectedIds = vals.map(item => item.id)
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
		// 模板下载
		downloadTemplate(fileName) {
			downloadTemplate(fileName).then(blob => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', fileName + ".xlsx");
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			}).catch(error => {
				this.$message.error('下载失败')
				console.log(error)
			});
		}
	},
  }
  </script>