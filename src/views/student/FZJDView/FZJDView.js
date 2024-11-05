import IconParty from '@/components/icons/IconParty.vue';
import SubpageTitle from '@/components/SubpageTitle.vue';
import { authentication } from '@/stores/authentication';
import axios from "axios";

import { ref, onMounted, nextTick } from 'vue'

// defineEmits(['drawerToggle']);
const auth = authentication();

const el = ref()
const fzjdMap = ["入党申请人", "积极分子", "发展对象", "预备党员"];
const stateOnMap = {
    "入党申请人": ["1", "1-1", "2", "2-1", "2-2", "3", "3-1", "3-2", "4", "4-1"],
    "积极分子": ["1", "1-1", "2", "2-1", "2-2", "2-3", "3", "3-1", "3-2", "4", "4-1"],
    "发展对象": ["1", "1-1", "2", "2-1", "2-2", "2-3", "3", "3-1", "3-2", "3-3", "4", "4-1", "4-2", "4-3", "4-4", "5", "5-1"],
    "预备党员": ["1", "1-1", "2", "2-1", "2-2", "3", "3-1", "3-2", "3-3", "3-4", "4", "4-1"]
}

const stateMap = {
    "入党申请人": new Map([
        ["提交入党申请书", "1-1"],
        ["确定谈话人", "2-1"],
        ["申请人谈话", "2-2"],
        ["变更身份为积极分子", "4-1"]]),
    "积极分子": new Map([
        ["成为积极分子", "1"],
        ["参加积极分子阶段党校培训班", "1-1"],
        ["确定培养联系人", "2-1"],
        ["提交群众意见调查表", "2-3"],
        ["提交班主任导师意见征求表", "2-3"],
        ["变更身份为发展对象", "4-1"]]),
    "发展对象": new Map([
        ["成为发展对象", "1"],
        ["参加发展对象阶段党校培训班", "1-1"],
        ["提交入党对象政治审查综合表", "2-2"],
        ["资格审查", "2-3"],
        ["资格预审", "2-3"],
        ["确定入党介绍人", "3-1"],
        ["提交入党志愿书", "3-2"],
        ["变更身份为预备党员", "5-1"]]),
    "预备党员": new Map([
        ["接收预备党员", "1"],
        ["参加预备党员阶段党校培训班", "2-1"],
        ["上级党委派人谈话", "2-2"],
        ["提出转正", "3-1"],
        ["征求群众意见", "3-2"],
        ["党委审批预备党员转正", "3-3"],
        ["党委审批通过", "3-4"],
        ["预备党员转正", "4"],
        ["变更身份为党员", "4-1"]]),

}

let fjzdData = ref({});

export default {
    components: {
        IconParty,
        SubpageTitle,
    },
    data() {
        return {
            

        }
    },
    methods:{

    },
    mounted: function () {
        axios.get("/stages/state", {
            params: {
                userNumber: auth.userNumber
            }
        }).then(async response => {
            fjzdData.value = response.data.data;
            fjzdData.value.developmentPhase = response.data.data.developmentPhase.toString().substring(0, response.data.data.developmentPhase.length - 2);
    
            if (fjzdData.value.developmentPhase == "入党积极分子")
                fjzdData.value.developmentPhase = "积极分子";
    
            console.log(stateMap[fjzdData.value.developmentPhase].get(fjzdData.value.state));
            let index = stateOnMap[fjzdData.value.developmentPhase].findIndex((element) => element == stateMap[fjzdData.value.developmentPhase].get(fjzdData.value.state));
    
            await nextTick();
    
            for (let i = 0; i <= index; i++) {
                let arg = stateOnMap[fjzdData.value.developmentPhase][i];
                console.log(arg);
    
                const isGroup = (arg.toString().indexOf('-') == -1);
    
                let element = document.querySelector("#state-" + arg);
                if (isGroup) {
                    console.log(arg);
                    if (parseInt(arg) > 1) {
                        // painting red to pre state line
                        document.querySelector("#state-" + (parseInt(arg) - 1) + " > div > div.line").style.setProperty("color", "red");
                        document.querySelector("#state-" + (parseInt(arg) - 1) + " > div > div.dot").style.setProperty("background", "red");
                    }
    
                    document.querySelector("#state-" + arg + " > div > div.arrow").style.setProperty("color", "red");
                    document.querySelector("#state-" + arg + " > div > div.dot").style.setProperty("color", "red");
                } else if (!isGroup) {
                    document.querySelector("#state-" + arg).style.setProperty("color", "red");
                }
            }
        })
    },
}