<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <orderForm :data="data"></orderForm>

            <!-- 侧边栏 -->
            <div class="aside">
                <orderAside :data="data"></orderAside>     
            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm'
import orderAside from '@/components/air/orderAside'
export default {
    data(){
        return{
            data:{
                seat_infos:{}
            }
            // infodata:{
                
            // }
        }
    },
    components:{
        orderForm,orderAside
    },
    mounted(){
        var {id,seat_xid} = this.$route.query
        console.log(id,seat_xid)
        this.$axios({
            url:`/airs/${id}`,
            params:{
                seat_xid
            }
        }).then(res=>{
            console.log("res",res)
            this.data = res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>