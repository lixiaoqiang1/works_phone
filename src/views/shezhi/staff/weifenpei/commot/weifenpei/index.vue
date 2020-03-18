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
    .yuangong_box .el-select {
        width: 100%;
    }
    .yuangong_box>>>.el-dialog{width: 480px;padding: 0 40px 0 0;}
    .caozuo a{color: #409EFF;margin-right: 5px;}
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
        <el-form class="top_form" ref="form">
          <el-input class="top_list" placeholder="搜索员工姓名" v-model="name">
              <template slot="prepend">姓名</template>
          </el-input>
          <el-input class="top_list" placeholder="搜索员工账号" v-model="loan_id">
              <template slot="prepend">账号</template>
          </el-input>
          <el-input class="top_list" placeholder="搜索员工微信号" v-model="beizhu">
              <template slot="prepend">微信号</template>
          </el-input>
          <el-input class="top_list" placeholder="搜索员工IMEI" v-model="IMEI">
              <template slot="prepend">IMEI</template>
          </el-input>
          <el-button class="top_list idbtn" type="primary" @click="search1">查询</el-button>
          <div class="clearfix"></div>
        </el-form>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column prop="type1" label="员工姓名"></el-table-column>
                <el-table-column prop="imei" label="部门"></el-table-column>
                <el-table-column prop="isip" label="角色"  ></el-table-column>
                <el-table-column prop="weizhi" label="账号"></el-table-column>
                <el-table-column prop="times1" label="微信"></el-table-column>
                <el-table-column prop="yuangong1" label="绑定账号IMEI"></el-table-column>
                <el-table-column prop="yuangong2" label="添加时间"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <div>
                            <span class="caozuo" v-if="scope.row.caozuo == 1">
                                <a @click="handlebtn1(scope.$index, scope.row)">编辑</a> 
                                <a @click="handlebtn2(scope.$index, scope.row)">手机解绑</a>
                            </span>
                            <span class="caozuo" v-if="scope.row.caozuo == 2">
                                <a @click="handlebtn1(scope.$index, scope.row)">编辑</a> 
                                <a @click="handlebtn3(scope.$index, scope.row)">绑定员工</a>
                            </span>
                            <el-dropdown class="caozuo" @command="handleCommand">
                                <a><i class="el-icon-more el-icon--right"></i></a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">离职</el-dropdown-item>
                                    <el-dropdown-item command="b">重置密码</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
        <el-dialog class="yuangong_box" title="编辑员工" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.names" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工账号" :label-width="formLabelWidth">
                    <el-input v-model="form.zhanghao" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择部门" :label-width="formLabelWidth">
                    <el-select v-model="form.bumen" placeholder="选择部门">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择角色" :label-width="formLabelWidth">
                    <el-select v-model="form.juese" placeholder="选择角色">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确认添加</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import pageNation from '@/components/pageNation/index'     // 引入分页
  export default {
    data() {
      return {
        loan_id:'',//微信号
        name:'',//昵称
        beizhu:'',//备注
        IMEI:'',
        search:'',//搜索
        search:'',//搜索
        total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: [],//table数据
        dialogFormVisible: false,
        form: {
            name_yuangong: '',
            zhanghao: '',
            bumen: '',
            juese: ''
        },
        formLabelWidth: '120px',
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
          if(this.name =='' & this.mobile=='' & this.loan_id=='' & this.IMEI==''){
              this.$message({message: '请输入搜索条件',type: 'warning'});
          }else{
              //表格渲染
              let json1 = {
                  loan_id:this.loan_id,
                  name:this.name,
                  beizhu:this.beizhu,
                  IMEI:''
              }
              console.log(json1)
          }
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
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
            _this.axios.get('/api/ruzhi1').then((res)=>{
                console.log(res.data.data);
                _this.userList = res.data.data
            }).catch((err)=>{
                console.log(err);
            })
      },
      //编辑
      handlebtn1(){
          console.log('11');
          this.dialogFormVisible = true;
      },
      handlebtn2(){
          console.log('22')
      },
      handlebtn3(){
          console.log('33')
      },
    }
  };
</script>