<template>
  <div class="box goods_content">
    <scroll-view scroll-y class="cont_title">
      <ul>
        <div></div>
        <li
          v-for="(item,index) in goodsList"
          :key="index"
          :class="{choose:currentNum==index}"
          @click="sel(item,index)"
        >
          <span>{{item.typeName}}</span>
          <i v-show="item.num!==0">{{item.num}}</i>
        </li>
      </ul>
    </scroll-view>
    <scroll-view
      scroll-y
      class="content"
      :scroll-into-view="scrollId"
      scroll-with-animation
      @scroll="scroll"
      @scrolltolower="scrolltolower"
    >
      <ul>
        <li v-for="(item,index) in goodsList" :key="index" @click="sel(index)" class="titleAll">
          <h3 class="title" :id="'to'+index">{{item.typeName}}</h3>
          <ul>
            <li v-for="(it,dex) in item.foodList" :key="dex">
              <div class="img">
                <img :src="it.img" />
              </div>
              <div class="right">
                <div class="name">{{it.name}}</div>
                <span class="peicai">{{it.descript}}</span>
                <span class="price">¥{{it.price}}</span>
                <span class="fen" v-show="it.unit">/{{it.unit}}</span>
                <div class="jisuan">
                  <button class="add" size="mini" @click="add(item,it)">+</button>
                  <span>{{it.count}}</span>
                  <button class="prev" size="mini" @click="jian(item,it)">-</button>
                  <!-- <button class="buy" size="mini" @click="buy(it)">点餐</button> -->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="kong"></div>
    </scroll-view>
    <div v-show="sum!==0" class="buy_box">
      <div class="box">
        <div class="left">
          <img src="../../static/images/katong.png" />
          <div class="text">
            <span>¥{{sum}}</span>
            <p>另需配送费 ¥3 | 支持自取</p>
          </div>
        </div>
        <div class="right" @click="toCart()">去结算</div>
      </div>
    </div>
    <div v-show="sum==0" class="Buy_box">
      <div class="box">
        <div class="left">
          <img src="../../static/images/waimai.png" />
          <span>另需配送费 ¥3 | 支持自取</span>
        </div>
        <div class="right">15元起送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      goodsList: [],
      scrollId: "",
      currentNum: 0,
      scrollTop: 0, //scroll
      listHeight: [], //右侧listTOP
      sum: 0,
      bool: false
    };
  },
  mounted() {
    //foodtype 5 foodlist 26
    let goodsList = [];
    wx.showLoading({
      title: "加载中..."
    });
    this.$apis.getfood().then(res => {
      for (var i = 0; i < res.data.foodtype.length; i++) {
        // console.log(res.data.foodtype[i].id)
        goodsList.push({
          typeName: res.data.foodtype[i].name,
          type_id: res.data.foodtype[i].id,
          foodList: [],
          num: 0
        });

        for (var n = 0; n < res.data.foodlist.length; n++) {
          if (res.data.foodtype[i].id == res.data.foodlist[n].type_id) {
            res.data.foodlist[n].count = 0;
            goodsList[i].foodList.push(res.data.foodlist[n]);
          }
        }
      }
      this.goodsList = goodsList;
      // console.log(this.goodsList);
      wx.hideLoading();
      setTimeout(() => {
        // console.log(this.$refs);
        this.getNodesData();
      }, 80);
    });
  },
  computed: {
    currentIndex() {
      this.scrollTop = this.scrollTop + 140;
      for (var i = 0; i < this.listHeight.length; i++) {
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        // console.log(height1,height2);
        if (this.scrollTop >= height1 && this.scrollTop < height2) {
          // console.log(i);
          this.currentNum = i;
          return i;
        }
      }
      return i;
      // return this.scrollTop;
    },
    total() {
      if (this.$store.getters.total) {
        this.sum = this.$store.getters.total;
      } else {
        this.sum = 0;
      }
      return this.sum;
    }
  },
  methods: {
    someFunction() {
      console.log(this.total);
    },
    sel(item, index) {
      // console.log(item);
      this.scrollId = "to" + index;
      // this.currentNum=index;
    },
    add(item, it) {
      // console.log(it);
      it.count++;
      item.num++;
      this.$store.commit("add", it);
    },
    jian(item, it) {
      it.count--;
      if (it.count < 0) {
        it.count = 0;
        return;
      }
      item.num--;
    },
    // buy(it) {
    //   if (it.count != 0) {
    //     this.bool = true;
    //   } else {
    //     this.bool = false;
    //   }
    // },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    getNodesData() {
      var query = wx.createSelectorQuery();
      // select    id
      // selectAll class
      // console.dir()
      query
        .selectAll(".titleAll")
        .boundingClientRect(nodes => {
          nodes.map(item => {
            this.listHeight.push(item.top);
          });
          // console.log(this.listHeight);
        })
        .exec();
    },
    scrolltolower() {
      setTimeout(() => {
        this.currentNum = this.listHeight.length - 1;
      }, 80);
    },
    toCart() {
      mpvue.reLaunch({ url: "/pages/counter/main" });
    }
  }
};
</script>

<style scoped lang='scss'>
.goods_content {
  width: r(375);
  border-top: r(0.5) solid #e7e7e7;
  display: flex;
  height: r(528);
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  .cont_title {
    width: r(80);
    background-color: #f2f2f2;
    ul {
      width: 100%;
      div {
        padding: 0 r(2.5);
        background: url("../../static/images/seatch.png") no-repeat center;
        width: r(68);
        height: r(52);
      }
      li {
        font-size: r(13);
        color: #676767;
        text-align: center;
        background-color: #f5f5f5;
        box-sizing: border-box;
        border-left: r(2.5) solid transparent;
        padding: 0 r(2.5);
        height: r(50);
        line-height: r(50);
        position: relative;
        i {
          position: absolute;
          top: r(2.5);
          right: r(5);
          background-color: orange;
          width: r(15);
          height: r(15);
          line-height: r(15);
          color: #fff;
          border-radius: 50%;
          font-size: r(10);
          text-align: center;
        }
      }
      .choose {
        width: 100%;
        color: #f87a7c;
        background-color: #fff;
        border-left: r(2.5) solid #f87a7c;
      }
    }
  }
  .content {
    width: r(275);
    ul {
      li {
        .title {
          padding-left: r(11.7);
          margin-top: r(11.7);
          line-height: r(23.438);
          font-size: r(16);
          border-left: r(2.5) solid #f87a7c;
        }
        ul {
          li {
            padding: r(13) 0;
            border-bottom: 1px solid #e7e7e7;
            display: flex;
            justify-content: space-between;
            .img {
              background-color: #ebebeb;
              width: r(62);
              height: r(62);
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .right {
              width: r(204);
              position: relative;
              .name {
                line-height: r(18);
                overflow: hidden;
                font-size: r(14);
                color: #2f2f2f;
                margin-bottom: r(5);
                overflow: hidden;
              }
              .peicai {
                font-size: r(12);
                overflow: hidden;
                color: #a9a9a9;
                margin-bottom: r(2.5);
                text-overflow: ellipsis;
                display: -webkit-box;
              }
              .price {
                display: inline-block;
                margin-right: r(5);
                color: #f87a7c;
                font-size: r(15);
                line-height: r(27);
                vertical-align: middle;
              }
              .fen {
                font-size: r(12);
                color: #a9a9a9;
              }
              .jisuan {
                display: flex;
                position: absolute;
                right: r(15);
                bottom: 0;
                width: r(120);
                align-items: center;
                .add {
                  width: r(20);
                  line-height: r(20);
                  height: r(20);
                  border-radius: 50%;
                  text-align: center;
                  padding: 0;
                  background: orange;
                  color: #333;
                  font-size: r(18);
                }
                span {
                  width: r(20);
                  line-height: r(20);
                  text-align: center;
                  font-size: r(14);
                  display: inline-block;
                  margin: 0;
                  color: #333;
                }
                .prev {
                  width: r(20);
                  line-height: r(20);
                  height: r(20);
                  text-align: center;
                  padding: 0;
                  background: #fff;
                  border-radius: 50%;
                  border: 1px solid gray;
                  color: #333;
                  font-size: r(18);
                }
                .buy {
                  width: r(40);
                  line-height: r(30);
                  height: r(30);
                  text-align: center;
                  padding: 0;
                  background: orangered;
                  color: #f2f2f2;
                }
              }
            }
          }
        }
      }
    }
    .kong {
      width: 100%;
      height: r(50);
    }
  }
  .buy_box {
    width: r(300);
    height: r(50);
    position: fixed;
    bottom: 0;
    left: r(35);
    .box {
      width: 100%;
      height: 100%;
      background-color: #333;
      display: flex;
      border-radius: r(25);
      .left {
        flex: 1;
        height: 100%;
        img {
          width: r(70);
          height: r(75);
          position: absolute;
          left: r(10);
          top: r(-25);
        }
        .text {
          margin-left: r(80);
          span {
            color: #f3f3f3;
            font-size: r(12);
            font-weight: bold;
          }
          p {
            text-align: center;
            color: wheat;
            font-size: r(10);
          }
        }
      }
      .right {
        width: 30%;
        height: 100%;
        line-height: r(50);
        background-color: orange;
        text-align: center;
        color: #000;
        border-top-right-radius: r(25);
        border-bottom-right-radius: r(25);
      }
    }
  }
  .Buy_box {
    width: r(300);
    height: r(50);
    position: fixed;
    bottom: 0;
    left: r(35);
    .box {
      width: 100%;
      height: 100%;
      background-color: gray;
      display: flex;
      border-radius: r(25);
      .left {
        flex: 1;
        height: 100%;
        color: #999;
        line-height: r(50);
        img {
          /* width: r(50);
          height: r(65);
          display: block;
          position: absolute;
          left: r(8);
          top: r(-15); */
          width: r(70);
          height: r(75);
          display: block;
          position: absolute;
          left: r(10);
          top: r(-25);
        }
        span {
          margin-left: r(80);
          text-align: center;
          color: #f3f3f3;
          font-size: r(12);
        }
      }
      .right {
        width: 26%;
        height: 100%;
        line-height: r(50);
        text-align: center;
        color: #f3f3f3;
        border-top-right-radius: r(25);
        border-bottom-right-radius: r(25);
      }
    }
  }
}
</style>
