<template>
  <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
    <v-col class="d-flex fill-height flex-column">
      <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
        <v-col>
          <SubpageTitle text="荣誉奖项" svg="/src/img/风采记录/record.png" width="43" height=43></SubpageTitle>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>

import SubpageTitle from '@/components/SubpageTitle.vue';

</script>

<style>
.image-container-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 30px; 
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center; 
}

.image{
  width: 336px; 
  height: 260px;
  border-radius: 10px;
}

.spacer{
  width:10px;
}

.image-container + .image-container {
  margin-left: 20px; 
}
</style>