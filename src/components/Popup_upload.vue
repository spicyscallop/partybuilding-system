<template>
  <div class="popup_upload">
    <div class="popup-header">
      <span class="text-h5">上传文件</span>
      <div>
        <button @click="closePopup_upload"><span class="text-h5">X</span></button>
      </div>
    </div>

    <div class="popup-content">
      <!-- 虚线框 -->
      <div class="dashed-box drop-area" @dragover.prevent @drop="handleDrop" @click="openFileExplorer">
        <div v-if="isEmpty" class="logo-container">
          <!-- Logo -->
          <img src="../img/showcase/cloud.png" alt="Logo" />
          <!-- 文字描述 -->
          <p class="text-h6">拖拽或选择你的文件到这里来上传，</p>
          <p class="text-h6">或者<span class="red-text text-h6">浏览</span>你的本地文件夹</p>
        </div>
        <div v-if="!isEmpty" class="logo-container">
          <v-progress-circular :model-value="uploadProcess" :size="140" :width="10" color="#C83C23"
            style="margin-top: 30px;">
            <h4 style="font-size: 40px;color: black;">{{ uploadProcess }}%</h4>
          </v-progress-circular>
          <p class="text-h6" style="margin-top: 20px;">{{ notice }}</p>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="buttons">
        <v-btn @click="handleButton1" color="party-1" style="height: 50px;width:85px;font-size: 20px">提交</v-btn>

        <v-btn @click="handleButton2" style="height: 50px;width:85px;font-size: 20px">取消</v-btn>
      </div>
      <!-- 隐藏的文件输入框 -->
      <input type="file" ref="fileInput" style="display: none" @change="handleFileInput">

    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      notice: "文件上传中...",
      isEmpty: true,
      uploadProcess: 50,
      uploadFile: null,
    }
  },
  methods: {
    closePopup_upload() {
      this.$emit('closePopup_upload');
      this.uploadProcess = 0
      this.isEmpty = true
    },
    handleDrop(event) {
      event.preventDefault();
      let files = event.dataTransfer.files;
      if (files.length > 0) {
        if (files[0].size > 10 * 1024 * 1024) {
          alert("不允许上传大于10M的文件")
        } else {
          this.uploadFile = files[0]
          this.readAndUploadFile(this.uploadFile);
        }
      }
      console.log(files[0])
    },
    readAndUploadFile(file) {
      let reader = new FileReader();
      reader.onloadstart = () => {
        this.isEmpty = false
        this.uploadProcess = 0; // 开始加载时进度重置为0
      };
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          this.uploadProcess = Math.round((event.loaded / event.total) * 100); // 更新上传进度
        }
      };
      reader.onload = () => {
        // 文件加载完成
        console.log('文件加载完成:', file);
        this.notice = "加载完成！"
      };
      reader.readAsDataURL(file);
    },
    openFileExplorer() {
      // 触发隐藏文件输入框的点击事件
      this.$refs.fileInput.click();
    },
    handleFileInput(event) {
      const file = event.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("不允许上传大于10M的文件");
      } else {
        this.uploadFile = file;
        this.readAndUploadFile(this.uploadFile);
      }
    },
    handleButton1() {
      if (this.uploadFile!=null){
        // 处理按钮1的逻辑
        this.$message({
                          message: "上传成功",
                          type: 'info',
                          duration: 3000
                      })
        this.$emit('closePopup_upload');
      }else{
        // 处理按钮1的逻辑
        this.$message({
                  message: "未选择文件",
                  type: 'warning',
                  duration: 3000
              })
      }

    },
    handleButton2() {
      // 处理按钮2的逻辑
      this.$emit('closePopup_upload');
    }
  },
  mounted(){
    console.log("执行了2")
    this.uploadFile=null
  }
};
</script>
  
<style scoped>
.popup_upload {
  position: fixed;
  top: 50%;
  left: 54%;
  width: 900px;
  height: 550px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: top;
  height: 15%;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 居中对齐 */
}

.red-text {
  color: red;
}

.dashed-box {
  border: 2px dashed #C83C23;
  padding: 20px;
  text-align: center;
  width: 90%;
  height: 300px;

}

.logo-container {
  margin-bottom: 10px;
}

.logo-container img {
  width: 180px;
  /* 根据实际需要调整 */
  height: 180px;
  /* 根据实际需要调整 */
  display: block;
  margin: 0 auto;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.buttons button {
  margin-right: 10%;
  /* 设置按钮之间的右侧间隔为10像素，根据需要调整 */
  margin-left: 10%;
  margin-top: 10%;
}
</style>
  