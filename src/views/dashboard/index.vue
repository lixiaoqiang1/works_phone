<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div>这里是概括这里是概括</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },
  data(){
    return{

    }
  },
  created(){
    console.log('111')
  }
}
</script>

<style scoped>
.dashboard-container {
  margin: 20px;
}
</style>
