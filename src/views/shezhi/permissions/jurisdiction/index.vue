<style scoped>
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
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
              <el-table-column prop="follow_up" label="角色名称"  ></el-table-column>
              <el-table-column prop="qun_num" label="全局设置"></el-table-column>
              <el-table-column prop="add_num" label="主要模块权限"></el-table-column>
              <el-table-column label="权限操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick1(scope.row)" type="text" size="small">权限配置</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick2(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleClick3(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <!-- 表格end -->
        <el-button type="primary" round @click="btnadd">添加角色</el-button>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        userList: []//table数据
      };
    },
    inject:['reload'],//刷新当前页
    created: function () {
        //表格渲染
        this.handleUserList();
    },
    methods: {
      handleClick(row){
          console.log(row);
      },
      handleUserList() {
          //表格渲染
            let _this = this;
            _this.axios.get('/api/qun1').then((res)=>{
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
      },
      handleClick1(){
        this.$router.push({path:'configuration',query:{aa:'121'}}); 
      },

      //添加角色
      btnadd(){
        this.$prompt('角色名称', '添加角色', {
          confirmButtonText: '确认添加',
          // cancelButtonText: '取消',inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,inputErrorMessage: '格式不正确'
        }).then(({ value }) => {
          console.log(value);
          this.$message({type: 'success',message: '角色名称 ' + value});
        }).catch(() => {
          this.$message({type: 'info',message: '取消输入'});       
        });
      },

      //编辑角色
      handleClick2(row){
        console.log(row.id);
        this.$prompt('角色名称', '编辑角色', {
          confirmButtonText: '确认编辑',
          inputValue:row.id,  //输入框的初始内容
          // cancelButtonText: '取消',inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,inputErrorMessage: '格式不正确'
        }).then(({ value }) => {
          console.log(value);
          this.$message({type: 'success',message: '角色名称 ' + value});
        }).catch(() => {
          this.$message({type: 'info',message: '取消输入'});       
        });
      },

      //删除角色
      handleClick3(row){
        console.log(row.id);
      },
    }
  };
</script>