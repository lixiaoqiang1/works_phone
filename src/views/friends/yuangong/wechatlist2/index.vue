
<style scoped>
.callvoice>>>.el-tabs--left .el-tabs__item.is-left{
  text-align: left;
}
</style>
<template>
  <div class="callvoice padding10">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane :label="'微信聊天'">
        <wechatchat></wechatchat>
      </el-tab-pane>
      <el-tab-pane :label="'新加好友（'+newfriends+'）'">
        <newfriends></newfriends>
      </el-tab-pane>
      <el-tab-pane :label="'删除好友（'+deletefriends+'）'">
        <deletefriends></deletefriends>
      </el-tab-pane>
      <el-tab-pane :label="'拉黑好友（'+shieldingfriends+'）'">
        <shieldingfriends></shieldingfriends>
      </el-tab-pane>
      <el-tab-pane :label="'红包转账（'+transfer+'）'">
        <transfer></transfer>
      </el-tab-pane>
      <el-tab-pane :label="'敏感词（'+sensitiveword+'）'">
        <sensitiveword></sensitiveword>
      </el-tab-pane>
      <el-tab-pane :label="'发朋友圈记录（'+circlefriends+'）'">
        <circlefriends></circlefriends>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
  import wechatchat from '@/views/friends/yuangong/employees/wechatchat'
  import newfriends from '@/views/friends/yuangong/employees/newfriends'
  import deletefriends from '@/views/friends/yuangong/employees/delete_friends'
  import shieldingfriends from '@/views/friends/yuangong/employees/shielding_friends'
  import transfer from '@/views/friends/yuangong/employees/transfer'
  import sensitiveword from '@/views/friends/yuangong/employees/sensitive_word'
  import circlefriends from '@/views/friends/yuangong/employees/circlefriends'
  export default {
    data() {
      return {
        tabPosition: 'left',
        newfriends:22,
        deletefriends:23,
        shieldingfriends:35,
        transfer:96,
        sensitiveword:74,
        circlefriends:0,
      };
    },
    components: {wechatchat,newfriends,deletefriends,shieldingfriends,transfer,sensitiveword,circlefriends },
  };
</script>