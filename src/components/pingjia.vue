<template>
  <div class="box">
    <div class="conta">
      <div class="comment_top">
        <div class="left">
          <div class="c_box">
            <div class="content-l-grade">
              <p class="number">{{userData.commentgrade}}</p>
            </div>
            <div class="content-s size">
              <p class="total">平均得分</p>
            </div>
            <div class="content-t size">
              <div class="evalute-number">
                <p>
                  （评论数
                  <span class="num">{{commentsList.commentPeople}}</span>
                  条）
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="comment_list" v-for="(el,index) in lists" :key="index">
            <div class="star_components">
              <div class="star_wrapper">
                <ul>
                  <li v-for="(item,dex) in el" :key="dex">
                    <div class="item_wrapper">
                      <div class="star_score">
                        <div class="star_inner" v-show="item==1"></div>
                      </div>
                      <div v-show="item==0" class="star_default"></div>
                    </div>
                  </li>
                </ul>
                <!-- <div class="score-text">{{el.length}}</div> -->
              </div>
            </div>
            <div class="total_star">
              <span v-if="isuserData">{{userData.commentgradePeople['grade_'+(index+1)]}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comment_c">
        <div class="wrap">
          <span
            :class="{active:num==index}"
            @click="tabClass(index)"
            v-for="(el,index) in userData.tag_num"
            :key="index"
          >{{el.name}}({{el.num}})</span>
        </div>
      </div>
      <div class="comment_b">
        <ul v-show="num==0">
          <li v-for="(el,index) in commentsList.comments" :key="index">
            <p class="customer_name">
              {{el.lewaimai_customer_id}}
              <span class="star_wrapper">
                <div class="item_wrapper">
                  <div class="star_score">
                    <!-- <div class="star_inner" v-show="item==1"></div> -->
                    <i-cell title="基本用法">
                      <i-rate :value="el.grade" size="18" :count="5"></i-rate>
                    </i-cell>
                  </div>
                  <div v-show="item==0" class="star_default"></div>
                </div>
              </span>
            </p>
            <div class="only_one">
              <img v-if="el.imgurl.length!=0" :src="'https://img.zhipuzi.com'+el.imgurl[0]" />
            </div>
            <p class="customer_rating">{{el.content}}</p>
            <p class="date">{{el.time}}</p>
          </li>
        </ul>
        <ul v-show="num==1">
          <li v-for="(el,index) in imgArr" :key="index">
            <p class="customer_name">
              {{el.lewaimai_customer_id}}
              <span class="star_wrapper">
                <div class="item_wrapper">
                  <div class="star_score">
                    <!-- <div class="star_inner" v-show="item==1"></div> -->
                    <i-cell title="基本用法">
                      <i-rate :value="el.grade" size="18" :count="5"></i-rate>
                    </i-cell>
                  </div>
                  <div v-show="item==0" class="star_default"></div>
                </div>
              </span>
            </p>
            <div class="only_one">
              <img v-if="el.imgurl.length!=0" :src="'https://img.zhipuzi.com'+el.imgurl[0]" />
            </div>
            <p class="customer_rating">{{el.content}}</p>
            <p class="date">{{el.time}}</p>
          </li>
        </ul>
        <ul v-show="num==2">
          <li v-for="(el,index) in commentsArr" :key="index">
            <p class="customer_name">
              {{el.lewaimai_customer_id}}
              <span class="star_wrapper">
                <ul>
                  <li v-for="(item,dex) in lists" :key="dex">
                    <div class="item_wrapper">
                      <div class="star_score">
                        <div class="star_inner" v-show="el.grade"></div>
                      </div>
                      <div v-show="item==0" class="star_default"></div>
                    </div>
                  </li>
                </ul>
              </span>
            </p>
            <div class="only_one">
              <img v-if="el.imgurl.length!=0" :src="'https://img.zhipuzi.com'+el.imgurl[0]" />
            </div>
            <p class="customer_rating">{{el.content}}</p>
            <p class="date">{{el.time}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      userData: [],
      lists: [
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1]
      ],
      isuserData: false,
      num: 0,
      commentsList: [],
      commentgradePeople: [],
      arr1: [],
      commentsArr: [],
      imgArr: []
    };
  },
  mounted() {
    wx.showLoading({
      title: "加载中..."
    });
    this.$apis.infover().then(res => {
      // console.log(res.data);
      this.userData = res.data;
      this.isuserData = true;
      //foodtype 5 foodlist 26
      wx.hideLoading();
    });
    this.$apis.listly().then(res => {
      console.log(res.data);
      this.commentsList = res.data;
      //grade
      res.data.comments.forEach(el => {
        if (el.imgurl.length != 0) {
          this.imgArr.push(el);
        }
        if (el.grade == 1) {
          this.arr1.push(el);
        } else {
          this.commentsArr.push(el);
        }
      });
      // console.log(this.imgArr, this.commentsArr);
      wx.hideLoading();
    });
  },
  methods: {
    tabClass(index) {
      this.num = index;
    }
  }
};
</script>

<style scoped lang='scss'>
.box {
  width: r(375);
  border-top: r(0.5) solid #e7e7e7;
  background-color: #fff;
  .conta {
    width: 100%;
    height: 100%;
    padding: 0;
    .comment_top {
      background-color: #fff;
      height: r(145);
      display: flex;
      .left {
        width: r(158.5);
        padding-bottom: r(21.5);
        .c_box {
          border-right: r(1.5) solid #ebebeb;
          .content-l-grade {
            text-align: center;
            margin-top: r(25);
            padding-bottom: r(15);
            p {
              text-align: center;
              font-size: r(35);
              color: #df5458;
            }
          }
          .size {
            font-size: r(14);
            color: #676767;
            text-align: center;
          }
          .content-s {
            margin-bottom: r(6);
          }
          .content-t {
            .num {
              color: #df5458;
            }
          }
        }
      }
      .right {
        width: r(213);
        .comment_list {
          height: r(18);
          margin-left: r(34.5);
          margin-top: r(9);
          display: flex;
          .star_components {
            height: r(18);
            display: inline-block;
            margin-right: r(14);
            .star_wrapper {
              display: inline-block;
              height: r(14);
              margin-right: r(14);
              display: flex;
              ul {
                display: flex;
                li {
                  margin-right: r(6);
                  .item_wrapper {
                    width: r(14);
                    height: r(14);
                    position: relative;
                    .star_score {
                      width: 100%;
                      z-index: 2;
                      overflow: hidden;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      background-image: url("../../static/images/baixing.png");
                      background-size: cover;
                      .star_inner {
                        width: 100%;
                        height: 100%;
                        background-image: url("../../static/images/wujiaox.png");
                        background-size: cover;
                      }
                    }
                    .star_default {
                      z-index: 1;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      background-image: url("../../static/images/baixing.png");
                      background-size: cover;
                    }
                  }
                }
              }
            }
          }
          .total_star {
            display: inline-block;
            color: #fdbc3f;
            font-size: r(15);
            font-weight: 700;
          }
        }
      }
    }
    .comment_c {
      border-top: r(10) solid #ebebeb;
      border-bottom: r(10) solid #ebebeb;
      padding-bottom: r(10);
      .wrap {
        margin: r(6) r(15) 0 r(9);
        span {
          padding: 0 r(14);
          text-align: center;
          color: #c2c2c2;
          height: r(29);
          display: inline-block;
          max-width: r(75);
          line-height: r(29);
          font-size: r(13);
          border-radius: r(14);
          border: r(0.5) solid #c2c2c2;
          margin-left: r(9);
          margin-top: r(9);
        }
        .active {
          border-color: #f87a7c !important;
          color: #f87a7c !important;
          background-color: #ffe7e7;
        }
      }
    }
    .comment_b {
      background-color: #fff;
      ul {
        margin-left: r(18);
        li {
          margin-right: r(6);
          .customer_name {
            height: r(18.5);
            line-height: r(18.5);
            font-size: r(14);
            font-weight: 700;
            color: #373737;
            margin-top: r(12.5);
            vertical-align: middle;
            .star_wrapper {
              float: right;
              height: r(14);
              margin-right: r(14);
              ul {
                display: flex;
                li {
                  .item_wrapper {
                    width: r(14);
                    height: r(14);
                    position: relative;
                    .star_score {
                      width: 100%;
                      z-index: 2;
                      overflow: hidden;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      background-image: url("../../static/images/baixing.png");
                      background-size: cover;
                      .star_inner {
                        width: 100%;
                        height: 100%;
                        background-image: url("../../static/images/wujiaox.png");
                        background-size: cover;
                      }
                    }
                    .star_default {
                      z-index: 1;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      background-image: url("../../static/images/baixing.png");
                      background-size: cover;
                    }
                  }
                }
              }
            }
          }
          .only_one {
            margin-top: r(8);
            img {
              width: r(175);
              height: r(175);
              display: block;
            }
          }
          .customer_rating {
            font-size: r(12);
            color: #373737;
            margin-top: r(12);
            margin-right: r(18);
          }
          .date {
            text-align: right;
            font-size: r(12);
            color: #676767;
            /* height: 0.768; */
            line-height: r(20);
            margin-right: r(20);
          }
        }
      }
    }
  }
}
</style>
