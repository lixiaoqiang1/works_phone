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
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
            <el-form class="top_form" ref="form">
                <h4>监控行为设置 <el-button style="float:right" type="primary">保存</el-button></h4>
                <div>
                    <el-button>微信发送转账1</el-button>
                    <el-button>微信发送转账2</el-button>
                    <el-button>微信发送转账3</el-button>
                </div>
                <!-- <div class="top_list">
                    <el-date-picker
                    v-model="selectdata1"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="top_list">
                    <el-select v-model="department" placeholder="选择员工部门">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="top_list list_search">
                    <el-input placeholder="搜索员工姓名" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div> -->
            <div class="clearfix"></div>
          </el-form>
        <!-- 头部菜单end -->

        <!-- 表格 -->
        <div class="table">
            <div>
                <span>敏感词设置</span>
                <el-button style="float:right" type="primary">添加敏感词</el-button>
            </div>
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column prop="start_time" label="敏感词"></el-table-column>
                <el-table-column prop="beizhu" label="创建者"></el-table-column>
                <el-table-column prop="isdate" label="时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
    </div>
</template>
<script>
  export default {
    data() {
      return {
        selectdata1:'',//日期选择
        department: '',//员工部门
        loan_id:'',//微信号
        name:'',//昵称
        beizhu:'',//备注
        search:'',//搜索
        options: [
            { value: '部门一',label: '部门一'}, 
            {value: '部门二',label: '部门二'}
        ],
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
    methods: {
        //查看
        handleClick(row) {
            console.log(row);
        },
        //表导航筛选
        //通话类型
        filterTtype(value, row) {
            return row.type === value;
        },
        //角色
        filterTag(value, row) {
            return row.role === value;
        },
        //是否接通
        filterjt(value, row) {
            return row.through === value;
        },
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
            _this.axios.get('/api/tonghua').then((res)=>{
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