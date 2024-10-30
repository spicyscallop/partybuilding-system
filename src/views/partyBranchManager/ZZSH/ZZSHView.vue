<template>
  <v-container fluid class="ma-0 fill-height bg-grey-lighten-5">
    <v-col class="d-flex fill-height flex-column">
      <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
        <v-col>
          <SubpageTitle text="组织生活" svg="/src/img/风采记录/record.png" width="43" height=43></SubpageTitle>
        </v-col>
      </v-row>
      <v-row v-if="!goTo.visibleActivityView" style="display: flex;">
          <v-col cols="1">
             <el-button class="redBtn" type="primary" @click="goToAddActivityView">添加活动</el-button>
          </v-col>
          <v-col cols="1">
             <el-button class="whiteBtn" type="primary">导入活动</el-button>
          </v-col>
          <v-col cols="3">
            <div><input placeholder="请输入会议标题关键词" style="margin-left: 100px; width: 300px;"></div>
          </v-col>
          <v-col cols="2">
          <div>
          <el-date-picker v-model="selectedYear" type="year" placeholder="选择年份" style="margin-left: 10px;" format="yyyy" value-format="yyyy" @change="handleYearChange">
          </el-date-picker>
          </div>
        </v-col>
        <v-col cols="1">
           <el-button class="redBtn" type="primary" style="margin-left: 50px;">搜索</el-button>
        </v-col>
      </v-row>
      <v-row v-if="!goTo.visibleActivityView" style="display: flex;">
        <el-table :data="tableData" :columns="tableColumns">
           <el-table-column label="活动编号" prop="activityID" width="140"></el-table-column>
           <el-table-column label="活动名称" prop="activityName" width="140"></el-table-column>
           <el-table-column label="活动级别" prop="level" width="140"></el-table-column>
           <el-table-column label="活动时间" prop="activityTime" width="140"></el-table-column>
           <el-table-column label="主办单位" prop="holder" width="140"></el-table-column>
           <el-table-column label="申请学时" prop="studyTime" width="140"></el-table-column>
           <el-table-column label="审核时间" prop="checkTime" width="140"></el-table-column>
           <el-table-column label="操作" prop="operation" width="140"></el-table-column>
        </el-table>
      </v-row>
      <v-row v-if="goTo.visibleActivityView" class="fill-height">
        <v-col>
          <addActivityView v-if="goTo.subPage==0" @backMainPage="backMainPage" :pageType="goTo.pageType" :formData="goTo.data"></addActivityView>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import SubpageTitle from '@/components/SubpageTitle.vue';
import addActivityView from '@/views/partyBranchManager/ZZSH/subPage/addActivityView.vue';
import importActivityView from '@/views/partyBranchManager/ZZSH/subPage/importActivityView.vue';

const goTo = ref({
    visibleActivityView: false,
    subPage : 0,
    pageType: 'Add',
    data: null
});

const tableData = ref([
    {
        activityID: '2313414',
        activityName: '第一党支部党员大会暨代表选举专题会议',
        level: '院级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    {
        activityID: '2313415',
        activityName: '教工支部师德师风建设主题党日',
        level: '校级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    {
        activityID: '2313416',
        activityName: '第一党支部党员大会暨代表选举专题会议',
        level: '院级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    {
        activityID: '2313417',
        activityName: '第一党支部党员大会暨代表选举专题会议',
        level: '院级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    {
        activityID: '2313418',
        activityName: '教工支部师德师风建设主题党日',
        level: '校级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    {
        activityID: '2313419',
        activityName: '第一党支部党员大会暨代表选举专题会议',
        level: '院级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    {
        activityID: '2313420',
        activityName: '第一党支部党员大会暨代表选举专题会议',
        level: '院级',
        activityTime: '2023-12-17 14:00',
        holder: 'xx党支部',
        studyTime: '10',
        checkTime: '2023-12-17 14:00',
        operation:'',
    },
    // 更多数据...
]);

const goToAddActivityView = () => {
    goTo.value.pageType = "Add"
    goTo.value.data = {
        name: '',
        activityType: '',
        holderName: '',
        holdPlace: '',
        startTime: '',
        endTime:'',
        hours:'',
        fee:'',
    }
    goTo.value.subPage = 0
    goTo.value.visibleActivityView = true;
};

const backMainPage = () => {
    console.log("change");
    goTo.value.visibleActivityView = false;
};

</script>

<style>
.image-container-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 30px; 
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center; 
}

.image{
  width: 336px; 
  height: 260px;
  border-radius: 10px;
}

.spacer{
  width:10px;
}

.image-container + .image-container {
  margin-left: 20px; 
}

</style>
<style src="@/style/button.css"></style>