<template>
  <div class="info">
    <card></card>
    <div class="tab">
      <div class="bigbox">
        <div v-for="(el,index) in tabName" :key="index" class="box" @click="changeTab(index)">
          <span :class="{active:Num==index}">{{el}}</span>
        </div>
      </div>
      <xuangou v-if="Num==0"></xuangou>
      <pingjia v-if="Num==1"></pingjia>
      <shangjia v-if="Num==2"></shangjia>
    </div>
  </div>
</template>
<script>
import card from "@/components/card";
import xuangou from "@/components/xuangou";
import pingjia from "@/components/pingjia";
import shangjia from "@/components/shangjia";
export default {
  components: {
    card,
    xuangou,
    pingjia,
    shangjia
  },
  data() {
    return {
      current: "homepage",
      bool: false,
      Num: 0,
      tabName: ["选购", "评价", "商家"]
    };
  },
  methods: {
    handleChange(detail) {
      this.current = detail.key;
    },
    changeTab(index) {
      this.Num = index;
    }
  }
};
</script>
<style scoped lang='scss'>
.info {
  width: r(375);
  height: r(667);
}
.tab {
  width: r(375);
  height: r(567);
  font-size: 16px;
}
.bigbox {
  display: flex;
  height: 38px;
  width: 100%;
}
.box {
  text-align: center;
  width: 33.333%;
  color: #676767;
  line-height: 36px;
  height: 36px;
  border-bottom: r(1.25) solid #fff;
  /* box-sizing: border-box; */
}
span {
  padding: 0 11.7px;
  display: inline-block;
  height: 100%;
}
.active {
  color: #373737;
  font-weight: 700;
  border-bottom: r(2.5) solid #f87a7c;
}
</style>
