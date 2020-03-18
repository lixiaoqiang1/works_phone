<style scoped>
    .top_form .top_list{
        width: 220px;float: left;margin: 0 15px 10px 0;
    }
    .top_form .idbtn{
        width: 100px;
    }
    .top_form .list_search{
        width: 300px;
    }
    .wxid{
      float: left;
    }
    .wxid img{
      width: 48px;height: 48px;
    }
    .wx_list{
      width: 100%;margin-left: 5px
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
        <el-form class="top_form" ref="form">
         <el-input class="top_list" placeholder="搜索员工姓名" v-model="thisname">
              <template slot="prepend">姓名</template>
          </el-input>
          <el-input class="top_list" placeholder="搜索员工账号" v-model="thismobile">
              <template slot="prepend">账号</template>
          </el-input>
          <el-input class="top_list" placeholder="搜索员工IMEI" v-model="thisimei">
              <template slot="prepend">IMEI</template>
          </el-input>
          <el-button class="top_list idbtn" type="primary" @click="search1">查询</el-button>
          <div class="clearfix"></div>
        </el-form>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column prop="imei" label="设备IMEI"></el-table-column>
                <el-table-column prop="imei1" label="操作"></el-table-column>
                <el-table-column prop="username" label="员工姓名"  ></el-table-column>
                <el-table-column prop="mobile" label="员工账号"></el-table-column>
                <el-table-column prop="department" label="员工部门"></el-table-column>
                <el-table-column prop="yuangong1" label="操作人姓名"></el-table-column>
                <el-table-column prop="role" label="操作角色"></el-table-column>
                <el-table-column prop="yuangong3" label="操作日期"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.total">
            </el-pagination>
            <!-- 分页end -->
        </div>
        <!-- 表格end -->
    </div>
</template>
<script>
import pageNation from '@/components/pageNation/index'     // 引入分页
 import {bindLogs } from '@/api/user'
  export default {
    data() {
      return {
        thisname:'',//昵称
        thismobile:'',//账号
        thisimei:'',//imei
        search:'',//搜索
        total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: []//table数据
      };
    },
    created: function () {
        //表格渲染
        this.handleUserList();
    },
    components: {
      pageNation
    },
    methods: {
      //查询
      search1(){
        this.handleUserList();
      },
        //每页条数
      handleSizeChange(val) {
          this.pageSize = val;
          this.handleUserList();
      },
      //选择某个页面
      handleCurrentChange(val) {
          this.currentPage = val;
          this.handleUserList();
      },
      handleUserList() {
          //表格渲染
          let json2 = {
              limit:this.pageSize, //每页条数
              page:this.currentPage,//选择跳页
              username:this.thisname,//姓名
              mobile:this.thismobile,//账号
              imei:this.thisimei
          }
          //表格渲染
          bindLogs(json2).then(res => {
            console.log(res)
            this.userList = res.data.lists;
            this.total = res.data.total;
          }).catch(() => {
              this.$message.error('请求错误！');
          })
      }
    }
  };
</script>