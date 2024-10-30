<template>
    <div>
      <v-btn large class="d-lg-none mr-2" @click="$emit('drawerToggle')" icon color="party-2">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <template v-if="svg !== ''">
        <v-img :src="svg" alt="Custom SVG Image" :width="width" :height="height" style="display:inline-block"></v-img>
      </template>
      <template v-else-if="icon !== ''">
        <v-icon class="text-h4 text-grey-darken-3">{{ icon }}</v-icon>
      </template>
      <template v-else>
        <!-- 如果既没有icon也没有svg，则不显示任何内容 -->
      </template>
      <h1 class="d-inline-block text-h4 ml-2 font-weight-bold" style="vertical-align: bottom;margin-bottom: 8px;">{{ text }}</h1>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      width: {
        type: Number,
        default: 100
      },
      height: {
        type: Number,
        default: 100
      },
      svg: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      }
    },
    emits: ['drawerToggle'],
  });
  </script>
  