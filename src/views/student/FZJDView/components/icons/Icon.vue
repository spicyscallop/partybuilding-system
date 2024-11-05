<template>
    <v-sheet rounded="lg" class="d-flex fill-height" style="width: 100%;">
        <v-col>
            <v-row class="justify-center">
                <div>
                    
                </div>
                <div id="actDiv" :class="{'outerCircleActivateRed':nowPhase}">
                    <div id="myCircle" :class="{'circleUnActivate':!activate,'circleActivate':activate}">
                        <img v-if="activate == false" :src="unactivateImg" style="height: 50px;object-fit: cover;">
                        <img v-if="activate == true" :src="activateImg" style="height: 50px;object-fit: cover;">
                    </div>
                </div>
            </v-row>
            <v-row class="justify-center">
                <h5>{{ phaseName }}</h5>
            </v-row>
        </v-col>
    </v-sheet>
</template>

<script>
export default {
    props: {
        activate: {
            type: Boolean,
            default: true
        },
        nowPhase:{
            type: Boolean,
            default: false
        },
        nowStage:{
            type: Number,
            default: 0
        },
        clickStage:{
            type: Number,
            default: 0
        },
        activateImg: {
            type: String,
        },
        unactivateImg: {
            type: String,
        },
        phaseName: {
            type: String,
            default: ""
        }

    },
    data() {
        return {
            imgPath: "./phase_2_unactivate.png"
        }
    },
    methods: {
    },
    mounted() {
        // console.log(this.phaseName);
        // var circleElement = document.getElementById('myCircle');
        // // 根据变量的值切换样式
        // if (this.activate) {
        //     circleElement.classList.add('red');
        // } else {
        //     circleElement.classList.add('circleUnActivate');
        // }
    },
};

</script>
<style>
.activate{
    background-color: #F35339;border-radius: 50%; border: F35339;border-width: 2px;
}
.circleUnActivate {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    width: 90px;
    height: 90px;
    border: 2px solid #898989;
    /* 设置边框宽度和颜色 */
    border-radius: 50%;
    /* 将边框设置为圆角，使之呈现圆形 */
    position: relative;
}
.circleActivate {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    width: 90px;
    height: 90px;
    /* background-color: #FF5B5B; */
    background-color: #FF5B5B;
    border: 2px solid #F35339;
    /* 设置边框宽度和颜色 */
    border-radius: 50%;
    /* 将边框设置为圆角，使之呈现圆形 */
    position: relative;
}

.outerCircleActivateRed {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    background-color: #FFB9AE; 
    border-radius: 50%;
    position: relative;
}

.outerCircleActivateGrey {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    border: 10px solid #898989; /* 增加边框以形成圆环 */
    border-radius: 50%; /* 使边框呈现圆形 */
    position: relative;
    box-sizing: border-box; /* 确保边框宽度计算在内 */
}

</style>