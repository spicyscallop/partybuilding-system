<template>
    <div v-if="visible" class="message" :class="typeClass">
        <!-- <img v-if="iconIndex==0" src="@/img/infoIcon/success.svg" alt="success" style="margin-left: -10px;width:30px;height: 30px;">
        <img v-if="iconIndex==1" src="@/img/infoIcon/warning.svg" alt="warning" style="margin-left: -10px;width:30px;height: 30px;">
        <img v-if="iconIndex==2" src="@/img/infoIcon/error.svg" alt="error" style="margin-left: -10px;width:30px;height: 30px;">
        <img v-if="iconIndex==3" src="@/img/infoIcon/info.svg" alt="info" style="margin-left: -10px;width:30px;height: 30px;"> -->
        {{message}}
    </div>
</template>
  
  
<script>
import SuccessIcon from '@/img/infoIcon/success.svg'
import ErrorIcon from '@/img/infoIcon/error.svg'
import InfoIcon from '@/img/infoIcon/info.svg'
import WarningIcon from '@/img/infoIcon/warning.svg'
export default {
    components: {
        SuccessIcon,
        ErrorIcon,
        InfoIcon,
        WarningIcon
    },
    props: {
        type: {
            type: String,
            default: 'info'
        },
        message: String,
        duration: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            visible: false,
            iconIndex: 0,
        };
    },
    computed: {
        typeClass() {
            return `message-${this.type}`;
        },
    },
    methods: {
        updateMessage(options) {
            this.message = options.message;
            this.type = options.type || 'info';
            this.duration = options.duration || 3000;
            // 重置定时器
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.visible = false;
            }, this.duration);
        },
        getIconClass() {
            if (this.type=='success'){
     
                this.iconIndex = 0;
            }else if(this.type=='warning'){
                this.iconIndex = 1;
            }else if(this.type=='error'){
                this.iconIndex = 2;
            }else{
                this.iconIndex = 3;
            }
        },
    },

    mounted() {
        this.getIconClass()
        this.visible = true;
        setTimeout(() => {
            this.visible = false;
            this.$emit('close');
        }, this.duration);
    },
    beforeUnmount() {
        clearTimeout(this.timer);
    }


};
</script>
  
<style scoped>
.message {
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
    background-color: #333;
    transition: all 0.3s ease-in-out;
    opacity: 0.95;
    z-index: 1000;
}

.message-enter-active,
.message-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.message-enter-from,
.message-leave-to {
    opacity: 0;
}

.message-enter-to,
.message-leave-from {
    opacity: 1;
}

.message-info {
    background-color: #909399;
}

.message-success {
    background-color: #67c23a;
}

.message-warning {
    background-color: #e6a23c;
}

.message-error {
    background-color: #f56c6c;
}

.message-icon {
    margin-right: 10px;
}
</style>
  