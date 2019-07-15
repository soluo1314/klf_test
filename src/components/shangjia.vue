<template>
  <div class="box">
    <div class="cont-cont">
      <div class="cont-head">
        <div class="cont-pic">
          <div class="pic">
            <img :src="infoListshop.share_image" />
          </div>
          <div class="dian">
            <div></div>
          </div>
        </div>
      </div>
      <div class="cont-five-start">
        <ul>
          <li>
            <div>
              <div>
                <ul>
                  <i-cell title="基本用法">
                    <i-rate :value="infoList.commentgrade-1" size="18" :count="5"></i-rate>
                  </i-cell>
                </ul>
                <div>{{infoList.commentgrade}}</div>
              </div>
              <span>{{infoListshop.comment_num+"人已评价"}}</span>
              <i>
                <img src="../../static/images/jiantou.png" />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <div class="cont-start">
        <ul>
          <li>
            <div>
              <p>
                <i>
                  <img src="../../static/images/dingwei.png" />
                </i>
                <span>{{infoListshop.shopaddress}}</span>
              </p>
              <i>
                <img class="jiantou" src="../../static/images/jiantou.png" />
              </i>
            </div>
          </li>
          <li>
            <div>
              <p>
                <i>
                  <img src="../../static/images/dianhua.png" />
                </i>
                <span>{{infoListshop.orderphone}}</span>
              </p>
              <i>
                <img
                  style="width:23px;height:23px;display:block;"
                  src="../../static/images/dianhuahong.png"
                />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <div class="cont-start">
        <ul>
          <li>
            <div>
              <p @click="handleOpen1">
                <i>
                  <img src="../../static/images/shizhong.png" />
                </i>
                <span>营业时间：</span>
                <span class="shizhong">
                  <span v-for="(el,index) in hoursList" :key="index">{{el.start}}-{{el.stop}}</span>
                </span>
              </p>
              <i class="jt" @click="handleOpen1">
                <img class="jiantou" src="../../static/images/jiantou.png" />
              </i>
              <i-modal title="营业时间" :visible="visible1" :actions="actions3" @click="handleClose1">
                <view
                  v-if="isshow"
                >{{hoursList[0].start}}-{{hoursList[0].stop}},{{hoursList[1].start}}-{{hoursList[1].stop}}</view>
              </i-modal>
            </div>
          </li>
          <li>
            <div>
              <p>
                <i>
                  <img src="../../static/images/dingwei.png" />
                </i>
                <span>服务区域：</span>点此查看有效区域
              </p>
              <i>
                <img class="jiantou" src="../../static/images/jiantou.png" />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <div class="cont-start">
        <ul>
          <li>
            <div>
              <p>
                <i>
                  <img src="../../static/images/qi.png" />
                </i>
                <span>起送价：</span>
                {{infoList.basicprice+"元"}}
              </p>
              <i>
                <img class="jiantou" src="../../static/images/jiantou.png" />
              </i>
            </div>
          </li>
          <li>
            <div>
              <p>
                <i>
                  <img src="../../static/images/song.png" />
                </i>
                <span>配送费：</span>
                {{infoList.delivery_fee+"元"}}
              </p>
              <i>
                <img class="jiantou" src="../../static/images/jiantou.png" />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <div class="foot">
        <div class="foot-box">
          <div>
            <img src="../../static/images/touxiang.jpg" />
          </div>
          <img src="../../static/images/wenzi.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoList: {},
      infoListshop: {},
      hoursList: [],
      visible1: false,
      isshow: false,
      actions3: [
        {
          name: "确定",
          color: "#f87a7c"
        }
      ]
    };
  },

  components: {},
  mounted() {
    let goodsList = [];
    this.$apis.infover().then(res => {
      this.infoList = res.data;
      console.log(this.infoList);
      this.infoListshop = res.data.shop;
      this.hoursList = res.data.shop.business_hours;
      this.isshow = true;
    });
  },
  computed: {},
  methods: {
    handleClose1() {
      this.visible1 = false;
    },
    handleOpen1() {
      this.visible1 = true;
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: r(375);
  border-top: r(0.5) solid #e7e7e7;
  background-color: #fff;
  .cont-cont {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    .cont-head {
      background-color: #fff;
      position: relative;
      .cont-pic {
        height: 265px;
        .pic {
          overflow: hidden;
          position: relative;
          height: 100%;
          > img {
            display: block;
            transform: none;
            width: 100%;
            height: 100%;
          }
        }
        .dian {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          > div {
            width: 7px !important;
            height: 7px !important;
            border: 1px solid rgba(0, 0, 0, 0.2) !important;
            background-color: rgba(0, 0, 0, 0.2) !important;
            opacity: 1 !important;
            border-radius: 50%;
          }
        }
      }
    }
    .cont-five-start {
      > ul {
        background-color: #f5f5f5;
        li {
          color: #373737;
          background-color: #fff;

          > img {
            width: 14px;
            height: 14px;
            display: inline-block;
          }
          > div {
            display: flex;
            border-bottom: none;
            position: relative;
            font-size: 14px;
            line-height: 20px;
            vertical-align: middle;
            padding: 9.5px 0 12px;
            margin-left: 16.4px;
            justify-content: space-between;
            > div {
              display: flex;
              > ul {
                display: flex;
                > li {
                  margin-right: 6px;
                }
              }
              > div {
                color: #fcbb2b;
                font-size: 13px;
                line-height: 14px;
              }
            }
            > i {
              margin-right: 18px;
              > img {
                width: 7px;
                height: 12px;
                vertical-align: middle;
              }
            }
            > span {
              margin-right: 18px;
              margin-left: 112px;
            }
          }
        }
      }
    }
    .cont-start {
      border-top: 10px solid #f5f5f5;
      > ul {
        background-color: #f5f5f5;
        li {
          color: #373737;
          background-color: #fff;
          > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            font-size: 14px;
            line-height: 17px;
            vertical-align: middle;
            padding: 14px 0 12px;
            margin-left: 16.4px;
            border-bottom: 1.5px solid #f5f5f5;
            p {
              > i:nth-child(1) {
                margin-right: 12px;
                display: inline-block;
                vertical-align: top;
                > img {
                  width: 17px;
                  height: 17px;
                  vertical-align: middle;
                }
              }
              > span {
                display: inline-block;
                vertical-align: top;
              }
              .shizhong {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-wrap: break-word;
                word-break: normal;
                display: inline-block;
                width: r(180);
              }
            }
            i {
              margin-right: r(18);
              .jiantou {
                width: r(7) !important;
                height: r(12) !important;
              }
            }
            .jt {
              margin: 0;
              position: absolute;
              right: r(18);
              top: r(15);
            }
          }
        }
        li:nth-child(2) {
          > div {
            border-bottom: none;
          }
        }
      }
    }
    .foot {
      .foot-box {
        background: #f5f5f5;
        background-size: cover;
        width: 100%;
        padding-top: 47px;
        padding-bottom: 94px;
        text-align: center;
        color: #b7b7b7;
        height: 36.5px;
        > div {
          > img {
            margin: 0 auto;
            width: 22px;
            height: 22px;
            display: block;
          }
        }
        > img {
          display: block;
          margin: 0 auto;
          width: 103px;
          margin-top: r(10);
          display: block;
          height: 10.5px;
        }
      }
    }
  }
}
</style>