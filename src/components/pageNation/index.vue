<template>
    <div class="pagenation">
        <el-pagination small  class="text-center" 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="page.page_index" 
            :page-sizes="pageSizes" 
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    } // 总条数
  },
  data() {
    return {
      pageSizes: [5, 10, 20, 50, 100],
      page: {
        page_index: 1,
        page_limit: 10
      }
    };
  },
  methods: {
    // // 每页查看条数变化
    handleSizeChange(val) {
      this.page.page_limit= val;
      this.$emit('pageChange', this.page);
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.page.page_index= val;
      this.$emit('pageChange', this.page);
    },
  },

}
</script>

<style>
 .el-pagination--small button, .el-pagination--small span:not([class*=suffix]) {
    height: 28px;
    line-height: 28px;
}
.el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child {
    border-color: transparent;
    font-size: 12px;
    line-height: 28px;
    height: 28px;
    min-width: 22px;
}
.el-pagination--small .el-pagination__editor, .el-pagination--small .el-pagination__editor.el-input .el-input__inner{
  height: 28px;
}
</style>
