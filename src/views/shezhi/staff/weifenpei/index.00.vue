<template>
	<div>
		<div class="exam_structure">
			<el-input placeholder="输入关键字进行过滤" v-model="filterText">
			</el-input>
			<el-button type="primary" size="small" class="add_new_question" @click="add_new_question"><i></i>添加父节点</el-button>
		</div>
		<div class="question_info_lists">
			<el-tree ref="tree" :key="tree_key" :data="treeData" @node-click="btntree" node-key="id" :render-content="renderContent" :expand-on-click-node="false" :default-expanded-keys="defaultExpand" :filter-node-method="filterNode"></el-tree>
			<el-row class="add_question" v-show="add_question_flag">
				<el-col :span="12">
					<el-input v-model="new_question_name" placeholder="请输入大题名称"></el-input>
				</el-col>
				<el-col :span="12">
					<el-button size="mini" class="btn_sure" @click.stop="add_question_sure">确定</el-button>
					<el-button size="mini" class="btn_cancel" @click.stop="add_question_cancel">取消</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		name: "tree1",
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
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

				this.add_question_flag = true
			},
			add_question_sure() { //确定
				const nodeObj = {
					id: '',
					label: this.new_question_name,
					isEdit: false,
					children: []
				}
				this.treeData.push(nodeObj)
				this.add_question_flag = false
			},
			add_question_cancel() { //取消
				this.add_question_flag = false
				this.new_question_name = ''
			},
			// 增加
			append(store, node, data) {
				var maxid = '20'
				//新增数据
				const nodeapp = {
					id: ++maxid,
					label: '增加节点',
					isEdit: false,
					children: []
				}
				data.children.push(nodeapp)
				if(!node.expanded) {
					node.expanded = true
				}
				const parent = node.parent
				const children = parent.data
				const cIndex = children.findIndex(d => d.id === data.id)
				const tempChildrenNodex2 = children[cIndex] //拿到被添加的上一级
				console.log(tempChildrenNodex2.children[cIndex - 1])
			},
			// 修改
			nodeEdit(ev, store, data) {
				data.isEdit = true
				this.$nextTick(() => {
					const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
						!$input ? '' : $input.focus()
				})
			},
			edit_sure(ev, data) {
				const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
				if(!$input) {
					return false
				} else {
					data.label = $input.value
					data.isEdit = false
				}
			},
			// 节点删除
			nodeDelete(node, data) {
				const parent = node.parent
				const children = parent.data.children || parent.data
				const index = children.findIndex(d => d.id === data.id)
				children.splice(index, 1)
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
					<span>
            <span>{this.showOrEdit(data)}</span>
            <div class="tree_node_op" style="  float: right">
            <i class="el-icon-edit" on-click={(ev) => this.nodeEdit(ev, store, data)}></i>
            <i class="el-icon-delete" on-click={() => this.nodeDelete(node, data)}></i>
            <i class="el-icon-plus" on-click={() => this.append(store, node, data)}></i>
            </div>

          </span>
          )
			}
		},
		data() {
			return {
				filterText: '',
				treeData: [{
						id: 1,
						label: '一级 1',
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
								}, {
									id: 11,
									label: '三级 1-1-3',
									isEdit: false,
									children: []
								}]
							},
							{
								id: 12,
								label: '二级 1-2',
								isEdit: false,
								children: []
							},
							{
								id: 13,
								label: '二级 1-3',
								isEdit: false,
								children: []
							}
						]
					},
					{
						id: 2,
						label: '一级 2',
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
				],
				add_question_flag: false,
				new_question_name: '',
				tree_key: 0,
				defaultExpand: []
			}
		},
	}
</script>