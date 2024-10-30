<template>
    <div :style="boxStyle">
        <el-select v-model="selectIndex" :placeholder="placeholder" size="large" :disabled="disable">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
    </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'

export default {
    components: {
        ArrowDown
    },
    props: {
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: ''
        },
        disable: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 0
        },
        boxStyle: {
            type: String,
            default: "width: 200px; border-radius: 10px;"
        }
    },
    data() {
        selectIndex: 0
    },
    watch: {
        value(new_Value){
            console.log("props传入了一个新值",new_Value)
            this.selectIndex = new_Value
        },
        selectIndex(newOption) {
            console.log(this.selectIndex)
            this.$emit('optionChange', newOption);
        },
    },

};
</script>

<style>
.el-select__wrapper.is-disabled{
    background-color: #e3e3e3 !important;
}
:root {
    --el-color-primary: grey
}

/* .el-select__wrapper.is-disabled.el-tooltip__trigger.el-tooltip__trigger{
    cursor: not-allowed;
    background-color: #ed4085 !important;
    color: var(--el-text-color-placeholder);
    box-shadow: 0 0 0 1px var(--el-select-disabled-border) inset;
} */
/* .el-select__wrapper :deep(.is-disabled){
    cursor: not-allowed;
    background-color: #ed4085 !important;
    color: var(--el-text-color-placeholder);
    box-shadow: 0 0 0 1px var(--el-select-disabled-border) inset;
} */

</style>