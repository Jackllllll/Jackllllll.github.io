<!--
 * @Date: 2021-04-16 17:16:13
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-19 06:44:31
-->
<template>
  <div class="about_me">
    <div class="container" style="background-size: cover">
      <div class="row align-items-center" style="background-size: cover">
        <div
          class="col-lg-6 mb-sm-30 text-center"
          style="background-size: cover"
        >
          <div class="de-images" style="background-size: cover">
            <img
              class="di-small-2 wow fadeInLeft animated"
              src="@/assets/img/3.jpg"
              alt=""
              style="visibility: visible; animation-name: fadeInLeft"
            />
            <img
              class="img-fluid wow fadeInRight animated"
              src="@/assets/img/1.jpg"
              alt=""
              style="visibility: visible; animation-name: fadeInRight"
            />
          </div>
        </div>

        <div
          class="col-lg-5 offset-md-1 wow fadeInLeft animated"
          data-wow-delay=".5s"
          style="
            background-size: cover;
            visibility: visible;
            animation-delay: 0.5s;
            animation-name: fadeInLeft;
          "
        >
          <h2>个人 <span class="id-color">总结</span></h2>
          <p>
            3年web开发经验/小程序及web实战项目经验做过微信小程序、百度小程序等各类程序开发
            精通Vue-axios-router等全家桶开发标准前后端分离webapp项目了解工程化及组件化开发
            熟练使用vscode,npm包,webpack打包等工具/软件熟练ES6基本语法
            熟练php，能对php进行基本操作，和数据库进行链接，输出数据和前端交互；
            熟练Mysql的基本操作，对数据库的内容进行增、删、查、改；
            熟练Thinkphp框架熟练nginx服务
          </p>
          <div class="spacer-10" style="background-size: cover"></div>
          <span
            @click="skillshow"
            id="btn-show-skills"
            class="btn-border wow fadeInUp animated"
            data-wow-delay="1s"
            style="
              visibility: visible;
              animation-delay: 1s;
              animation-name: fadeInUp;
            "
            >技能展示
          </span>
        </div>
      </div>

      <div
        id="skills"
        class="row show"
        style="background-size: cover"
        ref="skills"
      >
        <h2>专业技能</h2>
        <p>
          熟练掌握HTML+CSS+JavaScript三大前端语言，同时熟悉常用的前端语言框架，如vue.JS，ReactJs,JQuery等<br />
          熟练主流框架Vue.js ，并能通过vue + vuex + vue-router 实现SPA开发<br />
          熟悉使用JQuery
          Mobile,Vue,ReactJs进行移动端的页面设计，可以和产品同事协同完成网页的设计工作<br />
          熟练掌握Photoshop及蓝湖等工具,完美还原设计网页原型，将UI设计转化为符合W3C规范的静态页面<br />
          熟悉使用Git、SVN工具进行协同开发，团队配合意识良好，能进行前端代码的敏捷开发<br />
          熟悉使用Element，Vant,iView等多个快速成型工具进开发<br />
          熟悉Thinkphp-Mysql进行简单的后台搭建，完成后台需要的基本功能，如数据分析、用户分群等
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  methods: {
    skillshow() {
      this.$refs.skills.style.maxHeight = "1000px";
      this.$refs.skills.style.opacity = "1";
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.about_me {
  padding: 90px 0 90px 0;
  position: relative;

  .container {
    max-width: 1200px;
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px auto 0;
      @media (min-width: 992px) {
        .col-lg-6 {
          -ms-flex: 0 0 50%;
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      .col-lg-6 {
        .de-images {
          position: relative;
          width: 100%;
          img {
            width: 100%;
            border-radius: 5px;
          }
          .di-small-2 {
            position: absolute;
            width: 40%;
            height: 40%;
            right: -10%;
            bottom: -10%;
            z-index: 1;
          }
        }
      }
      @media (min-width: 992px) {
        .col-lg-5 {
          -ms-flex: 0 0 41.666667%;
          flex: 0 0 41.666667%;
          max-width: 41.666667%;
          text-align: left;
          h2 {
            display: inline-block;
            overflow: hidden;
            position: relative;
            left: 0;
            right: 0;
            margin-bottom: 10px;
            .id-color {
              color: rgb(16, 175, 160);
            }
          }
          p {
            font-size: 16px;
            text-align: left;
            line-height: 27.2px;
            margin-block-end: 20px;
          }
          a.btn-border,
          .btn-border {
            display: inline-block;
            cursor: pointer;
            border: solid 1px #1a1c26;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            padding: 12px 30px;
            // min-width: 120px;
            outline: 0;
            font-weight: bold;
            text-decoration: none;
            text-transform: none;
            font-size: 14px;
            border-color: #10afa0;
            text-align: center;
            margin-top: 10px;
          }
        }
      }

      @media (min-width: 768px) {
        .offset-md-1 {
          margin-left: 8.333333%;
        }
      }
    }
  }
  #skills {
    display: block;
    h2 {
      text-align: center;
      display: block;
      margin: 20px auto;
    }
    p {
      padding: 0 10%;
      text-emphasis: center;
    }
    max-height: 0;
    opacity: 0;
    margin-top: 100px;
    transition: 2s ease;
  }
}
</style>