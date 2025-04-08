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
          <el-select v-model="form.developmentPhase" placeholder="请选择发展阶段">
            <el-option
              v-for="item in stageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span class="required" style="margin-left: 30px;">*</span>
          <span class="label">活动时间</span>
          <el-date-picker
            v-model="form.activityDate"
            type="datetime"
            placeholder="请选择活动时间"
          />
        </div>
  
        <!-- 第三行 -->
        <div class="form-item">
          <span class="required">*</span>
          <span class="label">主办单位</span>
          <el-input v-model="form.activitySponsor" placeholder="请输入主办单位" />
          <span class="required" style="margin-left: 30px;">*</span>
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
  
        <!-- 第四行 -->
        <div class="form-item">
          <span class="required">*</span>
          <span class="label">提交文件</span>
          <el-input v-model="form.fileCount" disabled placeholder="0/20" style="width: 120px;" />
          <span class="required" style="margin-left: 30px;">*</span>
          <span class="label">参与人员</span>
          <el-select v-model="form.participants" placeholder="请选择参与人员" />
        </div>

        <!-- 第四行 -->
        <div class="form-item">
          <div style="width: 50%;">
            <span class="label" style="margin-left: 11px;">通知内容</span>
            <el-button class="fileButton" @click="addNotice" >添加通知</el-button>
          </div>
          <div style="width: 50%;display: flex;">
            <span class="label" style="margin-left: 11px;">已提交人员</span>
            <el-select v-model="form.submitpeople" placeholder="请选择已提交人员" />
          </div>
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
            activityName: '',
            activityNumber: '',
            developmentPhase: '',
            activityDate: '',
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
          { value: 'type1', label: '推优活动' },
          { value: 'type2', label: '其他活动' }
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
      handleClose() {
        this.dialogVisible = false;
        this.$emit('cancalList');
      },
      handleSubmit() {
        // TODO: 实现提交逻辑
        const submitData = {
          activityName: this.form.activityName,
          // activityNumber: this.form.activityNumber,
          developmentPhase: this.form.developmentPhase,
          activityDate: this.form.activityDate,
          activitySponsor: this.form.activitySponsor,
          activityType: this.form.activityType,
          remark: this.form.remark
        }
        console.log(submitData);
        this.$axios.post('/activities/',submitData).then(res=>{
          console.log(res);

        })
        this.dialogVisible = false;
        this.$emit('refreshList');
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