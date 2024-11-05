<template>
    <div class="popup_download">
      <div class="popup-header">
        <span class="text-h5">下载模板</span>
        <div>
             <button @click="closePopup_download"><span class="text-h5">X</span></button>
        </div>
      </div>
      
      <div class="popup-content">
        <!-- 虚线框 -->
        <div class="grey-box">
          <!-- Logo -->
          <div class="logo-container" style="margin-top: 45px;" >
            <img src="../img/showcase/file.png" alt="Logo" />
          </div>
          <!-- 文字描述 -->
          <p class="text-h5">文件预览</p>
        </div>
        <!-- 按钮 -->
        <div class="buttons">
          <v-btn @click="handleButton1"  color="party-1" style="height: 50px;width:85px;font-size: 20px">下载</v-btn>

          <v-btn @click="handleButton2" style="height: 50px;width:85px;font-size: 20px">取消</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closePopup_download() {
        this.$emit('closePopup_download');
      },
      handleButton1() {
        this.$message({
                        message: "下载成功",
                        type: 'info',
                        duration: 3000
                    })
        // 处理按钮1的逻辑
        this.$emit('closePopup_download');
      },
      handleButton2() {
        // 处理按钮2的逻辑
        this.$emit('closePopup_download');
      }
    }
  };
  </script>
  
  <style scoped>
  .popup_download {
    position: fixed;
    top: 50%;
    left: 54%;
    width: 900px;
    height:550px;
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
    align-items: center; /* 居中对齐 */
  }

  .red-text{
    color: red;
  }
  .grey-box {
    padding: 20px;
    text-align: center;
    width: 90%;
    background-color: #D9D9D9;
    height: 300px;

  }
  
  .logo-container {
    margin-bottom: 10px;
  }
  
  .logo-container img {
    width: 150px; /* 根据实际需要调整 */
    height: 150px; /* 根据实际需要调整 */
    display: block;
    margin: 0 auto;
  }
  
  .buttons {
    text-align: center;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .buttons button {
  margin-right: 10%; /* 设置按钮之间的右侧间隔为10像素，根据需要调整 */
  margin-left: 10%; 
  margin-top: 10%;
  }
  </style>
  