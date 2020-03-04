<style scoped>
    .top_form .top_list{
        width: 220px;float: left;margin-right: 15px;
    }
    .top_form .datefirst{
      width: 350px
    }
    .top_form .idbtn{
        width: 100px;
    }
    .top_form .list_search{
        width: 300px;
    }
    .coment{
      border-top: 1px #ddd solid;margin-top: 20px;
    }
    .coment h5{
      text-align: center;color: blue;padding: 0;font-size: 16px;line-height: 50px;
    }
    .coment .col_left{
      border-right: 1px #ddd solid;
    }
    .head{
      border-top: 2px blue solid;
    }
    .head li{
      width: 100%;padding: 10px;cursor: pointer;
    }
    .head li:hover{
      background: #f6f6f6;
    }
    .head li .pic{
      float: left;background: #dddddd;width: 60px;height: 60px;border:1px #ddd solid;margin-right: 10px;border-radius: 4px;
    }
    .head span{
      line-height: 60px; 
    }
    .elcol-text{
      padding: 15px;
    }
    .ul-text .text-left{
      width: 100%;display: block;position: relative;margin-bottom: 35px;
    }
    .ul-text .text-left img{
      width: 100%;
    }
    .text-left .r-head{
      width: 60px;position: absolute;left: 0;top: 0;border-radius: 4px;overflow: hidden;
    }
    .text-left .text1{
      padding-left: 80px;
    }
    .text-left .text1 .text-item1{
      font-size: 14px;color: #666;margin-bottom: 10px;
    }
    /* .text-left .text1 .text-item2{
      padding: 10px;
    } */
    .text-left .text1 .text-item2 a{
      font-size: 14px;background: #eee;display: inline-block;padding: 10px;border-radius: 4px;
    }
    .text-left .text1 img{
      max-height: 150px;width: auto;;
    }
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
          <el-form class="top_form" ref="form">
              <!-- 时间查询 -->
              <datapicker class="top_list datefirst" v-on:dateValue="dateValue"></datapicker>
              <!-- 时间查询 -->
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
        <div class="coment">
          <el-row>
            <el-col class="col_left" :span="6">
              <h5>群成员列表</h5>
              <ul class="head">
                <li v-for="(arr,index) in array" :key="index" :data-id='arr.id' @click="btntab(arr.id)">
                  <div class="pic"></div>
                  <span>{{arr.text}}</span>
                </li>
              </ul>
            </el-col>
            <el-col class="elcol-text" :span="18">
              <ul class="ul-text">
                <li class="text-left">
                  <div class="r-head">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                  </div>
                  <div class="text1">
                    <p class="text-item1"><a>向梓曈资质不符</a><span>2019/12/04  12:50</span></p>
                    <!-- <div class="text-item2"><span>他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据评分过低</span></div> -->
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                  </div>
                </li>
                <li class="text-left">
                  <div class="r-head">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                  </div>
                  <div class="text1">
                    <p class="text-item1"><a>向梓曈资质不符</a><span>2019/12/04  12:50</span></p>
                    <div class="text-item2"><a>他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据他找了好几家都给拒了，平安普惠凤金大数据评分过低</a></div>
                    <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"> -->
                  </div>
                </li>
                <li class="text-left">
                  <div class="r-head">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                  </div>
                  <div class="text1">
                    <p class="text-item1"><a>向梓曈资质不符</a><span>2019/12/04  12:50</span></p>
                    <div class="text-item2"><a>他找了好几家都给拒</a></div>
                    <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"> -->
                  </div>
                </li>
                <li class="text-left">
                  <div class="r-head">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                  </div>
                  <div class="text1">
                    <p class="text-item1"><a>向梓曈资质不符</a><span>2019/12/04  12:50</span></p>
                    <div class="text-item2"><a>他找了好几家都给拒</a></div>
                    <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"> -->
                  </div>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!-- 表格end -->
    </div>
</template>
<script>
import datapicker from '@/components/Datapicker'
  export default {
    data() {
      return {
        loan_id:'',//微信号
        name:'',//昵称
        beizhu:'',//备注
        search:'',//搜索
        array:[
          {id:12,text:'张三张三张三',},
          {id:42,text:'李四李四李四',},
          {id:66,text:'王五王五王五',},
        ]
      };
    },
    components: {datapicker },
    inject:['reload'],//刷新当前页
    created: function () {},
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
          }
      },
      dateValue: function (dateValue) {
        console.log(dateValue);
        console.log('1212')
      },
      //获取值
      btntab(e){
        console.log(e);
      }
      
    }
  };
</script>