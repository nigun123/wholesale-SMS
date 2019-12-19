<template>
    <div class="contractmanage">
        <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>合同管理</span>               
            </div>

            <!-- 模糊查询 -->
            <div style="text-align:left">
                <!-- 搜索框 -->
                    <el-form :inline="true" :model="searchForm" class="demo-form-inline">                            
                        <el-form-item label="关键字">
                            <el-input v-model="searchForm.keyWord" placeholder="合同名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchC">查询</el-button>
                        </el-form-item>
                    </el-form>
            </div>   
            
            <!-- 表格内容 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"             
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                
                <el-table-column
                    prop="contractname"
                    label="合同名称">
                </el-table-column>

                <el-table-column
                    prop="partyA"
                    label="甲方">
                </el-table-column>

                <el-table-column
                    prop="contractamount"
                    label="合同金额(元)">
                </el-table-column>

                <el-table-column                    
                    label="签订日期">
                     <!-- 日期处理 momentJs -->
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime}}</template>
                </el-table-column>               
                
                <el-table-column
                    fixed="right"
                    label="编辑">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                     </template>
                </el-table-column>
            </el-table>

            <!--  批量删除 -->
            <div  class="delete_div" style="margin-top: 20px; text-align:left">
                <el-button @click="batchDelete()">批量删除</el-button>
                <el-button @click="unSelect()">取消选择</el-button>
            </div>

            <!-- 分页 -->
            <div class="block">                
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="this.currentPage"
                    :page-sizes="[1, 3, 5, 7]"
                    :page-size="this.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.total">
                </el-pagination>
            </div>

        </el-card>
    </div>
</template>
<script>
import moment from 'moment';//引入时间处理模块

export default {
    created() {//生命周期的钩子函数  自动触发 组件实例创建完成 dom还没有绑定
    //    this.getAccountByPage();//获取数据
    },
    data() {
      return {
        tableData:[
            {
                id:1,
                date: '2016-05-03',
                contractname: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX合同',
                contractamount:'25689.00',
                partyA: 'XXXXXXXXXXXXXXXXXXXXXXX公司'
            },
        ],
        multipleSelection:[],
        searchForm:{
            keyWord:'',
        },
        currentPage:1,
        pageSize:1,
        total:1,
      }
    },
    methods:{
        //取消选择
        unSelect(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {//当单选框选中状态发生变化 触发此函数 
            this.multipleSelection = val; //val是选中的数据   是一个数组
        },
        // 批量删除
        batchDelete(){
           if(!this.multipleSelection.length)
           {
               console.log("没有选择数据");
                return;
           }else{
               console.log(this.multipleSelection);
               let selectId = this.multipleSelection.map(obj =>obj.id);
               console.log(selectId)
           }

        },
        //合同编辑
        handleEdit(index, row) {
            console.log(index);
        },
        //单个删除
        handleDelete(index, row) {
            console.log(index);
        },
        //按关键字搜索
        searchC(){
            console.log('按关键字搜索');
        },
        //每页条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //当前页码
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    filters:{//过滤器
        filterCtime(ctime){
            return moment(ctime).format('YYYY-MM-DD');
        }
    }
}
</script>
<style lang="less">
.contractmanage{
    .delete_div{
        .el-input{
            width: 200px;
            margin-left: 10px;
        }
    }
    .el-table{
        margin-top: 20px;
    }

}
    
</style>


