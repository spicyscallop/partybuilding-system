<template>
    <div class="popup">
      <div class="popup-header">
        <span>上传文件</span>
        <div>
             <button @click="closePopup">X</button>
        </div>
      </div>
      
      <div class="popup-content">
        <!-- 虚线框 -->
        <div class="dashed-box">
          <!-- Logo -->
          <div class="logo-container">
            <img src="../img/showcase/cloud.png" alt="Logo" />
          </div>
          <!-- 文字描述 -->
          <p>拖拽或选择你的文件到这里来上传，</p>
          <p>或者<span class="red-text">浏览</span>你的本地文件夹</p>
        </div>
        <!-- 按钮 -->
        <div class="buttons">
          <v-btn @click="handleButton1"  color="party-1">提交</v-btn>

          <v-btn @click="handleButton2">取消</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closePopup() {
        this.$emit('closePopup');
      },
      handleButton1() {
        // 处理按钮1的逻辑
      },
      handleButton2() {
        // 处理按钮2的逻辑
      }
    }
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40%;
    height: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  .dashed-box {
    border: 2px dashed #C83C23;
    padding: 20px;
    text-align: center;
    width: 90%;

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
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .buttons button {
  margin-right: 20%; /* 设置按钮之间的右侧间隔为10像素，根据需要调整 */
  }
  </style>
  