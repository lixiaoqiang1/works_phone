<style scoped>
.callvoice{
  position: relative;
}
.callvoice>>>.trees{
  width: 250px;position: absolute; left: 0;
}
.callvoice>>>.el-tree-node__content{
  height: 34px;
}
.callvoice>>>.isicon{
  padding: 0 2px;
}
.cont{
  padding-left: 260px;
}
</style>
<template>
  <div class="callvoice">
    <div class="trees callvoice padding10">
      <el-tree
        :data="data"
        @node-click="btntree"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="isicon">
            <i class="el-icon-plus" @click="() => append(data)"></i> 
            <i class="el-icon-delete" @click="() => remove(node, data)"></i> 
            <i class="el-icon-edit" @click="() => bianji(node, data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="cont">
      <div class=" callvoice padding10">
        <unabsorbed></unabsorbed>
      </div>
    </div>
  </div>
</template>

<script>
import unabsorbed from '@/views/shezhi/staff/weifenpei/commot/unabsorbed'
  let id = 1000;

  export default {
    components: {unabsorbed},
    data() {
      const data = [{
        id: 1,
        label: '员工管理',
        children: [
          {
            id: 4,
            label: '速贷中心',
            children: [{
              id: 9,
              label: '一级部门1'
            }, {
              id: 10,
              label: '一级部门2'
            }]
          },
          {
            id: 5,
            label: '离职部门',
            children: [{
              id: 8,
              label: '一级部门1'
            }, {
              id: 4,
              label: '一级部门2'
            }]
          }
        ]
      }];
      return {
        mingzi:'',
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data))
      }
    },
    inject:['reload'],
    methods: {
      //点击节点
      btntree(data,index){
        console.log(data.id);
      },
      
      //添加部门
      append(data) {
        console.log(this.mingzi)

        this.$prompt('部门名称', '添加部门', {
          confirmButtonText: '确认',
          inputValue:'新建栏目',  //输入框的初始内容
        }).then(({ value }) => {
          console.log(value);
          this.mingzi = value;
          const newChild = { id: id++, label: this.mingzi, children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);

        });

        
      },
      //删除
      remove(node, data) {
        this.$confirm('确认删除部门?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      //编辑
      bianji(data){
        this.reload();
        // const newChild = { id: id, label: '李晓强' };
        // if (!data) {
        //   this.$set(data, 'children', []);
        // }
        // console.log(data)
        // let aaa = { id: 11, label: '你好' }
        // data.children.push({newChild});
        
      }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>