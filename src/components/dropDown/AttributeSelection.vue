<template>
    <div>
      <el-dropdown :show="false" trigger="click" style="margin-top: 10px;">
        <el-button type="primary" class="custom-button">
          属性筛选
          <ArrowDown style="width: 20px;height: 20px;margin-right: -10px;margin-left: 10px;" />
        </el-button>
        <template #dropdown>
            <div>
                <el-checkbox v-model="checkAll" style="margin-left: 10px;">全选</el-checkbox>
            </div>
            <hr>
          <el-checkbox-group v-model="selectedOptions" style="padding-left: 10px;">
            <div v-for="index,item in optionList" :key="item" style="display: block;margin-right: 10px;">
              <el-checkbox :label="item">{{ index }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </template>
      </el-dropdown>
    </div>
  </template>
  
  <script>
  import { ElDropdown, ElButton, ElCheckbox, ElCheckboxGroup } from 'element-plus';
  import { ArrowDown } from '@element-plus/icons-vue';
  
  export default {
    components: {
      ElDropdown,
      ElButton,
      ElCheckbox,
      ElCheckboxGroup,
      ArrowDown
    },
    props:{
        optionList: {
            type: Array,
            required: true,
        },
    },
    data() {
      return {
        checkAll: false,
        selectedOptions: [],
      };
    },
    watch: {
        selectedOptions(newOption) {
            this.$emit('optionChange', newOption);
        },
        checkAll(newOption){
            if(newOption==true){
                let checkList = []
                let i=0
                for (i;i<this.optionList.length;i++){
                    checkList.push(i)
                }
                this.selectedOptions = checkList
            }else{
                this.selectedOptions = []
            }
        }
    },
    methods: {
      handleCommand() {
        console.log('选中的选项：', this.selectedOptions);
        // 这里可以处理选中选项的逻辑
      },
      click(){
        
      }
    },
    mounted(){
        this.checkAll=true
        console.log(this.optionList)
    }
  };
  </script>
  
  <style>
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: #F32823 !important;
      background-color: #F32823 !important;
  }
  
  .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #000000 !important;
  }
  
  .el-checkbox__inner:hover {
      border-color: #F32823 !important;
  }
  
  .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #F32823 !important;
  }
  
  .el-dropdown {
      vertical-align: top;
  }
  
  .el-dropdown+.el-dropdown {
      margin-left: 15px;
  }
  
  .el-icon-arrow-down {
      font-size: 12px;
  }
  
  /* 自定义按钮样式 */
  .custom-button {
    background-color: #ffffff;
    border-color: #A5A5A5;
    color: #A5A5A5;
  }
  .custom-button:focus,
  .custom-button:active {
    background-color: #ffffff;
    border-color: #A5A5A5;
    color: #A5A5A5;
  }
  </style>
  