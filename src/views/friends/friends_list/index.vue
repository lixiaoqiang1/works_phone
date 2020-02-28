<style scoped>
    .top_form .top_list{
        width: 220px;float: left;margin-right: 15px;
    }
    .top_form .idbtn{
        width: 100px;
    }
    .top_form .list_search{
        width: 300px;
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
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
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
    .el-pagination{text-align: center;margin-top: 15px;}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
          <el-form class="top_form" ref="form">
                  <el-input class="top_list" placeholder="请输入微信号" v-model="loan_id">
                      <template slot="prepend">微信号</template>
                  </el-input>
                  <el-input class="top_list" placeholder="请输入昵称" v-model="name">
                      <template slot="prepend">昵称</template>
                  </el-input>
                  <el-input class="top_list" placeholder="请输入备注" v-model="beizhu">
                      <template slot="prepend">备注</template>
                  </el-input>
                  <el-button class="top_list idbtn" type="primary" @click="search1">查询</el-button>
              <div class="clearfix"></div>
          </el-form>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column label="好友微信">
                  <template scope="scope">
                      <div class="wxid"><img :src="scope.row.images1"></div>
                      <div class="wxid">
                        <div class="wx_list">{{ scope.row.wx_id1 }}</div>
                        <div class="wx_list">{{ scope.row.wx_name1 }}</div>
                      </div>
                    </template>
                </el-table-column>
                <el-table-column prop="beizhu" label="微信备注"></el-table-column>
                <el-table-column label="跟进员工微信">
                  <template scope="scope">
                    <div class="wxid"><img :src="scope.row.images2"></div>
                      <div class="wxid">
                        <div class="wx_list">{{ scope.row.wx_id2 }}</div>
                        <div class="wx_list">{{ scope.row.wx_name2 }}</div>
                      </div>
                  </template>
                </el-table-column>
                <el-table-column prop="follow_up" label="当前跟进员工"></el-table-column>
                <el-table-column prop="last_time" label="上次聊天"></el-table-column>
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
  export default {
    data() {
      return {
        loan_id:'',//微信号
        name:'',//昵称
        beizhu:'',//备注
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
        //表格渲染
        this.handleUserList();
    },
    methods: {
      //查询
      search1(){
          if(this.name =='' & this.mobile=='' & this.loan_id==''){
              this.$message({message: '请输入搜索条件',type: 'warning'});
          }else{
              //表格渲染
              let json1 = {
                  loan_id:this.loan_id,
                  name:this.name,
                  beizhu:this.beizhu
              }
              console.log(json1)
              // MyLoans(json1).then(res => {
              //     let result = res.data.lists;
              //     let mess;
              //     let self = [];
              //     for(let key in result){
              //         mess = result[key];
              //         self.push(mess);
              //     }
              //     this.userList = self;
              // }).catch(() => {
              //     this.$message.error('请求错误！');
              // })
          }
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
              page:this.currentPage//选择跳页
          }
          //表格渲染
          let _this = this;
          _this.axios.get('/api/haoyouweixin').then((res)=>{
              console.log(res.data.data);
              _this.userList = res.data.data
          }).catch((err)=>{
              console.log(err);
          })

          // userList(json2).then(res => {
          //     let _that = this;
          //     let result = res.data.lists;
          //     console.log(res.data)

          //     let mess;
          //     let self = [];
          //     for(let key in result){
          //         mess = result[key];
          //         self.push(mess);
          //     }
          //     _that.total = res.data.total;
          //     _that.pageSize = res.data.per_page
          //     _that.userList = self;

          // }).catch(() => {
          //     this.$message.error('请求错误！');
          // })
      }
    }
  };
</script>