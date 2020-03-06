<style scoped>
.el-tree{
  width: 300px;
}
</style>
<template>
  <div>
    <div class="custom-tree-container">
  <div class="block">
    <el-tree
      :data="data"
      @node-click="btntree"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :draggable="true"
      :render-content="renderContent">
    </el-tree>
  </div>
</div>
  </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        mingzi:'',
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
      //点击节点
      btntree(data,index){
        console.log(data.id);
      },
      //添加部门
      append(data) {
        console.log(this.mingzi)

        this.$prompt('部门名称', '添加部门', {
          confirmButtonText: '确认编辑',
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
        console.log(node, data)
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      //编辑
      bianji(data){
        const newChild = { id: id, label: this.mingzi, children: [] };
        if (!data) {
          this.$set(data, 'children', []);
        }
        console.log(data)
        let aaa = { id: 11, label: '你好' }
        // data.children.push({newChild});
        
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
              <el-button size="mini" type="text" on-click={ () => this.bianji(node, data, 1) }>编辑</el-button>
            </span>
          </span>);
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