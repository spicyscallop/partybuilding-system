<template>
    <div class="d-flex fill-height ml-5 mr-5" style="border-radius: 50px;">
        <v-stepper class="" model-value="2" style="width: 100%;box-shadow: none;">
            <v-stepper-header style="width: 100%; box-shadow: none;">
                <v-col class="d-flex align-center justify-center">
                    <v-sheet>
                        <!-- <Icon :phaseName="getPhaseName(0)" :activate= "nowPhase>=1" :activateImg="activate"
                            :unactivateImg="unactivate" :nowPhase="clickPhase==1" :nowStage="nowPhase" :clickStage="clickPhase"
                            @click="clickPhaseEvent(1)"></Icon> -->
                        <Icon :nowPhase="nowPhase" :clickPhase="clickPhase" :iconPhase="1" :phaseName="getPhaseName(0)" @click="clickPhaseEvent(1)">
                        </Icon>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-divider :class="{ 'diver': nowPhase >= 2 }" thickness="3px"></v-divider>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-sheet class="pa-2 ma-2">
                        <!-- <Icon :phaseName="getPhaseName(1)" :activate="nowPhase>=2" :activateImg="activate"
                            :unactivateImg="unactivate" :nowPhase="clickPhase==2" :nowStage="nowPhase" :clickStage="clickPhase"
                            @click="clickPhaseEvent(2)"></Icon> -->
                        <Icon :nowPhase="nowPhase" :clickPhase="clickPhase" :iconPhase="2" :phaseName="getPhaseName(1)" @click="clickPhaseEvent(2)">
                        </Icon>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-divider :class="{ 'diver': nowPhase >= 3 }" thickness="3px"></v-divider>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-sheet class="pa-2 ma-2">
                        <!-- <Icon :phaseName="getPhaseName(2)" :activate="nowPhase>=3" :activateImg="activate"
                            :unactivateImg="unactivate" :nowPhase="clickPhase==3" :nowStage="nowPhase" :clickStage="clickPhase"
                            @click="clickPhaseEvent(3)"></Icon> -->
                        <Icon :nowPhase="nowPhase" :clickPhase="clickPhase" :iconPhase="3" :phaseName="getPhaseName(2)" @click="clickPhaseEvent(3)">
                        </Icon>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-divider :class="{ 'diver': nowPhase >= 4 }" thickness="3px"></v-divider>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-sheet class="pa-2 ma-2">
                        <!-- <Icon :phaseName="getPhaseName(3)" :activate="nowPhase>=4" :activateImg="activate"
                            :unactivateImg="unactivate" :nowPhase="clickPhase==4" :nowStage="nowPhase" :clickStage="clickPhase"
                            @click="clickPhaseEvent(4)"></Icon> -->
                        <Icon :nowPhase="nowPhase" :clickPhase="clickPhase" :iconPhase="4" :phaseName="getPhaseName(3)" @click="clickPhaseEvent(4)">
                        </Icon>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-divider :class="{ 'diver': nowPhase >= 5 }" thickness="3px"></v-divider>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                    <v-sheet class="pa-2 ma-2">
                        <!-- <Icon :phaseName="getPhaseName(4)" :activate="nowPhase>=5" :activateImg="activate"
                            :unactivateImg="unactivate" :nowPhase="clickPhase==5" :nowStage="nowPhase" :clickStage="clickPhase"
                            @click="clickPhaseEvent(5)"></Icon> -->
                        <Icon :nowPhase="nowPhase" :clickPhase="clickPhase" :iconPhase="5" :phaseName="getPhaseName(4)" @click="clickPhaseEvent(5)">
                        </Icon>
                    </v-sheet>
                </v-col>
            </v-stepper-header>
        </v-stepper>
    </div>
</template>

<script>
import Icon from '@/views/student/FZJDView/components/icons/Icon2.vue';
import activate from '@/img/FZJD/activate.png'
import unactivate from '@/img/FZJD/unactivate.png'
export default {
    props: {
        nowPhase: {
            type: Number,
            default: 2
        }
    },
    components: {
        Icon
    },
    setup() {
        return {
            activate,
            unactivate,
        }
    },
    data() {
        return {
            activateIconList: [true, true, false, false, false],
            clickPhase: 1
        }
    },
    methods: {
        getPhaseName(index) {
            const phaseNames = ["入党申请人", "入党积极分子", "发展对象", "预备党员", "考察与转正"];
            return phaseNames[index] || "";
        },
        getActivateItem(index) {
            return this.activateIconList[index]
        },
        clickPhaseEvent(clickPhase) {
            this.clickPhase = clickPhase
            this.$emit('child-event', clickPhase)
        }
    },
    watch: {
        nowPhase(newVal) {
            this.clickPhase = newVal;
        }
    },
    mounted() {
        this.clickPhase = this.nowPhase;
    },
};

</script>

<style>
.diver {
    color: #FF5B5B;
    opacity: 1;
}
</style>