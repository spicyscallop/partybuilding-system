<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3" style="padding:0 20px 0 20px">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-0 flex-grow-0" style="height: 70px; flex-basis: 0; overflow: visible;">
                <v-col>
                    <SubpageTitle text="发展阶段" icon="mdi-account-check" @drawerToggle="$emit('drawerToggle')"></SubpageTitle>
                </v-col>
                <!-- <v-col>
                    阶段：<input v-model="phase" style="width: 100px;background-color: grey;">
                    子阶段：<input v-model="subPhase" style="width: 100px;background-color: grey;">
                </v-col> -->
            </v-row>
            <v-row class="mb-3" style="border-radius: 30px;max-height: 200px;">
                <v-sheet style="width: 100%;border-radius: 20px; max-height: 200px;">
                    <IconPhases :nowPhase="phase" style="height: 100%;" @child-event="changePhaseEvent"></IconPhases>
                </v-sheet>
            </v-row>
            <v-row class="" style="overflow: hidden;">
                <Phase1Com v-if="clickPhase == 1" :phase="subPhase"></Phase1Com>
                <Phase2Com v-if="clickPhase == 2" :phase="subPhase"></Phase2Com>
                <Phase3Com v-if="clickPhase == 3" :phase="subPhase" style="width: 100%;"></Phase3Com>
                <Phase4Com v-if="clickPhase == 4" :phase="subPhase" style="width: 100%;"></Phase4Com>
                <Phase5Com v-if="clickPhase == 5" :phase="subPhase" style="width: 100%;"></Phase5Com>
            </v-row>
        </v-col>
    </v-container>
</template>

  
<script>
import IconPhases from '@/views/student/FZJDView/components/IconPhases.vue'
import SubpageTitle from '@/components/SubpageTitle.vue';
import Phase5Com from '@/views/student/FZJDView/components/phase/Phase5Com.vue';
import Phase4Com from '@/views/student/FZJDView/components/phase/Phase4Com.vue';
import Phase3Com from '@/views/student/FZJDView/components/phase/Phase3Com.vue';
import Phase2Com from '@/views/student/FZJDView/components/phase/Phase2Com.vue';
import Phase1Com from '@/views/student/FZJDView/components/phase/Phase1Com.vue';
export default {
    components: {
        IconPhases,
        SubpageTitle,
        // Popup_upload,
        // Popup_download,
        Phase1Com,
        Phase2Com,
        Phase3Com,
        Phase4Com,
        Phase5Com
    },
    data() {
        return {
            phase: 2,
            clickPhase: 1,
            subPhase: 205
        }
    },
    methods: {
        changePhaseEvent(clickPhase) {
            // if(clickPhase<=this.phase){
                this.clickPhase = clickPhase
            // }
        }
    },
    mounted() {

    }
}
</script>

<!-- <script src="./FZJDView.js"></script> -->

<style lang="scss" src="./FZJDView.css" scoped></style>