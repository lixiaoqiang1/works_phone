<style scoped>
.callvoice{
  position: relative;
}
.callvoice>>>.trees{
  width: 250px;position: absolute; left: 0;
}
.callvoice>>>.el-tree-node__content{
  height: 44px;
}
.callvoice>>>.tree_node_op{
  margin-left: 10px;
}
.callvoice>>>.tree_node_op i{
  padding: 0 3px;
}
.cont{
  padding-left: 260px;
}
</style>
<template>
	<div class="callvoice">
		<div class="trees callvoice padding10">
			<el-tree ref="tree" :key="tree_key" :data="treeData" @node-click="btntree" node-key="id" :render-content="renderContent" :expand-on-click-node="false" :default-expanded-keys="defaultExpand" :filter-node-method="filterNode"></el-tree>
      <div class="exam_structure">
        <el-button type="primary" size="small" class="add_new_question" @click="add_new_question"><i></i>添加父节点</el-button>
      </div>
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
	let maxid = 500;
	export default {
    name: "tree1",
    components: {unabsorbed},
		data() {
			return {
				treeData: [{
						id: 1,
						label: '未分配员工',
						isEdit: false,
						children: [{
								id: 4,
								label: '二级 1-1',
								isEdit: false,
								children: [{
									id: 9,
									label: '三级 1-1-1',
									isEdit: false,
									children: []
								}, {
									id: 10,
									label: '三级 1-1-2',
									isEdit: false,
									children: []
								}]
							},
						]
					},
					{
						id: 2,
						label: '速贷中心',
						isEdit: false,
						children: [{
							id: 5,
							label: '二级 2-1',
							isEdit: false,
							children: []
						}, {
							id: 6,
							label: '二级 2-2',
							isEdit: false,
							children: []
						}]
					},
					{
						id: 3,
						label: '离职员工',
						isEdit: false,
						children: [{
							id: 7,
							label: '二级 2-1',
							isEdit: false,
							children: []
						}]
					},
				],
				add_question_flag: false,
				new_question_name: '',
				tree_key: 0,
				defaultExpand: []
			}
    },
    methods: {
		//点击节点
		btntree(data,index){
			console.log(data.id);
		},
		filterNode(value, data) {
			if(!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		// 添加新大题
		add_new_question() {
			// this.add_question_flag = true
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