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
    .table .handleEdit{
      color: #409EFF;
    }
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
          <el-form class="top_form" ref="form">
            <div class="top_list">
                <el-select v-model="department" placeholder="选择部门">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                </el-select>
            </div>
            <el-input class="top_list" placeholder="请输入微信号" v-model="alias">
                <template slot="prepend">微信号</template>
            </el-input>
            <el-input class="top_list" placeholder="请输入昵称" v-model="w_name">
                <template slot="prepend">昵称</template>
            </el-input>
            <el-input class="top_list" placeholder="请输入备注" v-model="username">
                <template slot="prepend">备注</template>
            </el-input>
            <el-button class="top_list idbtn" type="primary" @click="search1">查询</el-button>
            <div class="clearfix"></div>
          </el-form>
          <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
              <el-table-column label="员工微信" width="200px">
                <template scope="scope">
                  <a class="handleEdit" @click="handleEdit(scope.$index, scope.row)">
                    <div class="wxid"><img :src="scope.row.images1"></div>
                    <div class="wxid">
                      <div class="wx_list">{{ scope.row.w_id }}</div>
                      <div class="wx_list">{{ scope.row.w_name }}</div>
                      
                    </div>
                  </a>
                  </template>
              </el-table-column>
              <el-table-column prop="user_num" label="好友数"></el-table-column>
              <el-table-column prop="chatroom_num" label="群总数"></el-table-column>
              <el-table-column prop="last_chat_time" label="上次聊天"></el-table-column>
              <el-table-column prop="alias" label="手机微信号"></el-table-column>
              <el-table-column prop="" label="微信版本"></el-table-column>
              <el-table-column prop="" label="手机型号"></el-table-column>
              <el-table-column prop="username" label="当前登录员工"></el-table-column>
              <el-table-column prop="imei" label="IMEI"></el-table-column>
              <el-table-column prop="company" label="部门"></el-table-column>
              <el-table-column prop="position" label="角色"></el-table-column>
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
import { company,wechatusers } from '@/api/user'
  export default {
    data() {
      return {
        options: [],
        department: '',//员工部门
        alias:'',//微信号
        username:'',//昵称
        w_name:'',//备注
        search:'',//搜索
        total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: []//table数据
      };
    },
    inject:['reload'],//刷新当前页
    created: function () {
      //部门渲染
        this.companys();
        //表格渲染
        this.handleUserList();
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
      companys(){
          //部门渲染
          company().then(res => {
              console.log(res.data);
              this.options = res.data
          }).catch(() => {
              this.$message.error('请求错误！');
          })
        },
      handleUserList() {
          //表格渲染
          let json1 = {
            pageSize:this.pageSize, //每页条数
            page:this.currentPage,//选择跳页
            department:this.department,
            alias:this.alias,//微信号
            username:this.username,//昵称
            w_name:this.w_name,//备注
          }
          //表格渲染
            wechatusers(json1).then(res => {
              console.log(res)
                this.userList = res.data.list;
                this.total = res.data.total;    
                }).catch(() => {
                    this.$message.error('请求错误！');
            })
      },
      handleEdit(index, row){
        console.log(index, row);
        this.$router.push({ name:'wechatlist2'})
      }
    },
    
    
  };
</script>