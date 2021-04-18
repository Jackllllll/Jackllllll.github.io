<!--
 * @Date: 2021-04-17 08:13:47
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-18 06:54:09
-->
<template>
  <div class="WorkExperience">
    <div class="container">
      <h2>工作经历</h2>
      <el-timeline width="800">
        <el-timeline-item
          timestamp="2018/4/3"
          placement="top"
          hide-timestamp="true"
          color="#10afa0"
          align="left"
        >
          <el-card>
            <h4>仕馨月子会所股份有限公司<span> 2018.12 - 2021.01</span></h4>
            <h6>前端开发工程师 业务中心 广州</h6>
            <br />
            <p>
              负责小程序端的开发工作，使用JavaScript语言，采用postman测试对应接口能独立自主开发前后台应用<br />
              小程序主要功能实现了支付，地图，留言，客服，公告，个人信息相关模块。涉及了大量的数据接入和小程序api的使用<br />
              通过添加原生缓冲功能，提升小程序加载速度1.3s，通过优化小程序内部跳转url和页面显示逻辑实现了多页面重<br />
              用。使用微信支付接口实现了资料以及视频的购买功能<br />
              使用async/await解决了循环请求数据处理的问题<br />
              使用flex弹性布局解决界面相关的对齐居中等问题<br />
              使用wxParse处理后台返回的带标签数据
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          timestamp="2018/4/12"
          placement="bottom"
          hide-timestamp="true"
          color="#10afa0"
          align="left"
        >
          <el-card>
            <h4>广州掌恒信息技术有限公司<span> 2018.02 - 2018.11</span></h4>
            <h6>前端开发工程师 技术部 广州</h6>
            <br />
            <p>
              负责外包项目的HTML5页面和开发；<br />
              协助后端开发工程师完成完成数据交互；<br />
              负责移动页面动态效果显示,并对页面进行优化，使用户操作更趋于人性化；<br />
              配合后台工程师一起研讨技术实现方案，进行应用及系统整合；<br />
              负责PC端及移动端的项目开发和代码优化；<br />
              深化、钻研React、Vue等框架和不断学习了解热门新秀框架；
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkExperience",
};
</script>

<style lang="scss" scoped>
.WorkExperience {
  background: rgb(209, 243, 229);
  padding: 50px 0;
  .container {
    max-width: 1200px;
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    h2 {
      font-size: 24px;
      margin: 0 auto 40px;
    }
    .el-timeline {
      width: 600px;
      padding-left: 30px;
      margin: auto;
      h4 {
        font-size: 18px;
        margin: 20px auto 10px;
        span {
          font-size: 16px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>