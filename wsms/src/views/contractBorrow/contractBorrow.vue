<template>
    <div class="contractborrow">

        <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>借还记录</span>               
            </div>
             <!-- 添加记录 -->
            <div style="margin-top: 20px;text-align:left">
              <el-button @click="aflag = true">添加记录</el-button>
            </div>
            <!-- 记录表格内容 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"             
                style="width: 100%">

                <el-table-column
                    prop="contractname"
                    label="合同名称">
                </el-table-column>
                
                <el-table-column
                    prop="bname"
                    label="借用人">
                </el-table-column>

                <el-table-column
                    prop="bdate"
                    label="借用时间">                    
                </el-table-column>

                <el-table-column
                    prop="rstate"
                    label="归还状态">
                </el-table-column>

                <el-table-column
                    prop="rname"
                    label="归还接收人">
                </el-table-column>

                <el-table-column 
                    prop="rdate"                   
                    label="归还时间">                    
                </el-table-column>  

                 <el-table-column
                    fixed="right"
                    label="编辑"
                    width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleEdit(scope.row.id)">修改</el-button>
                     </template>
                </el-table-column>
            </el-table>

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

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑记录" :visible.sync="flag" width="500px">
              <el-form :model="editForm" label-width="100px">
                <!-- 归还状态 -->
                <el-form-item label="归还接收人">
                    <el-input type="text" v-model="editForm.rname"></el-input>
                </el-form-item>
                <!-- 归还状态 -->
                <el-form-item label="归还状态">
                    <el-select v-model="editForm.rstate" placeholder="归还状态">
                        <el-option label="未归还" value="未归还"></el-option>
                        <el-option label="已归还" value="已归还"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 归还时间 -->
                <el-form-item label="归还时间">
                     <el-date-picker
                        v-model="editForm.rdate"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              </el-form>
                <!-- 编辑提示弹出框 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="EditRecord">确 定</el-button>
              </div>
            </el-dialog>

            <!-- 添加弹出框 -->
            <el-dialog title="添加记录" :visible.sync="aflag" width="500px">
              <el-form :model="addForm" label-width="100px">
                  <el-form-item required label="合同名称" prop="contractname">
                    <el-input v-model="addForm.contractname"></el-input>
                </el-form-item>

                <el-form-item required label="借用人" prop="bname">
                    <el-input v-model="addForm.bname"></el-input>
                </el-form-item>

                <el-form-item required label="借用日期" >
                    <el-date-picker
                        v-model="addForm.bdate"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <!-- 归还状态 -->
                <el-form-item required label="归还状态">
                    <el-select v-model="addForm.rstate" placeholder="归还状态">
                        <el-option label="未归还" value="未归还"></el-option>
                        <el-option label="已归还" value="已归还"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="归还接收人" prop="rname" >
                    <el-input v-model="addForm.rname"></el-input>
                </el-form-item>              
                
                <!-- 归还时间 -->
                <el-form-item label="归还日期">
                     <el-date-picker
                        v-model="addForm.rdate"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              </el-form>
                <!-- 编辑提示弹出框 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="aflag = false">取 消</el-button>
                <el-button type="primary" @click="AddRecord()">确 定</el-button>
              </div>
            </el-dialog>            

        </el-card>
    </div>
</template>
<script>

export default {
    created() {//生命周期的钩子函数  自动触发 组件实例创建完成 dom还没有绑定
       this.getRecordsByPage();//获取数据
    },
    data() {
      return {
        tableData:[],
        editForm:{            
            rstate:'',
            rdate:'',
            rname:'',
        },
        addForm:{
            contractname:'',
            bname:'',
            bdate:'',
            rname:'',
            rstate:"",
            rdate:"",
        },
        multipleSelection:[],       
        currentPage:1,
        pageSize:3,
        total:1,
        flag:false,
        aflag:false,
        editRecordId:1,
      }
    },
    methods:{
        //根据分页获取数据        
        getRecordsByPage(){
            let params = {
                pageSize:this.pageSize,
                currentPage:this.currentPage,
            }
            this.requset.post('/contract/getRecordsByPage',params)
            .then(response=>{
                let {total,data} = response;
                 //判断当前页是否有数据 且不是为第一页
                if( data.length == 0 &&  this.currentPage != 1){
                    console.log(pageSize,currentPage)
                    this.currentPage -= 1; //显示前一页数据
                    this.getRecordsByPage();
                }else{
                    this.total = total;
                    this.tableData = data;
                }             
            })
            .catch(err=>{
            console.log(err);
            })
        },
        //记录修改 获取记录id和数据
        handleEdit(index, row) {
            console.log(index);
            this.editRecordId = index;
            this.flag = true; //打开弹出框
            //发送axios 获取对应数据资料 并填入弹出框
            this.requset.get(`/contract/getSignRecord?`,{rid:this.editRecordId })
            .then(response=>{
                console.log(response[0]);
                
                this.editForm.rname = response[0].rname;
                this.editForm.rstate = response[0].rstate;
                this.editForm.rdate = response[0].rdate;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        //编辑
        EditRecord(){
            this.flag = false;
            let params = {
                rname : this.editForm.rname,
                rstate : this.editForm.rstate,
                rdate: this.editForm.rdate,
                rid: this.editRecordId,
            }
            console.log(params);
            
            //发送axios 修改数据并重新加载页面数据
            this.requset.post('/contract/editRecord',params)
            .then(response=>{
                let {res_code,msg} = response;
                if (res_code === 1) {
                    this.editForm.rstate='';
                    this.editForm.rdate='';
                    this.editRecordId='';
                    this.getRecordsByPage();
                } else {
                    this.$message.error(msg);
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }, 
        //添加记录
        AddRecord(){
            this.aflag = false; //关闭弹出框
            let params = {
                contractname:this.addForm.contractname,
                bname:this.addForm.bname,
                bdate:this.addForm.bdate,
                rname:this.addForm.rname,
                rstate : this.addForm.rstate,
                rdate: this.addForm.rdate,
            }
            console.log(params);
            //发送axios 获取对应用户的数据资料 getSignAccount 并填入弹出框
            this.requset.post('/contract/addrecord',params)
            .then(response=>{;
                console.log(response);                
            })
            .catch(err=>{
            console.log(err);
            })
            
        },   
        //每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getRecordsByPage();
        },
        //当前页码
        handleCurrentChange(val) {
           this.currentPage = val;
            this.getRecordsByPage();
        },
        
    },
}
</script>
<style lang="less">
.contractborrow{
    .delete_div{
        .el-input{
            width: 200px;
            margin-left: 10px;
        }
    }
    .el-table{
        margin-top: 20px;        
    }
    .el-dialog{
        .el-dialog__body{
            padding: 20px;
            .el-form-item{
                width:400px;
                padding: 5px;
                .el-input__inner,.el-date-editor--date{
                        width: 300px;
                }
            }         
        }
        .el-dialog__footer{
            text-align: center;
            padding: 10px 20px 30px;
        }
    }
    

}
    
</style>