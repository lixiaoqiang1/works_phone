<style scoped>
.callvoice{
  position: relative;
}
.callvoice>>>.trees .el-menu-item{
	padding: 0!important;
}
.callvoice>>>.trees .el-submenu__title{
	padding: 0!important;
}
.callvoice .el-menu{
	border-right: 0;
}
.callvoice>>>.trees{
  width: 250px;position: absolute; left: 0;
}
.callvoice>>>.el-tree-node__content{
  height: 44px;font-size: 14px;
}
/* .callvoice>>>.tree_node_op{
  margin-left: 10px;
} */
.callvoice>>>.tree_node_op i{
  padding: 0 3px;font-size: 15px;
}
.cont{
  padding-left: 260px;
}
.exam_structure{
	width: 100%;
}
.exam_structure button{
	width: 100%;
}
</style>
<template>
	<div class="callvoice">
		<div class="trees callvoice padding10">
			<el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
				<el-menu-item index="未分配">
					<i class="el-icon-menu"></i>
					<span slot="title">未分配部门员工</span>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title">
					<i class="el-icon-location"></i>
					<span>速贷中心</span>
					</template>
					<el-tree ref="tree" :key="tree_key" :data="treeData" @node-click="btntree" node-key="id" :render-content="renderContent" :expand-on-click-node="false" :default-expanded-keys="defaultExpand" :filter-node-method="filterNode"></el-tree>
				</el-submenu>
				<el-menu-item index="离职员工">
					<i class="el-icon-setting"></i>
					<span slot="title">离职员工</span>
				</el-menu-item>
			</el-menu>
			<div class="exam_structure">
				<el-button type="primary" size="small" class="add_new_question" @click="add_new_question"><i class="el-icon-plus"></i> 添加部门</el-button>
			</div>
		</div>
		<div class="cont">
			<div class=" callvoice padding10">
				<weifenpei v-if="activetype === 'A1'"></weifenpei>
				<unabsorbed v-if="activetype === 'A2'"></unabsorbed>
				<lizhi v-if="activetype === 'A3'"></lizhi>
				<!-- <router-view/> -->
			</div>
		</div>
	</div>
</template>
<script>
import weifenpei from '@/views/shezhi/staff/weifenpei/commot/weifenpei'
import unabsorbed from '@/views/shezhi/staff/weifenpei/commot/unabsorbed'
import lizhi from '@/views/shezhi/staff/weifenpei/commot/lizhi'
	let maxid = 500;
	export default {
    name: "tree1",
    components: {weifenpei,unabsorbed,lizhi},
		data() {
			return {
				activetype:'A1',
				activeIndex: '1',
				treeData: [
					{
						id: 2,
						label: '部门1',
						isEdit: false,
						children: [
							{id: 5,label: '二级 2-1',isEdit: false}
						]
					}
				],
				add_question_flag: false,
				new_question_name: '',
				tree_key: 0,
				defaultExpand: []
			}
    },
    methods: {
		handleSelect(key, keyPath) {
		if(key == '未分配'){
			console.log('111');
			this.activetype = 'A1'
			// this.$router.push({ name:'lizhi2'})
		}
		if(key == '离职员工'){
			this.activetype = 'A3'
			console.log('222');
		}
      },
		//点击节点
		btntree(data,index){
			this.activetype ="A2" 
			console.log(data.id);
		},
		filterNode(value, data) {
			if(!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		// 添加新大题
		add_new_question() {
			this.$prompt('部门名称', '添加部门', {
			confirmButtonText: '确认',
			inputValue:'新建栏目',  //输入框的初始内容
			}).then(({ value }) => {
			this.new_question_name = value;
			const nodeObj = {id: '',label: this.new_question_name,isEdit: false,children: []}
			this.treeData.push(nodeObj)
			this.add_question_flag = false
			}).catch(() => {
			this.new_question_name = ''
			this.$message({
				type: 'info',
				message: '已取消'
			}); 
			}); 
		},
		// 增加
		append(store, node, data) {
			this.$prompt('部门名称', '添加部门', {
				confirmButtonText: '确认',
				inputValue:'新建栏目',  //输入框的初始内容
				}).then(({ value }) => {
				console.log(value);
				//新增数据
				const nodeapp = {id: maxid++,label: value,isEdit: false,children: []}
				data.children.push(nodeapp)
				if(!node.expanded) {
					node.expanded = true
				}
				const parent = node.parent
				const children = parent.data
			});
		},
		// 修改
		nodeEdit(ev, store, data) {
			this.$prompt('部门名称', '部门名称', {
			confirmButtonText: '确认',
			inputValue:data.label,  //输入框的初始内容
			}).then(({ value }) => {
			console.log(value);
			data.label = value
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		// 节点删除
		nodeDelete(node, data) {
			this.$confirm('确认删除部门?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
			const parent = node.parent
					const children = parent.data.children || parent.data
					const index = children.findIndex(d => d.id === data.id)
					children.splice(index, 1)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
				
		},
		showOrEdit(data) {
			if(data.isEdit) {
				return <input type="text" value={data.label} on-blur={ev => this.edit_sure(ev, data)}/>
			} else {
				return <span className="node_labe">{data.label}</span>
			}
		},
		// 结构树操作group node,
		renderContent(h, {node,data,store}) {
			return(
				<span style="width:100%">
					<span>{this.showOrEdit(data)}</span>
					<div class="tree_node_op" style="float: right">
					<i class="el-icon-plus" on-click={() => this.append(store, node, data)}></i>
					<i class="el-icon-delete" on-click={() => this.nodeDelete(node, data)}></i>
					<i class="el-icon-edit" on-click={(ev) => this.nodeEdit(ev, store, data)}></i>
					</div>
				</span>
			)
		}
	},
}
</script>