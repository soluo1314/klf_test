<template>
  <div class="box">
    <div class="head">
      <h3>提交订单</h3>
    </div>
    <div class="section">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <img :src="item.img" />
          <div class="text">
            <p class="name">{{item.name}}</p>
            <p class="shuzi">x{{item.num}}</p>
          </div>
          <h3>￥{{item.price}}</h3>
        </li>
      </ul>
    </div>
    <div class="foot">
      <div class="left">
        <p>
          已优惠
          <span class="scx">￥{{cant}}</span>
        </p>
        <p>
          合计:￥
          <span class="price">{{sum}}</span>
        </p>
      </div>
      <div class="right">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      listData: [],
      sum: 0,
      cant: 0
    };
  },
  computed: {
    total() {
      if (this.$store.getters.total) {
        this.sum = this.$store.getters.total;
      } else {
        this.sum = 0;
      }
      return this.sum;
    }
  },
  mounted() {
    this.listData = this.$store.state.footList;
  }
};
</script>

<style style scoped lang='scss'>
.box {
  width: r(375);
  height: r(667);
  background-color: #fefefe;
  .head {
    position: relative;
    background-color: orange;
    height: r(30);
    h3 {
      font-size: r(16);
      font-weight: bold;
      color: #000;
      text-align: center;
      line-height: r(30);
    }
  }
  .section {
    width: 100%;
    margin-top: r(40);
    background-color: #fff;

    ul {
      padding: 0 r(20);
      padding-bottom: r(75);
      li {
        display: flex;
        margin-top: r(20);
        width: 100%;
        align-items: center;
        img {
          width: r(60);
          height: r(60);
        }
        .text {
          margin-left: r(10);
          width: r(170);
          .name {
            font-size: r(14);
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            height: r(40);
          }
          .shuzi {
            font-size: r(13);
            color: gray;
          }
        }
        h3 {
          margin-left: r(30);
          font-size: r(18);
          color: #000;
          line-height: r(30);
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: r(60);
    display: flex;
    line-height: r(60);
    position: fixed;
    bottom: 0;
    .left {
      text-align: center;
      flex: 1;
      background-color: #333;
      color: #fff;
      display: flex;
      font-size: r(14);
      justify-content: space-between;
      padding: 0 r(20);
      .scx {
        text-decoration: line-through;
      }
      .price {
        font-size: r(20);
      }
    }
    .right {
      text-align: center;
      width: 25%;
      background-color: orange;
      color: #000;
      font-size: r(18);
    }
  }
}
</style>
