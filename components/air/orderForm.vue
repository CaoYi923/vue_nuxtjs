<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}航空意外险：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurances(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button><span>{{setMoney}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [],
      contactName: "",
      contactPhone: "",
      captcha: "",
      invoice: false,
      seat_xid: "",
      air: ""
    };
  },
  computed:{
      setMoney(){
          var money = 0
          console.log("1111111111111111111")
        if(!this.data.seat_infos.org_settle_price) return
          console.log("222222222222222222222")
          money += this.data.seat_infos.org_settle_price
          money += this.data.airport_tax_audlet
          money += this.insurances.length * 30
          money *= this.users.length
          var population = this.users.length
          var form ={
              money,
              population
          }
          this.$store.commit("air/setAllMoney",form)
          return ""
      }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    handleInsurances(id) {
      console.log(id);
      if (this.insurances.indexOf(id) === -1) {
        this.insurances.push(id);
      } else {
        this.insurances.splice(this.insurances.indexOf(id), 1);
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      var reg = /^1[3-9]\d{9}$/;
      if (reg.test(this.contactPhone)) {
        this.$store
          .dispatch("user/handleSendCaptcha", this.contactPhone)
          .then(res => {
            console.log(res.data.code);
            this.captcha = res.data.code;
            this.$alert(`您的验证码是：${res.data.code}`, "验证码", {
              confirmButtonText: "确定"
            });
          });
      } else {
        this.$message.error("请输入正确的手机号");
      }
    },

    // 提交订单
    handleSubmit() {
      var data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      console.log("2222", this.users, this.insurances, data);
      this.$axios({
        method: "post",
        url: "/airorders",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data
      }).then(res => {
        var { data } = res.data;
        console.log("ressssssssssss", data);
        this.$router.push({
            path:`/air/pay`,
            query:{
               id:data.id
            }
        })
      });
    }
  },
  mounted(){
      console.log("3333333333",this.data)
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>