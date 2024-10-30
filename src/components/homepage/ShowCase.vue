<template>
    <v-sheet rounded="lg" class="d-flex flex-column pb-5 bg-grey-lighten-4" style="overflow: auto; width: 100%;">
        <div class="d-flex justify-space-between" style="height: 20%;">
            <h1 class="ml-5 mt-4 mb-3 text-h5">{{ title }}</h1>
        </div>
        <div class="justify-space-evenly d-flex" style="height: 70%;">
            <!-- <img class="justify-center align-center" style="height: 70%; border-radius: 15px;" src="@/img/showcase/1.png"> -->
            <v-sheet class="ma-2 pa-2 d-flex bg-grey-lighten-4" style="border-radius: 15px;">
                <img class="justify-center align-center" style="border-radius: 15px;width: 200px;height: auto;" src="@/img/showcase/WechatIMG20.jpg">
            </v-sheet>
            <v-sheet class="ma-2 pa-2 d-flex bg-grey-lighten-4">
                <img class="justify-center align-center" style="border-radius: 15px;width: 200px;height: auto;" src="@/img/showcase/WechatIMG19.jpg">
            </v-sheet>
            <v-sheet class="ma-2 pa-2 d-flex bg-grey-lighten-4">
                <img class="justify-center align-center" style="border-radius: 15px;width: 200px;height: auto;" src="@/img/showcase/WechatIMG18.jpg">
            </v-sheet>
        </div>
    </v-sheet>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: function () {
                return [];
            },
        },
        title: {
            type: String,
            default: "风采展示",
        }
    },
    data () {
      return {
        content: []
      }
    },
    methods: {

    },
    watch:{

    },
    mounted(){

    },
};

</script>