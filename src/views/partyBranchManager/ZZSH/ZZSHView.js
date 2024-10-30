
export default {
    data() {
      return {
        selectedYear: new Date().getFullYear()
      };
        
      
    },
    methods: {
      handleYearChange() {
        console.log('选中的年份：', this.selectedYear);
        // 在这里处理选中的年份
      }
    }
  };