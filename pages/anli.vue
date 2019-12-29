<template>
  <div class="box">
    <div class="btn">
      <span v-for="(item,index) in arr" :key="index" @click="btn(index)" :class="{'span':index1==index}">{{item}}</span>
    </div>
    <div v-if="index1 === 0">
      <ul>
        <li>新闻1</li>
        <li>新闻2</li>
        <li>新闻3</li>
      </ul>
    </div>
    <div v-else-if="index1 === 1">
      <ul>
        <li>体育1</li>
        <li>体育2</li>
        <li>体育3</li>
      </ul>
    </div>
    <div v-else-if="index1 === 2">
      <ul>
        <li>娱乐1</li>
        <li>娱乐2</li>
        <li>娱乐3</li>
      </ul>
    </div>
    <div v-else-if="index1 === 3">
      <ul>
        <li>电竞1</li>
        <li>电竞2</li>
        <li>电竞3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index1:0,
      arr: ["新闻", "体育", "娱乐", "电竞"],
      span:""
    };
  },
  methods: {
    btn(index) {
        this.index1 = index
    }
  }
};
</script>
<style lang="less" scoped>
.span{
    color: red;
}
</style>