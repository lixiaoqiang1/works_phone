<style scoped>
    .top_form .top_list{
        width: 220px;float: left;margin: 0 15px 10px 0;
    }
    .top_form .list_search{
        width: 300px;
    }
    .top_form .idbtn {
        width: 100px;
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .el-pagination{text-align: center;margin-top: 15px;}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
            <el-form class="top_form" ref="form">
                <div class="top_list">
                    <!-- 时间查询 -->
                    <datapicker2 v-on:dateValue="dateValue"></datapicker2>
                    <!-- 时间查询 -->
                </div>
                <div class="top_list">
                    <el-select v-model="department" placeholder="选择员工部门">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
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
                <el-table-column prop="isdate" label="日期"></el-table-column>
                <el-table-column prop="isphone" label="客户电话"></el-table-column>
                <el-table-column prop="aaa" label="发送/接收时间"></el-table-column>
                <el-table-column prop="smstype" label="短信类型"
                :filters="[{ text: '接收', value: '接收' },{ text: '发送', value: '发送' },]"
                :filter-method="filterTtype"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="sms_content" label="短信内容" width="300"></el-table-column>
                <el-table-column prop="username" label="员工姓名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="department_big" label="角色" 
                :filters="[{ text: '顾问', value: '顾问' },{ text: '部门主管', value: '部门主管' },{ text: '负责人', value: '负责人' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"></el-table-column>
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
import datapicker2 from '@/components/Datapicker2'
import {company, msgRecords } from '@/api/user'
  export default {
    components: {datapicker2},
    data() {
      return {
        dateValue1:'',//日期选择
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
        //部门渲染
        this.companys();
        //表格渲染
        this.handleUserList();
    },
    methods: {
        //日期选择
        dateValue: function (dateValue) {
            this.dateValue1 = dateValue;
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
            day_start:this.dateValue1,

            department:this.department1,
            loan_id:this.weixin,
            username:this.name,
            department:this.department1,
            beizhu:this.beizhu
          }
          //表格渲染
            msgRecords(json1).then(res => {
                this.userList = res.data.lists;
                this.total = res.data.total;    
                }).catch(() => {
                    this.$message.error('请求错误！');
            })
      },
    }
  };
</script>
