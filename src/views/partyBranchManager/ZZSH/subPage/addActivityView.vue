<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #f7f7f7; height:100%; position: relative;display:flex;padding:0;">
        <v-row style="height:50px;background-color:#edeced;margin-top:-30px;">
           <v-col cols="4" class="d-flex align-center" >
               <el-button style="margin-left:30px;margin-top:-4px;" @click="$emit('backMainPage')">返回</el-button>
           </v-col>
           <v-col cols="8" class="d-flex align-center">
               <h2 style="margin-left:100px;margin-top:-4px;">添加会议</h2>
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:200px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>活动名称</span>
             <input placeholder=" 请输入活动名称" style=" margin-left:40px;background-color: white;font-size: 12px;height: 30px;width: 400px;border: 1px solid #dde0e5;border-radius: 4px;">
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:200px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>活动分类</span>
             <div v-for="(item, index) in checkboxes" :key="index" style="margin-left:40px;">
              <input type="checkbox" :id="'checkbox' + index" v-model="item.isChecked">
             <label :for="'checkbox' + index" style="margin-left:10px;">{{ item.label }}</label>
             </div>
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:200px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>主办单位</span>
             <input placeholder=" 请输入主办单位" style=" margin-left:40px;background-color: white;font-size: 12px;height: 30px;width: 400px;border: 1px solid #dde0e5;border-radius: 4px;">
             <el-button class="redBtn">选择组织</el-button>
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:230px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>地点</span>
             <input placeholder=" 请输入地点" style=" margin-left:40px;background-color: white;font-size: 12px;height: 30px;width: 400px;border: 1px solid #dde0e5;border-radius: 4px;">
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:200px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>开始时间</span>
             <el-date-picker type="date" placeholder="2024-03-01" size="large" style="margin-left:40px;height: 30px;width: 150px;" />
             <el-time-picker type="time" placeholder="15:49" size="large" style="height: 30px;width: 150px;" />
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:200px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>结束时间</span>
             <el-date-picker type="date" placeholder="2024-03-01" size="large" style="margin-left:40px;height: 30px;width: 150px;" />
             <el-time-picker type="time" placeholder="15:49" size="large" style="height: 30px;width: 150px;" />
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:200px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>申请学时</span>
             <input style=" margin-left:40px;background-color: white;font-size: 12px;height: 30px;width: 400px;border: 1px solid #dde0e5;border-radius: 4px;">
          </v-col>
        </v-row>
        <v-row style="height:20px; width: 100%;margin-left:230px;margin-top:-40px;">
          <v-col class="fill-height d-flex" cols="20">
             <span>费用</span>
             <input style=" margin-left:40px;background-color: white;font-size: 12px;height: 30px;width: 400px;border: 1px solid #dde0e5;border-radius: 4px;">
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  data() {
    return {
      checkboxes: [
        { label: '党员大会', isChecked: false },
        { label: '支部委员会', isChecked: false },
        { label: '党小组', isChecked: false },
        { label: '党课', isChecked: false }
      ]
    };
  }
};
</script>
