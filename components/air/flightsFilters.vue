<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in data.options.airport" :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes" :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company" :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in planeSize" :key="index"
                    :label="item.table"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
            {{filterData}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default(){return {}}
        }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            //飞机大小
            planeSize:[
                {table:'大',size:'L'},
                {table:'中',size:'M'},
                {table:'小',size:'S'}
            ]
        }
    },
    computed:{
        filterData(){
            
           var arr = this.data.flights.filter(item=>{
               var bl = true
                //航空公司
                console.log(item)
                if(this.company && item.airline_name !== this.company){
                    bl = false
                }
                //飞机大小
                if(this.airSize && item.plane_size !== this.airSize){
                    bl = false
                }
                //出发机场
                if(this.airport && item.org_airport_name !== this.airport){
                    bl = false
                }
                if(this.flightTimes){
                    const [from,to] = this.flightTimes.split(",")
                    const dtime = item.dep_time.split(":")[0]
                    console.log(dtime,from,to)
                    if(+dtime<+from || +dtime>=+to){
                        bl = false
                    }
                }
                console.log(bl)
                return bl
            })
            this.$emit("setcacheflightsData",arr)
            return ""
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            console.log("2222",this.data,value)
            // var arr = this.data.flights.filter(v=>{
            //     return v.org_airport_name === value
            // })
            // this.$emit("setcacheflightsData",arr)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            // var list = value.split(",")
            // var arr = this.data.flights.filter(v=>{
            //     return +list[0]<= +v.dep_time.split(":")[0] && +v.dep_time.split(":")[0]<+list[1]
            // })
            // this.$emit("setcacheflightsData",arr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
        //    var arr = this.data.flights.filter(v=>{
        //         return v.airline_name === value
        //     })
        //     this.$emit("setcacheflightsData",arr)
        },

         // 选择机型时候触发
        handleAirSize(value){
        //    var arr = this.data.flights.filter(v=>{
        //         return v.plane_size === value
        //     })
        //     this.$emit("setcacheflightsData",arr)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            
        },
    },
    mounted(){
        console.log("111111111",this.data)
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>