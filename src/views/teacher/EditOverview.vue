<template>
    <v-container fluid class="ma-0">
      <v-col style="height: 100%" class="d-flex flex-column justify-start">
        <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
          <v-col>
            <SubpageTitle text="编辑党委概况" icon="mdi-pencil" @drawerToggle="$emit('drawerToggle')"></SubpageTitle>
          </v-col>
        </v-row>
  
        <v-row style="flex-basis: 0; overflow: visible;">
          <v-col class="fill-height d-flex flex-column" cols="12">
            <v-form ref="form" v-model="valid" class="fill-height">
              <!-- 党委简介编辑 -->
              <div class="mb-6">
                <div class="d-flex align-center mb-3">
                  <v-icon color="red" class="mr-2">mdi-text-box-check-outline</v-icon>
                  <span class="text-h6 font-weight-bold" style="color: red;">党委简介</span>
                </div>
                <v-textarea
                  v-model="briefIntroduction"
                  :rules="[v => !!v || '党委简介不能为空']"
                  rows="4"
                  variant="outlined"
                  color="red"
                  class="background-white"
                ></v-textarea>
              </div>
  
              <!-- 党委荣誉编辑 -->
              <div class="mb-6 flex-grow-1">
                <div class="d-flex align-center mb-3">
                  <v-icon color="red" class="mr-2">mdi-seal-variant</v-icon>
                  <span class="text-h6 font-weight-bold" style="color: red;">党委荣誉</span>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    variant="text"
                    @click="addHonor"
                  >
                    <v-icon>mdi-plus</v-icon>
                    添加荣誉
                  </v-btn>
                </div>
                
                <div class="honor-list">
                  <v-card variant="outlined" class="mb-3" v-for="(honor, index) in honors" :key="index">
                    <v-card-text>
                      <div class="d-flex align-center">
                        <v-text-field
                          v-model="honor.title"
                          label="荣誉标题"
                          variant="outlined"
                          density="comfortable"
                          class="mr-3"
                          :rules="[v => !!v || '标题不能为空']"
                        ></v-text-field>
                        <v-text-field
                          v-model="honor.date"
                          label="获得日期"
                          type="month"
                          variant="outlined"
                          density="comfortable"
                          style="max-width: 200px"
                          :rules="[v => !!v || '日期不能为空']"
                        ></v-text-field>
                        <v-btn
                          icon
                          color="error"
                          variant="text"
                          class="ml-2"
                          @click="removeHonor(index)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
  
              <!-- 保存按钮 -->
              <div class="d-flex justify-end mt-4">
                <v-btn
                  color="error"
                  class="mr-3"
                  @click="cancel"
                >
                  取消
                </v-btn>
                <v-btn
                  color="primary"
                  @click="save"
                  :loading="saving"
                  :disabled="!valid"
                >
                  保存
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import SubpageTitle from '@/components/SubpageTitle.vue'
  
  defineEmits(['drawerToggle'])
  
  const router = useRouter()
  const form = ref(null)
  const valid = ref(false)
  const saving = ref(false)
  
  // 党委简介数据
  const briefIntroduction = ref("计算机科学与技术学院和软件学院党委坚持以习近平新时代中国特色社会主义思想为指导，紧紧围绕立德树人根本任务，在\"四个更加\"的战略导向下，秉承着\"人为本，和为贵，变则通\"的学院文化理念，构建完善\"开放、开环、联动、包容、共享\"的学院治理体系，为建设世界一流的计算机科学与技术学院和软件学院提供坚强的政治保证和组织保证。")
  
  // 党委荣誉数据
  const honors = ref([
    {
      title: "浙江大学计算机科学与技术学院和软件学院党委入选第三批全省高校党建\"双创\"培育创建对象",
      date: "2024-09"
    },
    {
      title: "浙江大学xxxxxxx基地",
      date: "2024-09"
    }
  ])
  
  // 添加荣誉
  const addHonor = () => {
    honors.value.push({
      title: "",
      date: ""
    })
  }
  
  // 删除荣誉
  const removeHonor = (index) => {
    honors.value.splice(index, 1)
  }
  
  // 取消编辑
  const cancel = () => {
    router.push('/teacher/home')
  }
  
  // 保存更改
  const save = async () => {
    if (!form.value.validate()) return
    
    saving.value = true
    try {
      // 这里添加保存到后端的逻辑
      // await saveOverview({
      //   briefIntroduction: briefIntroduction.value,
      //   honors: honors.value
      // })
      
      router.push('/teacher/home')
    } catch (error) {
      console.error('保存失败:', error)
    } finally {
      saving.value = false
    }
  }
  </script>
  
  <style scoped>
  .v-text-field {
    width: 100%;
  }
  
  .background-white {
    background-color: white;
  }
  
  .honor-list {
    background-color: white;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }
  </style>