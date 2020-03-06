<style scoped>
    .top_form .top_list{
        width: 220px;float: left;margin: 0 15px 10px 0;
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .table h5{
        text-align: center;line-height: 24px;padding: 10px;font-size: 16px;
    }
    .dtl li:first-child{
        border-top: 1px #eee solid;
    }
    .dtl li{
        border-bottom: 1px #eee solid;padding: 15px 0;
    }
    .dtl li p{
        line-height: 22px;
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
                <!-- 时间查询 -->
                <datapicker v-on:dateValue="dateValue"></datapicker>
                <!-- 时间查询 -->
            </div>
          </el-form>
          <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <div>
                <h5>朋友圈内容</h5>
                <ul class="dtl">
                    <li>
                        <p>新版征信报告还有4天正式实行[微笑][微笑] 不是我催你 更不是银行在催你[微笑][微笑][微笑] 只是想告诉你咱们国家政策的力度 听话：且贷且珍惜[微笑][微笑][微笑]</p>
                    </li>
                    <li>
                        <p>新版征信报告还有4天正式实行[微笑][微笑] 不是我催你 更不是银行在催你[微笑][微笑][微笑] 只是想告诉你咱们国家政策的力度 听话：且贷且珍惜[微笑][微笑][微笑]</p>
                    </li>
                    <li>212</li>
                    <li>212</li>
                </ul>
            </div>
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
import datapicker from '@/components/Datapicker'
  export default {
    components: {datapicker},
    data() {
      return {
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
      //日期选择
      dateValue: function (dateValue) {
        console.log(dateValue);
        console.log('1212')
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