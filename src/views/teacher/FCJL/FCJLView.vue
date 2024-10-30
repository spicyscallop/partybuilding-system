<template>
  <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
    <v-col class="d-flex fill-height flex-column">
      <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
        <v-col>
          <SubpageTitle text="风采记录" svg="/src/img/风采记录/record.png" width="43" height=43></SubpageTitle>
        </v-col>
      </v-row>
      <v-row style="height: 280px;">
       <div class="image-container-wrapper">
         <div class="image-container">
           <img src="/src/img/showcase/WechatIMG18.jpg" alt="Image 1" class="image">
           <div class="spacer"></div>
           <img src="/src/img/showcase/WechatIMG19.jpg" alt="Image 2" class="image">
           <div class="spacer"></div>
           <img src="/src/img/showcase/WechatIMG20.jpg" alt="Image 3" class="image">
         </div>
       </div>
      </v-row>
      <v-row style="height: 280px;">
         <div class="image-container">
           <img src="/src/img/showcase/WechatIMG18.jpg" alt="Image 1" class="image">
           <div class="spacer"></div>
           <img src="/src/img/showcase/WechatIMG19.jpg" alt="Image 2" class="image">
           <div class="spacer"></div>
           <img src="/src/img/showcase/WechatIMG20.jpg" alt="Image 3" class="image">
         </div>
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