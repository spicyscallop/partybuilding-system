<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-row class="d-flex justify-space-around mb-6" style="height: 10%;background-color: #ffffff;margin-top: 20px;">
            <v-col cols="4">
                <span style="color: red;margin-left: 30px;">*</span><span>学工号</span><input required
                    :class="{ disableInput: isEditPage, customInput: !isEditPage }" :disabled=isEditPage placeholder=""
                    v-model="props.formData.userNumber">
            </v-col>
            <v-col cols="4">
                <span style="color: red;margin-left: 30px;">*</span><span>姓名</span><input required
                    :class="{ disableInput: isEditPage, customInput: !isEditPage }" :disabled=isEditPage placeholder=""
                    v-model="props.formData.userName">
            </v-col>
            <v-col cols="4">
                <span style="color: red;">*</span><span style="margin-right: 10px;">团员身份</span>
                <el-select v-model="props.formData.isLeague" :placeholder="placeholder" size="large" style="width: 200px"
                    :disabled="isEditPage">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </v-col>
        </v-row>
        <v-row style="background-color: #f7f7f7; height: 60%;padding: 20px;border-radius: 20px;">
            <v-row style="width: 100%;margin-top: 20px;">
                <v-col>
                    <span style="margin-left: 0px;">《入党申请书》提交时间</span>
                    <el-date-picker v-model="props.formData.deliveryTime" type="date" placeholder="点击选择时间"
                                size="large" style="width: 450px;margin-left: 100px;" />
                    <el-button type="primary" class="checkFileBtn"
                                style="margin-left: 100px; height: 36px;width: 150px;color: #ffffff;">查看文件</el-button>
                </v-col>
            </v-row>
            <v-row style="width: 100%;margin-top: 30px;">
                <v-col>
                    <span style="margin-left: 0px;">《入党申请人谈话登记表》提交时间</span>
                    <el-date-picker v-model="props.formData.talkRegistrationFileId" type="date" placeholder="点击选择时间"
                                size="large" style="width: 620px;margin-left: 100px;" />
                </v-col>
            </v-row>
            <v-row style="width: 100%;margin-top: 30px;">
                <v-col cols="6">
                    <span style="margin-left: 0px;">谈话人</span>
                    <input class="customInput" placeholder="郭宗豪；" v-model="props.formData.talkApplicantPersonName" style="width: 400px;margin-left: 20px;">
                </v-col>
                <v-col cols="6">
                    <span style="margin-left: 0px;">是否满足推优条件</span>
                    <input class="disableInput" placeholder="郭宗豪" v-model="props.formData.talkerName" style="width: 400px;margin-left: 20px;">
                </v-col>
            </v-row>
            <v-row class="fill-height" style="width: 100%;">

            </v-row>
        </v-row>
        <v-row style="height: 20%;width: 100%;">
            <v-col cols="7">
            </v-col>
            <v-col cols="5">
                <el-button class="whiteBtn" type="primary" style="margin-left: 20px; height: 36px; float: right;" @click="$emit('backMainPage')">取消</el-button>
                <el-button class="redBtn" type="primary" style="margin-left: 20px; height: 36px;float: right;" @click="saveInfo">保存</el-button>
                <el-button class="redBtn" type="primary" style="margin-left: 20px; height: 36px;float: right;" @click="showInfo">展示表格信息</el-button>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import DropDownBox from '@/components/dropDown/DropDownBox.vue'

const props = defineProps({
    pageType: {
        type: String,
        default: "Edit"
    },
    formData: {
        type: Object,
        default: () => ref()
    }
})
// console.log('formData', formData)

const satify = ref(false)
const options = ref([
    { value: 1, label: '是' },
    { value: 0, label: '否' }
])
const isEditPage = computed(() => {
    console.log(props.formData)
    return props.pageType == 'Edit' ? true : false
})

const phaseOptions = ref([
    { label: '共青团员', value: '共青团员' },
    { label: '入党申请人', value: '入党申请人' },
    { label: '积极分子', value: '积极分子' },
    { label: '发展对象', value: '发展对象' },
    { label: '预备党员', value: '预备党员' },
    { label: '正式党员', value: '正式党员' },
])

const showInfo = () => {
    console.log('编辑页面信息', console.log(props.formData))
}

const saveData = () => {

}

const saveInfo = async () => {
  try {
    // 模拟保存操作，比如调用API
    const result = await saveData() // 假设saveData是你调用的保存方法

    // 如果保存成功，触发backMainPage事件
    emit('backMainPage')
  } catch (error) {
    // 如果保存失败，处理错误
    console.error('保存失败:', error)
    // 显示错误信息给用户，比如弹出提示
    alert('保存失败，请稍后再试。')
  }
}

</script>

<style>
.disableInput {
    cursor: not-allowed;
    margin-left: 10px;
    font-size: 15px;
    width: 200px;
    height: 40px;
    border: 1px solid #ccc;
    /* 外边框样式 */
    border-radius: 5px;
    /* 可选的，添加圆角 */
    background-color: #E3E3E3;
}

.customInput {
    margin-left: 10px;
    background-color: white;
    font-size: 15px;
    width: 200px;
    height: 40px;
    border: 1px solid #ccc;
    /* 外边框样式 */
    border-radius: 5px;
    /* 可选的，添加圆角 */
}

.el-select{
    --el-select-input-focus-border-color: #red !important;
}

.el-select__placeholder.is-transparent{
    color: #3E3E3E;
}

.el-select-dropdown__item{
    align-self: center;
}
.el-select-dropdown__item.is-hovering{
    background-color: #C83C23 ;
    color: #fff;
}
.checkFileBtn{
    background-color: #37A0FF;
    border: none;
}
.el-select__wrapper.is-focused.el-tooltip__trigger.el-tooltip__trigger{
    background-color: #F7F7F7;
}
input{
    text-indent:5px;
}
</style>

<style src="@/style/button.css"></style>