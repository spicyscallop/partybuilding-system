<template>
    <v-row class="align-center justify-center d-flex">
        <v-col class="text-left" style="background-color: #f7f7f7;" cols="5">
            <div class="ml-8">
                <span v-if="isrequire" style="color: red;">*</span>
                <span v-if="!isrequire" style="color: red;">&nbsp;&nbsp;</span>
                <span>{{ title }}</span>
            </div>
        </v-col>
        <v-col class="align-center justify-center bg-white" cols="7">
            <input class="pl-5" :value="content" :readonly="readonly" style="width: 100%;color: #898989 ;"
                placeholder="待补充"    
            @input="updateParent">
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
        readonly: {
            type: Boolean,
            default: true
        },
        isrequire: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
        updateParent(event) {
            // 通过 emit 触发自定义事件传递给父组件
            this.$emit('update-value', event.target.value);
        }
    },
    mounted() {

    },
};

</script>

<style scoped>
input:focus {
    outline: none;
}
input::placeholder {
      color: #2B99FF;
    }
</style>