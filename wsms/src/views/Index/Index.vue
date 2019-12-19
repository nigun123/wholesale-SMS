<template>
    <div class="index">
       
       <el-container>
            <el-aside width="200px">
                <!-- 自定义Nav组件 -->
                <Nav></Nav>
            </el-aside>

            <!-- 右侧内容 -->
            <el-container>
                <el-header>
                    <Top></Top>
                </el-header>

                <el-main>
                    <router-view />
                </el-main>

                <!-- <el-footer>
                    <Bottom></Bottom>
                </el-footer> -->
            </el-container>
        </el-container>

    </div>
</template>
<script>
//引入组件
import Nav from '@/components/Nav/Nav'
import Top from '@/components/Top/Top'
// import Bottom from '@/components/Bottom/Bottom'
export default {
    components:{ //注册组件
        Nav,
        Top,
        // Bottom
    },
};
</script>
<style lang="less">
    .index {
        height: 100%;
        .el-container {
            height: 100%;
            .el-header,
            .el-footer {
                background-color: #fff;
                color: #333;
                text-align: center;
                line-height: 60px;
            }

            .el-aside {
                background-color: #d3dce6;
                color: #333;
                text-align: center;
                line-height: 200px;
                
            }

            .el-main {
                background-color: #e9eef3;
                color: #333;
                text-align: center;
            }
        }
    }
</style>
