<template>
  <el-dialog
      v-model="dialogVisible"
      title="导入学生名单"
      :before-close="handleClose"
      width="700px"
      :close-on-click-modal="false"
  >
    <el-steps :active="activeStep" direction="vertical" finish-status="success" space="100px">
      <el-step title="按照模板格式填写需要导入的学生名单">
        <template #description>
          <el-button type="primary" @click="downloadTemplate" icon="Download" class="download-button">
            <el-text class="text">下载Word模板</el-text>
          </el-button>
        </template>
      </el-step>
      <el-step title="填写活动信息">
        <template #description>
          <el-form :model="form" label-width="80px" class="info-form">
            <el-form-item label="活动名称">
              <el-input v-model="form.activityName" placeholder="请输入活动名称" style="width: 250px"/>
            </el-form-item>
            <el-form-item label="学时数量">
              <el-input-number v-model="form.appliedStudyHour" :min="0" :step="1" placeholder="请输入学时数量"
                               style="width: 250px"/>
            </el-form-item>
          </el-form>
        </template>
      </el-step>
      <el-step title="选择Word文件上传">
        <template #description>
          <el-upload
              class="upload-demo"
              :before-upload="beforeUpload"
              :on-change="handleFileChange"
              :show-file-list="false"
              accept=".docx"
          >
            <el-button type="primary" icon="Upload" style="background: #3981FF;color: #FFFFFF;">
              <el-text style="font-weight: normal;color: #FFFFFF;">上传Word文件</el-text>
            </el-button>
            <span v-if="form.fileName" class="file-name">{{ form.fileName }}</span>
          </el-upload>
        </template>
      </el-step>
    </el-steps>
    <el-text class="warning-text">
      1、为保证数据顺利导入，推荐使用标准格式规范上传word文件<br>
    </el-text>
    <span slot="footer" class="dialog-footer">
      <el-button class="button" type="primary" :loading="loading" @click="submitForm">
        导入
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import {ElLoading, ElMessage} from "element-plus";

export default {
  name: "ImportStudentListDialog",
  data() {
    return {
      dialogVisible: false,
      form: {
        activityName: '',
        appliedStudyHour: 1,
        file: null,
        fileName: ""
      },
      loading: false,
      activeStep: 0
    };
  },
  methods: {
    // 直接打开对话框，无需传入classId
    openDialog() {
      this.dialogVisible = true;
      this.resetForm();
      this.activeStep = 0;
    },
    handleClose() {
      this.dialogVisible = false;
      this.resetForm();
      this.activeStep = 0;
    },
    resetForm() {
      this.form.activityName = '';
      this.form.appliedStudyHour = 1;
      this.form.file = null;
      this.form.fileName = '';
    },
    // 下载模板接口
    async downloadTemplate() {
      this.activeStep = 1;
      try {
        const response = await this.$axios({
          method: 'get',
          url: '/files/downloadByDocTemplateType',
          responseType: 'blob',
          params: {  // 添加type参数
            type: '三会一课批量导入人员word模板'
          }
        });
        const blob = new Blob([response]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        const fileName = '三会一课批量导入人员word模板.docx';
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
      } catch (error) {
        console.error('下载失败:', error);
        this.$message.error('模板下载失败，请稍后重试');
      }
    },
    beforeUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        ElMessage.error("文件大小必须小于 20MB!");
        return false;
      }
      return true;
    },
    handleFileChange(file) {
      if (file.raw) {
        this.form.file = file.raw;
        this.form.fileName = file.name;
        this.activeStep = 2;
      }
    },
    // 上传接口，不再依赖classId
    submitForm() {
      if (!this.form.activityName) {
        ElMessage.error("请填写活动名称");
        return;
      }
      if (this.form.appliedStudyHour === null) {
        ElMessage.error("请填写学时数量");
        return;
      }
      if (!this.form.file) {
        ElMessage.error("请上传学生名单文件");
        return;
      }
      const formData = new FormData();
      formData.append("file", this.form.file);
      this.loading = true;
      const loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.$axios.post('/files/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          // 如需显示上传进度，可在此处进行更新
        }
      })
          .then((res) => {
            if (res.code === "200") {
              this.$axios.get(`/selfstudy/importThreeMeetingsOneLessonActivityByFile?fileId=${res.data.id}&activityName=${this.form.activityName}&appliedStudyHour=${this.form.appliedStudyHour}`).then((res) => {
                ElMessage.success("导入成功");
                this.dialogVisible = false;
                this.resetForm();
                this.$emit("refresh");
              }).finally(() => {
                this.loading = false;
                loadingInstance.close();
              })
            } else {
              ElMessage.error(res.msg || "导入失败");
            }
          })
          .catch((error) => {
            console.error("导入学生名单错误：", error);
            ElMessage.error("网络错误，请稍后再试");

            this.loading = false;
            loadingInstance.close();
          });
    }
  }
};
</script>

<style scoped>
.download-button {
  background: transparent;
  border: 1px solid #3981FF;
  border-radius: 6px;
  color: #3981FF;
  margin-top: 10px;
}

.download-button .text {
  font-weight: 400;
  font-size: 14px;
  color: #3981FF;
  text-align: right;
}

.warning-text {
  font-weight: 400;
  font-size: 14px;
  color: #FF3131;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  width: 90px;
  height: 32px;
  background: #3981ff;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin-right: 10px;
}

.info-form {
  margin-top: 10px;
}

.el-dialog .el-dialog__footer {
  text-align: center;
}

.el-button[type="primary"] {
  background-color: #3981ff;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}

.el-upload .el-button {
  margin-top: 10px;
}

.el-input,
.el-input-number {
  width: 100%;
}

.file-name {
  margin-left: 10px;
  font-size: 14px;
  color: #606266;
}
</style>