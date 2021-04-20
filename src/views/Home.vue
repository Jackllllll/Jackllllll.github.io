<!--
 * @Date: 2021-04-15 15:43:07
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-20 06:43:23
-->
<!--
 * @Date: 2021-04-15 15:43:07
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-18 12:39:25
-->
<template>
  <Header></Header>
  <canvas id="projector"
    >Your browser does not support the Canvas element.</canvas
  >
  <SelfIntroduction></SelfIntroduction>
  <AboutMe></AboutMe>
  <WorkExperience></WorkExperience>
  <ProjectsAndWorks></ProjectsAndWorks>
  <el-backtop></el-backtop>
</template>
<script>
// @ is an alias to /src
import "../assets/js/TweenMax.min";
import "../assets/js/easeljs-0.7.1.min";
import ParticleEngine from "../assets/js/canvasBackground";

import Header from "@/components/Header.vue";
import SelfIntroduction from "@/components/SelfIntroduction.vue";
import AboutMe from "@/components/AboutMe.vue";
import WorkExperience from "@/components/WorkExperience.vue";
import ProjectsAndWorks from "@/components/ProjectsAndWorks.vue";

export default {
  name: "Home",
  components: {
    Header,
    SelfIntroduction, //自我介绍
    AboutMe,
    WorkExperience, //工作经验
    ProjectsAndWorks, //项目及作品
  },
  mounted() {
    let particles;
    (function () {
      particles = new ParticleEngine("projector");
      // eslint-disable-next-line
      createjs.Ticker.addEventListener("tick", updateCanvas);
      window.addEventListener("resize", resizeCanvas, false);

      function updateCanvas() {
        particles.render();
      }

      function resizeCanvas() {
        particles.resize();
      }
    })();
  },
};
</script>
<style lang="scss">
.el-backtop,
.el-calendar-table td.is-today {
  color: #10afa0 !important;
}
#projector {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: none;
}
</style>
