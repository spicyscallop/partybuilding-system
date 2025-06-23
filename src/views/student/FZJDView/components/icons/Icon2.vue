<template>
    <v-sheet rounded="lg" class="d-flex fill-height" style="width: 100%;">
        <v-col>
            <v-row class="justify-center">
                <div>
                    <img v-if="nowPhase>=iconPhase && clickPhase!=iconPhase" style="width: 100px;height: 100px;" :src="phaseActivate">
                    <img v-if="nowPhase>=iconPhase && clickPhase==iconPhase" style="width: 120px;height: 120px;" :src="phaseActivateClick">
                    <img v-if="nowPhase<iconPhase && clickPhase!=iconPhase" style="width: 100px;height: 100px;" :src="phaseUnactivate">
                    <img v-if="nowPhase<iconPhase && clickPhase==iconPhase" style="width: 120px;height: 120px;" :src="phaseUnactivateClick">
                </div>
            </v-row>
            <v-row class="justify-center">
                <h5 :class="{'active-phase': nowPhase >= iconPhase || clickPhase == iconPhase}">{{ phaseName }}</h5>
            </v-row>
        </v-col>
    </v-sheet>
</template>

<script>
import phaseActivate from '@/img/iconPhase/phaseActivate.jpg'
import phaseActivateClick from '@/img/iconPhase/phaseActivateClick.jpg'
import phaseUnactivate from '@/img/iconPhase/phaseUnactivate.jpg'
import phaseUnactivateClick from '@/img/iconPhase/phaseUnactivateClick.jpg'
export default {
    props: {
        iconPhase:{
            type:Number,
            default: 0
        },
        nowPhase:{
            type: Number,
            default: 0
        },
        clickPhase:{
            type: Number,
            default: 0
        },
        phaseName: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            phaseActivate,
            phaseActivateClick,
            phaseUnactivate,
            phaseUnactivateClick
        }
    },
    methods: {
    },
    mounted() {

    },
};

</script>
<style>
.active-phase {
    color: #FF5B5B;
    font-weight: bold;
}
</style>