<template>
    <v-container fluid class="ma-0 fill-height" style="background-color: #ffffff;">
        <v-row class="d-flex justify-space-around mb-6" style="height: 10%;background-color: #ffffff;margin-top: 20px;">
            <v-col cols="4">
                <span style="color: red;margin-left: 30px;">*</span><span>学工号</span><input required
                    class="customInput" placeholder=""
                    v-model="localFormData.userId">
            </v-col>
            <v-col cols="4">
                <span style="color: red;margin-left: 30px;">*</span><span>姓名</span><input required
                    class="customInput"  placeholder=""
                    v-model="localFormData.name">
            </v-col>
            <v-col cols="4">
                <span style="color: red;">*</span><span style="margin-right: 10px;">团员身份</span>
                <el-select v-model="localFormData.isCommunistYouthLeagueMember" :placeholder="placeholder" size="large" style="width: 200px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </v-col>
        </v-row>
        <v-row style="background-color: #f7f7f7; height: 60%;padding: 20px;border-radius: 20px;">
            <v-row style="width: 100%;">
                <v-col cols="6">
                    <div style="display: inline-block;">
                        <div><span style="margin-left: 10px;">谈话人</span></div>
                        <div>
                            <input placeholder="四个字名；四个字名；" v-model="localFormData.talkerName"
                                class="customInput"
                                style="width: 400px;">
                        </div>
                    </div>
                </v-col>
                <v-col cols="6">
                    <div style="display: inline-block;">
                        <div><span style="margin-left: 0px;">《入党申请书》提交时间</span></div>
                        <div>
                            <el-date-picker v-model="localFormData.applyTime" type="date" placeholder="Pick a day"
                                size="large" style="width: 350px;" />
                            <el-button type="primary" class="checkFileBtn"
                                style="margin-left: 20px; height: 36px;color: #ffffff;">查看文件</el-button>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row style="width: 100%;">
                <v-col style="margin-left: 10px;" cols="6">
                    <div style="display: inline-block;">
                        <div><span style="margin-left: 0px;">《入党申请人谈话登记表》提交时间</span></div>
                        <div>
                            <el-date-picker v-model="localFormData.talkerTime" type="date" placeholder="Pick a day"
                                size="large" style="width: 400px;" />
                        </div>
                    </div>
                </v-col>
                <v-col cols="6">

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
                <el-button class="redBtn" type="primary" style="margin-left: 20px; height: 36px;float: right;" @click="handleSave">保存</el-button>
                <el-select v-model="localFormData.changeToPhase" placeholder="更改发展阶段" size="large" style="width: 150px;float: right;">
                    <el-option v-for="item in phaseOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
    pageType: {
        type: String,
        default: "Edit"
    },
    formData: {
        type: Object,
        default: () => ({
            userId: '',
            name: '',
            isCommunistYouthLeagueMember: '',
            talkerName: '',
            talkerTime: '',
            applyTime: '',
            changeToPhase: '',
        })
    }
})

// Creating a mutable local state from props.formData
const localFormData = ref({...props.formData})

const satify = ref(false)
const options = ref([
    { value: '是', label: '是' },
    { value: '否', label: '否' }
])

const phaseOptions = ref([
    { label: '共青团员', value: '共青团员' },
    { label: '入党申请人', value: '入党申请人' },
    { label: '积极分子', value: '积极分子' },
    { label: '发展对象', value: '发展对象' },
    { label: '预备党员', value: '预备党员' },
    { label: '正式党员', value: '正式党员' },
])

const addPerson = () => {
    console('添加人员请求')
}

const handleSave = async () => {
    try{
        // 添加人员
        addPerson();
        
        ElMessage({
            message: '人员添加成功！',
            type: 'success',
            duration: 2000, // 提示框显示时长，单位毫秒
            });

        // 触发事件'backMainPage'
        $emit('backMainPage');
    }catch(error) {
        ElMessage({
            message: '人员添加失败！',
            type: 'error',
            duration: 2000,
        });
        console.error('保存失败:', error);
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
</style>

<style src="@/style/button.css"></style>