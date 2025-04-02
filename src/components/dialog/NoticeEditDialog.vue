<template>
    <el-dialog
      v-model="dialogVisible"
      title="添加通知信息"
      width="850"
      align-center
      :close-on-click-modal="false"
    >
      <div class="notice-content">
        <!-- 通知标题 -->
        <div class="form-item">
          <span class="required">*</span>
          <span class="label">通知标题</span>
          <el-input 
            v-model="form.title" 
            placeholder="请输入通知标题"
            style="width: 400px;"
          />
          <span class="required" style="margin-left: 30px;">*</span>
          <span class="label">文件是否上传</span>
          <el-radio-group v-model="form.needUpload">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
  
        <!-- 富文本编辑器 -->
        <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="html"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
        </div>

        <!-- 文件上传 -->
        <div class="upload-section">
          <span class="upload-label">通知附加文件</span>
          <el-upload
            class="upload-demo"
            action="/api/upload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :before-upload="beforeUpload"
            :file-list="fileList"
          >
            <el-button type="primary" class="upload-btn">选取文件</el-button>
            <template #tip>
              <div class="upload-tip">
                仅能上传zip、doc、docx、xlsx、ppt文件且不超过100MB
              </div>
            </template>
          </el-upload>
        </div>
      </div>
  
      <!-- 底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="submit-btn" @click="handleSubmit">提交</el-button>
          <el-button class="cancel-btn" @click="handleCancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import '@wangeditor/editor/dist/css/style.css'

  export default {
    name: 'PublishNoticeDialog',
    components: { Editor, Toolbar },
    data() {
      return {
        dialogVisible: false,
        form: {
          title: '',
          needUpload: false,
          content: ''
        },
        fileList: [],
        editor: null,
        html: '',
        toolbarConfig: {},
        editorConfig: { placeholder: '请输入内容...' },
        mode: 'default', 
      }
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor)
      },
      handleUploadSuccess(response, file, fileList) {
        this.$message.success('文件上传成功');
        this.fileList = fileList;
      },
      handleUploadError() {
        this.$message.error('文件上传失败');
      },
      beforeUpload(file) {
        const isValidType = ['zip', 'doc', 'docx', 'xlsx', 'ppt'].includes(
          file.name.split('.').pop().toLowerCase()
        );
        const isLt100M = file.size / 1024 / 1024 < 100;
  
        if (!isValidType) {
          this.$message.error('请上传正确的文件格式');
          return false;
        }
        if (!isLt100M) {
          this.$message.error('文件大小不能超过 100MB');
          return false;
        }
        return true;
      },
      handleSubmit() {
        if (!this.form.title.trim()) {
          this.$message.warning('请输入通知标题');
          return;
        }
        this.$emit('submit', {
          ...this.form,
          files: this.fileList
        });
      },
      handleCancel() {
        this.dialogVisible = false;
        this.$emit('changeDialog');
      }
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
    },
  }
  </script>
  
  <style scoped>
  .notice-content {
    padding: 20px;
  }
  
  .form-item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .required {
    color: #C83C23;
    margin-right: 5px;
  }
  
  .label {
    margin-right: 10px;
    color: #333;
  }
  
  .editor-wrapper {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  
  .editor-label {
    background-color: #f5f7fa;
    padding: 8px 15px;
    border-bottom: 1px solid #dcdfe6;
    color: #333;
  }
  
  .editor-toolbar {
    padding: 8px 15px;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .el-button-group {
    margin-right: 10px;
  }
  
  .el-button-group .el-button {
    padding: 5px 10px;
  }
  
  .upload-section {
    display: flex;
    margin-top: 20px;
  }
  
  .upload-label {
    display: block;
    margin-bottom: 10px;
  }
  
  .upload-btn {
    background-color: #C83C23;
    border-color: #C83C23;
    color: white;
    margin-left: 20px;
  }
  
  .upload-tip {
    color: #909399;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 20px;
  }
  
  .dialog-footer {
    text-align: center;
    padding-top: 20px;
  }
  
  .submit-btn {
    background-color: #C83C23;
    border-color: #C83C23;
    color: white;
  }
  
  .cancel-btn {
    margin-left: 10px;
  }
  
  :deep(.el-textarea__inner) {
    min-height: 200px !important;
  }
  
  :deep(.el-upload-list) {
    margin-top: 10px;
  }
  </style>