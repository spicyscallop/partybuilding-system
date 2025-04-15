<template>
    <el-dialog
      v-model="dialogVisible"
      title="添加活动信息"
      width="850"
      align-center
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <div class="form-content">
        <!-- 第一行 -->
        <div class="form-item">
          <span class="required">*</span>
          <span class="label">活动名称</span>
          <el-input v-model="form.activityName" placeholder="请输入活动名称" />
          <span class="required" style="margin-left: 30px;">*</span>
          <span class="label">活动编号</span>
          <el-input v-model="form.activityNumber" placeholder="提交后自动生成" disabled />
        </div>
  
        <!-- 第二行 -->
        <div class="form-item">
          <span class="required">*</span>
          <span class="label">发展阶段</span>
          <el-select v-model="form.developmentPhasesArray" multiple placeholder="请选择发展阶段">
            <el-option
              v-for="item in stageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span class="required" style="margin-left: 30px;">*</span>
          <span class="label">主办单位</span>
          <el-input v-model="form.activitySponsor" placeholder="请输入主办单位" />
        </div>
  
        <!-- 第三行 -->
        <div class="form-item">
          <span class="required" style="margin-left:-28px;">*</span>
          <span class="label">活动开始时间</span>
          <el-date-picker
            v-model="form.activityStartDate"
            type="date"
            placeholder="请选择活动开始时间"
          />
          <span class="required" >*</span>
          <span class="label">活动结束时间</span>
          <el-date-picker
            v-model="form.activityEndDate"
            type="date"
            placeholder="请选择活动结束时间"
          />
        </div>
  
        <!-- 第四行 -->
        <div class="form-item">
          <span class="required"> </span>
          <span class="label">提交文件</span>
          <el-input v-model="form.fileCount" disabled placeholder="0/20" style="width: 120px;" />
          <span class="required" style="margin-left: 30px;"> </span>
          <span class="label">参与人员</span>
          <el-select v-model="form.participants" placeholder="请选择参与人员" />
        </div>

        <!-- 第四行 -->
        <div class="form-item">
          <div style="width: 50%;">
            <span class="label" style="margin-left: 11px;">通知内容</span>
            <el-button class="fileButton" @click="addNotice" >添加通知</el-button>
          </div>
          <span class="required" style="margin-left: 11px;">*</span>
          <span class="label">活动类型</span>
          <el-select v-model="form.activityType" placeholder="请选择">
            <el-option
              v-for="item in activityTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
  
        <!-- 备注 -->
        <div class="form-item-vertical">
          <span class="label" style="width: 10%;text-align: right;">备注</span>
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="6"
            placeholder="请输入备注信息"
          />
        </div>
  
        <!-- 附加文件 -->
        <div class="form-item-vertical">
          <span class="label" style="width: 9%;text-align: right;">附加文件</span>
          <div class="file-upload">
            <el-button class="upload-btn">选取文件</el-button>
            <div class="file-tip">
              仅能上传zip、doc、docx、xlsx、pptx文件
              <br />
              单个文件不超过100MB
            </div>
          </div>
        </div>
      </div>
  
      <!-- 底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button class="submit-btn" type="primary" @click="handleSubmit">提交</el-button>
          <el-button class="cancel-btn" @click="handleClose">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'AddActivitiyDialog',
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      myEdit: {
        type: Boolean,
        default: false
      },
      developmentPhase: {
        type: String,
        default: ''
      },
      formData: {
        type: Object,
        default: {
          title: 'dsdas',
        }
      }
    },
    emits: ['update:modelValue', 'refreshList', 'cancalList'],
    data() {
      return {
        dialogVisible: false,
        isEdit: false,
        form: {
            activityStartDate: '',
            activityEndDate:'',
            activityNumber: '',
            developmentPhasesArray:[],
            activityName: '',
            activitySponsor: '',
            activityType: '',
            fileCount: '0/20',
            participants: '',
            remark: ''
        },
        
        stageOptions: [
          { value: '入党申请人', label: '入党申请人' },
          { value: '积极分子', label: '积极分子' },
          { value: '发展对象', label: '发展对象' },
          { value: '预备党员', label: '预备党员' },
          { value: '正式党员', label: '正式党员' }
        ],
        activityTypeOptions: [
          { value: '推优活动', label: '推优活动' },
          { value: '其他活动', label: '其他活动' }
        ]
      }
    },
    watch: {
      modelValue(val) {
        this.dialogVisible = val;
      },
      myEdit(val) {
        this.isEdit = val;
      },
      dialogVisible(val) {
        if(val == true){
          if(this.isEdit){
            this.form = this.formData 
          }else{
            this.form = {}
          }
          
        }
        this.$emit('update:modelValue', val);
      }
    },
    methods: {
      generateActivityNumber(){
        // 获取当前日期
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
        const day = String(now.getDate()).padStart(2, '0');

        // 拼接年月日（前8位）
        const datePart = `${year}${month}${day}`; // 例如 20250415

        // 获取时间戳的后两位
        const timestamp = now.getTime();
        const timePart = String(timestamp).slice(-2); // 取时间戳最后两位

        // 拼接活动编号
        const activityId = datePart + timePart;
        return activityId;
      },
      handleClose() {
        this.dialogVisible = false;
        this.$emit('cancalList');
      },
      handleSubmit() {
        const submitData = {
          activityName: this.form.activityName,
          activityNumber: this.form.activityNumber,
          developmentPhases: JSON.stringify(this.form.developmentPhasesArray),
          activityStartDate: this.form.activityStartDate,
          activityEndDate: this.form.activityEndDate,
          activitySponsor: this.form.activitySponsor,
          activityType: this.form.activityType,
          remark: this.form.remark,
          state:'未审核'
        }
        if(this.isEdit){
          if(this.form.developmentPhasesArray.length == 0){
            this.$message.error("更新失败：发展阶段不能为空！")
            this.dialogVisible = false;
            this.$emit('refreshList');
            return
          }
          submitData.id = this.formData.id
          this.$axios.post('/activities/update',submitData).then(res=>{
            console.log(res);
            if(res.code == "200"){
              this.$message.success("更新成功！")
              this.$emit('refreshList');
            }else{
              this.$message.error(`更新失败：${res.msg}`)
            }
          }).catch(error => {
            this.$message.error(`请求失败：${error}`);
          });
        }else{
          if(this.form.developmentPhasesArray.length == 0){
            this.$message.error("添加失败：发展阶段不能为空！")
            this.dialogVisible = false;
            this.$emit('refreshList');
            return
          }
          submitData.activityNumber = this.generateActivityNumber()
          this.$axios.post('/activities/add',submitData).then(res=>{
            console.log(res);
            if(res.code == "200"){
              this.$message.success("添加成功！")
              this.$emit('refreshList');
            }else{
              this.$message.error(`添加失败：${res.msg}`)
            }
          }).catch(error => {
            this.$message.error(`请求失败：${error}`);
          });
        }
        this.dialogVisible = false;
      },
      addNotice(){
        this.$emit('changeDialog');
      }
    },
  }
  </script>
  
  <style scoped>
.form-content {
  padding: 20px 30px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item-vertical {
  display: flex;
  margin-bottom: 20px;
}

.required {
  color: red;
  margin-right: 5px;
}

.label {
  margin-right: 10px;
  white-space: nowrap;
  color: #333;
}

.form-item :deep(.el-input),
.form-item :deep(.el-select),
.form-item :deep(.el-date-picker) {
  flex: 1;
  max-width: 300px;
}

.form-item-vertical :deep(.el-textarea) {
  width: 100%;
}

.upload-btn {
  background-color: #C83C23;
  color: white;
  border: none;
}

.file-tip {
  margin-top: 10px;
  color: #999;
  font-size: 12px;
}

.dialog-footer {
  text-align: center;
}

.submit-btn {
  background-color: #C83C23;
  color: white;
  border: none;
  padding: 8px 20px;
}

.cancel-btn {
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 8px 20px;
}

:deep(.el-dialog__header) {
  padding: 15px 20px;
  margin: 0;
  border-bottom: 1px solid #eee;
}

:deep(.el-dialog__title) {
  font-size: 16px;
  color: #333;
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog__footer) {
  border-top: 1px solid #eee;
  padding: 15px 20px;
}

:deep(.el-input__inner) {
  height: 32px;
  line-height: 32px;
}

:deep(.el-select) {
  width: 100%;
}

.fileButton{
  background-color: #37A0FF;
  color: #ffffff;
}
</style>