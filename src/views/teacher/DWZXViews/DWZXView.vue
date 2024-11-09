<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row
                class="flex-shrink-0 flex-grow-0"
                style="flex-basis: 0; overflow: visible"
            >
                <v-col>
                    <SubpageTitle
                        text="党委中心"
                        width="43"
                        height="43"
                    ></SubpageTitle>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col
                    v-for="(item, index) in dwzx"
                    :key="index"
                    cols="12"
                    sm="4"
                >
                    <div class="d-flex fill-height align-stretch pt-3 pb-10">
                        <v-sheet
                            rounded="lg"
                            class="flex-grow-1 flex-column ma-3 elevation-8 py-5 pl-5 pr-10"
                            >
                            <v-row class="mb-0  ">
                                <v-col cols="auto">
                                    <IconParty
                                        class="mt-n1"
                                        style="height: 80px"
                                    ></IconParty>
                                </v-col>
                                <v-col>
                                    <h1 class="text-h3 font-weight-bold">
                                        {{ item.count }}
                                        <v-label>人</v-label>
                                    </h1>
                                    <h2 class="text-h6">{{ item.title }}</h2>
                                    <h2 class="text-subtitle-1 text-blue">
                                        {{ item.subtitle }}
                                    </h2>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0">
                                <v-col cols="3"></v-col>
                                <v-col cols="6">
                                    <v-btn block style="background-color: red; color: white"
                                    :to=item.viewLink>
                                        {{ item.buttonText }}
                                    </v-btn>
                                </v-col>
                                <v-col cols="3"></v-col>
                            </v-row>
                        </v-sheet>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from "@/components/SubpageTitle.vue";
import IconParty from "@/components/icons/IconParty.vue";
export default {
    components: {
        SubpageTitle,
        IconParty,
    },
    data() {
        return {
            dwzx: [
                {
                    count: 23,
                    title: "党支部数量",
                    subtitle: "浙江大学软件学院党支部",
                    buttonText: "支部列表",
                    viewLink: "/teacher/dwzx/branchlist"
                },
                {
                    count: 123,
                    title: "党员数量",
                    subtitle: "浙江大学软件学院党支部",
                    buttonText: "人员列表",
                    viewLink: "",
                },
                {
                    count: 132,
                    title: "预备党员数量",
                    subtitle: "浙江大学软件学院党支部",
                    buttonText: "人员列表",
                    viewLink: ""
                },
                {
                    count: 44,
                    title: "发展对象数量",
                    subtitle: "浙江大学软件学院党支部",
                    buttonText  : "人员列表",
                    viewLink: ""
                },
                {
                    count: 31,
                    title: "积极分子数量",
                    subtitle: "浙江大学软件学院党支部",
                    buttonText  : "人员列表",
                    viewLink: ""
                },
                {
                    count: 231,
                    title: "共青团员",
                    subtitle: "浙江大学软件学院党支部",
                    buttonText  : "人员列表",
                    viewLink: ""
                },
            ],
        };
    },
    methods: {
        goToRoute(link) {
            console.log(link);
            this.$router.push(link);
        }
    }
};
</script>

<css scoped lang="scss">
</css>