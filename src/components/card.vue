<template>
  <div class="head">
    <p class="logo-bg"></p>
    <div class="header">
      <div class="f_block_t">
        <div class="img">
          <img class="logo" src="../../static/images/logo.jpg" />
        </div>
        <div class="text">
          <div class="title text-text_overflow">{{infoData.shopname}}</div>
          <div class="gonggao">
            <div class="icon-gonggao">
              <img src="../../static/images/xiaolaba.png" />
            </div>
            <div class="txt text_overflow">{{infoData.shop_notice}}</div>
          </div>
        </div>
        <div class="u_collect">
          <div class="icon_wrapper">
            <div class="icon_save6">
              <img src="../../static/images/ax.png" />
            </div>
          </div>
          <div class="sc">收藏</div>
        </div>
      </div>
      <div class="f_block_b"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoData: {}
    };
  },
  mounted() {
    this.$apis.getfood().then(res => {
      this.infoData = res.data;
    });
  }
};
</script>

<style scoped lang='scss'>
.head {
  width: r(375);
  height: r(100);
}
.logo-bg {
  position: absolute;
  left: 0;
  top: 0;
  height: r(100);
  width: 100%;
  background: gray;
  /* background-image: url("http://img.zhipuzi.com/upload_files/image/20190525/cae29Soa7761JuMGuhL1GRrIKg1gN44g.jpg");
  background-size: cover;
  background-repeat: no-repeat; */
  opacity: 0.5;
}

.header {
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: r(100);
  width: 100%;
}

.f_block_t {
  padding: r(10);
  padding-right: r(18);
  height: r(51);
  clear: both;
  display: flex;
}

.img {
  height: r(51);
  width: r(51);
  border-radius: 50%;
  background-color: #fff;
}

.logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.f_block_b {
  height: r(15);
  margin: r(5);
  padding-top: r(2);
  border-top: r(1) dashed #fff;
  display: flex;
}

.text {
  flex: 1;
  height: r(52);
  padding-left: r(12);
  padding-top: r(8);
  overflow: hidden;
}

.text_overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title {
  color: #fff;
  font-size: r(16);
  line-height: r(16);
  margin-bottom: r(6);
}

.gonggao {
  line-height: r(20);
  display: flex;
}

.icon-gonggao {
  img {
    width: 15.5px;
    height: 14px;
    display: block;
  }
}

.txt {
  margin-left: 22.5px;
  font-size: r(12);
  color: #fff;
  line-height: r(20);
}

.u_collect {
  margin-top: r(9);
  position: relative;
  width: r(60);
  border-left: r(0.5) solid #fff;
}

.icon_wrapper {
  text-align: center;
  font-family: icomoon !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: r(21);
}

.icon_save6 {
  display: flex;
  justify-content: center;
  img {
    width: 19px;
    height: 17.5px;
    display: block;
  }
}

.sc {
  margin-top: r(6);
  color: #fff;
  font-size: r(14);
  text-align: center;
}
</style>
