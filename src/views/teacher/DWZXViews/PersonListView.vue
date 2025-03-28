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
						<el-button class="redBtn" style="border-color: #A5A5A5;" @click="handleAdd">添加人员</el-button>
						<el-button class="whiteBtn" style="border-color: #A5A5A5;" @click="batchInput">批量导入</el-button>
					</v-col>
					<v-col cols="2">
							<el-link type="primary" @click="downloadTemplate">下载模版</el-link>
							<div class="divider">/</div>
							<el-link type="primary">上传模版</el-link>
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

		<el-dialog
			title="上传文件"
			v-model="inputdialogVisible"
			width="50%">
			
			<div class="upload-dialog">
				<!-- 上传状态显示 -->
				<div v-if="uploading" class="upload-status">
					<el-progress 
						type="circle" 
						:percentage="uploadProgress"
						:status="uploadStatus"
						:color="uploadStatus === 'exception' ? '#ff4d4f' : uploadStatus === 'success' ? '#67c23a' : '#e14338'"
						class="progress-circle">
						<template #default>
						<span class="progress-text">
      						{{ uploadStatus === '' ? `${uploadProgress}%` : uploadStatusText }}
						</span>
						</template>
					</el-progress>
					<div class="status-text">
						{{ currentFile.name }} ({{ formatFileSize(currentFile.size) }})
					</div>
				</div>

				<div v-else 
					class="upload-area" 
					@drop.prevent="handleDrop" 
					@dragover.prevent
					@click="triggerFileInput">
					<div class="upload-content">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100" height="100">
							<circle cx="250" cy="250" r="250" fill="#b3b3b3"/>
							<path d="M250 120 C180 120 160 170 170 200 C130 200 100 230 100 280 C100 330 140 360 190 360 
									L310 360 C360 360 400 330 400 280 C400 230 370 200 330 200 
									C340 170 320 120 250 120 Z" fill="white"/>
							<circle cx="250" cy="400" r="60" fill="#666666"/>
							<path d="M250 430 L250 370 M250 380 L220 410 M250 380 L280 410" 
									stroke="white" stroke-width="15" stroke-linecap="round" fill="none"/>
							<circle cx="180" cy="400" r="20" fill="white"/>
							<circle cx="320" cy="400" r="20" fill="white"/>
						</svg>
						<p class="upload-text">拖拽或选择你的文件到这里来上传，</p>
						<p class="upload-text">或者<span class="browse-text">浏览</span>你的本地文件夹</p>
					</div>
				</div>
				<!-- 已选文件展示 -->
				<div v-if="currentFile && !uploading">
					<div class="file-title">
						<h4>待上传文件（每次只能上传一个文件）</h4>
					</div>
					<div class="selected-file">
						<div class="file-info">
							<span class="file-name">{{ currentFile.name }}</span>
							<span class="file-size">({{ formatFileSize(currentFile.size) }})</span>
						</div>
						<el-button type="text" @click="currentFile = null">移除</el-button>
					</div>
				</div>
				 <!-- 隐藏的文件输入 -->
				 <input type="file" ref="fileInput" hidden 
					@change="handleFileSelect" 
					accept=".xls,.xlsx"/>
  			</div>

			  <template #footer>
				<el-button v-if="!uploading" 
						type="danger" 
						@click="submitUpload" 
						:disabled="!currentFile" 
						class="redBtn">
					提 交
				</el-button>
				<el-button v-else
						type="danger" 
						disabled
						class="redBtn">
					上传中
				</el-button>
				<el-button @click="inputdialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>
	</v-container>
</template>


<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { findByPhase, deleteItem, deleteByBatch, addItem, updateItem } from "@/http/party"
import "@/style/Common.css"

export default {
	components: {
		SubpageTitle,
		DropDownBox,
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
			inputdialogVisible: false,
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
			fileList: [],
      		uploadProgress: 0,
			// 上传相关状态
			currentFile: null,
			uploading: false,
			uploadStatus: '',
			uploadStatusText: '上传中',
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
					if(res.code == 200){
						this.$message.success("添加成功")
						this.dialogVisible = false
						this.queryList()
					}
				})
			} else if (this.dialogTitle === "编辑人员信息") {
				updateItem(this.form).then(res => {
					if(res.code == 200){
						this.$message.success("添加成功")
						this.dialogVisible = false
						this.queryList()
					}
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
		batchInput() {
			this.inputdialogVisible = true;
		},
		async downloadTemplate(){
			try {
				const response = await this.$axios({
					method: 'get',
					url: '/files/downloadByDocTemplateType',
					responseType: 'blob',
					params: {  // 添加type参数
						type: '批量导入人员表格模板'
					} 
				})
				const blob = new Blob([response])
				const downloadUrl = window.URL.createObjectURL(blob)
				const link = document.createElement('a')
				link.href = downloadUrl
				const fileName = '批量导入人员表格模板.xlsx'
				link.setAttribute('download', fileName)
				document.body.appendChild(link)
				link.click()
				window.URL.revokeObjectURL(downloadUrl)
				document.body.removeChild(link)
			} catch (error) {
				console.error('下载失败:', error)
				this.$message.error('模板下载失败，请稍后重试')
			}
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
				deleteItem(item.id).then(res => {
					this.queryList();
				})
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

		// 添加文件上传
		async addFile(file) {
			// 验证逻辑
			const allowedExtensions = ['.xls', '.xlsx']
			const maxSize = 20 * 1024 * 1024

			const extension = file.name.slice(
				((file.name.lastIndexOf('.') - 1) >>> 0) + 2
			).toLowerCase()

			if (!allowedExtensions.includes('.' + extension)) {
				this.$message.error('不支持的文件格式')
				return
			}

			if (file.size > maxSize) {
				this.$message.error('文件大小超过20MB限制')
				return
			}
			this.currentFile = file
			this.uploadStatus = ''
			this.uploadProgress = 0
			this.uploadStatusText = '上传中'
			
		},

		triggerFileInput() {
			this.$refs.fileInput.click()
		},
		handleFileSelect(event) {
			const files = event.target.files
			if (files.length > 0) {
				this.addFile(files[0])
			}
  			event.target.value = null
		},
		handleDrop(event) {
			const files = event.dataTransfer.files
			if (files.length > 0) {
				this.addFile(files[0])
			}
		},
		removeFile(index) {
			this.fileList.splice(index, 1)
		},
		formatFileSize(bytes) {
			if (bytes === 0) return '0 B'
			const k = 1024
			const sizes = ['B', 'KB', 'MB', 'GB']
			const i = Math.floor(Math.log(bytes) / Math.log(k))
			return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
		},
		// 提交上传
		async submitUpload() {
			this.uploading = true
			if (!this.currentFile) return
			const formData = new FormData()
			formData.append('file', this.currentFile)
			try {
				const response = await this.$axios.post('/files/importUsers', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: progressEvent => {
						this.uploadProgress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						)
					}
				})
				if (response.code == "200") {
					this.uploadStatus = 'success'
					this.uploadStatusText = `上传成功`
					this.$message({
						message: '文件上传成功：' + response.msg,
						type: 'success',
						duration: 6000
					});
					setTimeout(() => {
						this.resetUploadState()
						this.inputdialogVisible = false
						this.queryList()
					}, 2000)
				} else {
					throw new Error(response.msg || '上传失败')
				}
			} catch (error) {
				this.uploadStatus = 'exception'
				this.uploadStatusText = '上传失败'
				this.$message({
					message: '文件上传失败：' + error.message,
					type: 'error',
					duration: 6000
				});
			} finally {
				setTimeout(() => {
					if (this.uploadStatus !== 'success') {
						this.resetUploadState()
					}
				}, 2000)
			}
		},
		// 重置上传状态
		resetUploadState() {
			this.uploading = false
			this.uploadProgress = 0
			this.currentFile = null
			this.uploadStatus = ''
		}
	},
}
</script>

<style scoped>
.upload-dialog {
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.upload-area {
  padding: 40px;
  border: 2px dashed #e14338;
  margin: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: #ff6b64;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-text {
  margin: 5px 0;
  color: #333;
  font-size: 14px;
}

.browse-text {
  color: #e14338;
  cursor: pointer;
}
.upload-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.progress-circle {
  margin-bottom: 20px;
}

.progress-text {
  font-size: 16px;
  color: #666;
}

.status-text {
  font-size: 14px;
  color: #888;
  max-width: 80%;
  text-align: center;
  word-break: break-all;
}

/* 上传区域交互优化 */
.upload-area {
  transition: all 0.3s ease;
}

.upload-area:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.file-title {
  padding: 10px 0 ;
}

.selected-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}

.file-info {
  display: flex;
  align-items: center;
}

.file-name {
  color: #333;
  margin-right: 10px;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  color: #666;
  font-size: 0.9em;
}

.divider{
	display:inline-block;
	color: #888;
	padding:0 7px ;
	font-size: 0.8em;
}
</style> 