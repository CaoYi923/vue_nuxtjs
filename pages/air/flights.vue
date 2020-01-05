<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <flightsFilters :data="cacheflightsData" @setcacheflightsData="setcacheflightsData"></flightsFilters>
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                <headers></headers>
                </div>
                
                <!-- 航班信息 -->
                <div>
                    <flightsItem  v-for="(item,index) in flightsList" :key="index" :data="item"></flightsItem>
                    
                </div>
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="flightsData.total">
                </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <flightsAside></flightsAside>
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import headers from '@/components/air/flightsListHead'
import flightsItem from '@/components/air/flightsItem'
import flightsFilters from '@/components/air/flightsFilters'
import flightsAside from '@/components/air/flightsAside'
export default {
    data(){
        return {
            pageSize:5,
            currentPage:1,
            currentPage4: 1,
            total:0,
            flightsData:{
                info:{},
                options:{},
                flights:[]
            },
            cacheflightsData:{
                info:{},
                options:{},
                flights:[]
            }
            // info:{},
            // options:{},
            //  flightsList:[]
        }
    },
    components:{
        headers,flightsItem,flightsFilters,flightsAside
    },
    computed:{
        flightsList(){
            if(!this.flightsData.flights) return []
            return this.flightsData.flights.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    methods:{
        setcacheflightsData(arr){
                this.flightsData.flights = arr;
                this.flightsData.total = arr.length
        },
        handleSizeChange(index){
            this.pageSize = index
            // this.flightsList = this.flights.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        },      //pageSize 改变时会触发
        handleCurrentChange(index){
            this.currentPage = index
            // this.flightsList = this.flights.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }    //currentPage 改变时会触发
    },
    mounted(){
        // console.log(this.$route.query)
        this.$axios({
             url:'/airs',
             params:this.$route.query
           }).then(res=>{
             const {flights,info,options,total} = res.data
             setTimeout(()=>{
                this.flightsData = res.data
                this.cacheflightsData = {...res.data}
                // this.flightsList = this.flights.slice(0,5)



                // this.info = info
                // this.options = options
                // this.total = total
             },1)
            
           })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>