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
    .yuangong_o{
          margin: 0 0 10px 0;
    }
    .yuangong_o .el-radio-group{
      padding: 10px 0;
    }
    .yuangong_o .el-radio{
      min-width: 80px;margin: 5px 0 10px 0;
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
          <!-- <el-input class="top_list" placeholder="搜索员工微信号" v-model="thisweixin">
              <template slot="prepend">微信号</template>
          </el-input> -->
          <el-input class="top_list" placeholder="搜索员工IMEI" v-model="thisimei">
              <template slot="prepend">IMEI</template>
          </el-input>
          <el-button class="top_list idbtn" type="primary" @click="search1">查询</el-button>
          <el-button type="primary" round @click="shebeibtn">设备绑定日志</el-button>
          <div class="clearfix"></div>
        </el-form>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column prop="imei" label="设备IMEI"></el-table-column>
                <el-table-column label="是否绑定员工">
                        <template slot-scope="scope">
                           <span v-if="scope.row.is_bind == 1">是</span>
                           <span v-if="scope.row.is_bind == 0">否</span>
                        </template>
                    </el-table-column>
                <el-table-column prop="user.username" label="员工姓名"  ></el-table-column>
                <el-table-column prop="user.mobile" label="员工账号"></el-table-column>
                <el-table-column prop="times1" label="员工部门"></el-table-column>
                <el-table-column prop="modified_on" label="当前登录微信"></el-table-column>
                <el-table-column prop="phone_mod" label="机型"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <div v-if="scope.row.is_bind == 1">
                          <el-button size="mini" type="primary" @click="handlebtn0(scope.$index, scope.row)">解绑</el-button>
                          <!-- <el-button size="mini" type="primary" @click="handlebtn2(scope.$index, scope.row)">恢复出产设置</el-button> -->
                        </div>
                        <div v-if="scope.row.is_bind == 0">
                          <el-button size="mini" type="primary" @click="handlebtn1(scope.$index, scope.row)">绑定员工</el-button>
                        </div>
                    </template>
                </el-table-column>
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
        <!-- 绑定员工 -->
        <el-dialog title="选择绑定员工" :visible.sync="dialogFormVisible">
          <div class="yuangong_o" v-for="(item,index) in yuangong" :key="index">
              <p>{{item.key}}：</p>
              <el-radio-group v-model="ygradio">
                <el-radio :label="inner.id" v-for="inner in item.mess" :key="inner.id">{{inner.username}}</el-radio>
              </el-radio-group>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="btnrure">确 定</el-button>
          </div>
        </el-dialog>
      <!-- 绑定员工 -->
    </div>
</template>
<script>
import pageNation from '@/components/pageNation/index'     // 引入分页
import { allshebei,devicesbind,usersname } from '@/api/user'
var cityOptions ;
  export default {
    data() {
      return {
        dialogFormVisible: false,
        ygradio:'',
        yuangong:'',
        user1:{id:'',imei:'',imei2:'',user_id:''},
        thisname:'',//昵称
        thismobile:'',//账号
        // thisweixin:'',//微信
        thisimei:'',//imei
        search:'',//搜索
        total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: [],//table数据
      };
    },
    inject:['reload'],//刷新当前页
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
      shebeibtn(){
        this.$router.push({ path:'bindinglog', query: { id: 121 }});
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
              // modified_on:this.thisweixin,//微信号
              imei:this.thisimei
          }
          //表格渲染
          allshebei(json2).then(res => {
              let _that = this;
              _that.userList = res.data
              _that.total = res.data.total;
              _that.pageSize = res.data.per_page;

          }).catch(() => {
              this.$message.error('请求错误！');
          })
      },
      //解绑
      handlebtn0(index,row){
        let json2 = {
          id:row.id,
          imei:row.imei,
          imei2:row.imei2,
          user_id:row.user.id,
          is_bind:0
        }
        devicesbind(json2).then(res => {
          this.$message.success('解绑成功');
          this.reload();
        }).catch(() => {
            this.$message.error('请求错误！');
        })
      },
      //绑定员工弹出层
      handlebtn1(index,row){
        this.user1.id=row.id
        this.user1.imei=row.imei
        this.user1.imei2=row.imei2
        usersname().then(res => {
          this.dialogFormVisible = true;
          var arr = res.data.lists
          console.log(arr)
          
          let taget = {}
          for (let i of arr) {
            if (taget[i.department_big +'-'+ i.department] == undefined) {
                taget[i.department_big +'-'+ i.department] = [i]
            }else {
              taget[i.department_big +'-'+ i.department].push(i)
            }
          }
          let mess;
          let self = [];
          for(let key in taget){
            mess = taget[key];
            if(key == '-'){key = "未分配"}
            self.push({key,mess});
          }
          this.yuangong = self;

        }).catch(() => {
            this.$message.error('请求错误！');
        })
      },
      //勾选提交
      btnrure(){
        var json2 = {
          id:this.user1.id,
          imei:this.user1.imei,
          imei2:this.user1.imei2,
          user_id:this.ygradio,
          is_bind:1
        }
        devicesbind(json2).then(res => {
          this.dialogFormVisible = false;
          this.$message.success('绑定成功');
          this.reload();
        }).catch(() => {
            this.$message.error('请求错误！');
        })
        
      }
    }
  };
</script>