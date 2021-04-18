<!--
 * @Date: 2021-04-18 06:54:21
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-19 07:25:35
-->
<template>
  <div class="ProjectsAndWorks">
    <div class="container">
      <div class="col-md-12 text-center title" style="background-size: cover">
        <h5><span class="id-color">工作项目及作品</span></h5>
        <h2>以前都做过什么?</h2>
        <h6>(仅部分展示)</h6>
      </div>
      <div class="filter-button-group button-group js-radio-button-group">
        <div
          v-for="(item, index) in items"
          :class="activeClass == index ? 'active' : ''"
          @click="tabProject(index)"
          :key="index"
          :data-filter="item.filters"
        >
          {{ item.text }}
        </div>
      </div>

      <div class="grid" style="position: relative; height: 224px">
        <div class="grid-item CRM" data-category="transition">
          <div class="projectDescription">
            <a
              href="http://page.shixinyuezi.com/public/index.php/admin/login/index.html"
            >
              <span>
                业务推广页面管理系统 2020.10 - 2020.10 全栈(自主研发) 广州<br />
                业务推广页面管理系统：针具公司业务专制开发;<br />
                技术选型:element+vue+thinkphp5+mysql+nginx</span
              ></a
            >
          </div>
          <div class="project-pic project-pic1"></div>
        </div>
        <div class="grid-item H5" data-category="transition">
          <div class="projectDescription">
            <a href="https://jackllllll.github.io/src/example/case1/index.html">
              <span> 手机H5</span></a
            >
          </div>
          <div class="project-pic project-pic2"></div>
          <!-- <img src="../example/case1/images/part01_bg.jpg" alt="" /> -->
        </div>
        <div class="grid-item H5" data-category="transition">
          <div class="projectDescription">
            <a href="https://jackllllll.github.io/src/example/case2/index.html">
              <span> canvas H5游戏</span></a
            >
          </div>
          <div class="project-pic project-pic3"></div>
        </div>
        <div class="grid-item H5" data-category="transition">
          <div class="projectDescription">
            <a href="https://jackllllll.github.io/src/example/case3/index.html">
              <span> 手机H5</span></a
            >
          </div>
          <div class="project-pic project-pic4"></div>
        </div>
        <div class="grid-item H5" data-category="transition">
          <div class="projectDescription">
            <a href="https://jackllllll.github.io/src/example/case6/index.html">
              <span> 手机H5</span></a
            >
          </div>
          <div class="project-pic project-pic5"></div>
        </div>
        <div class="grid-item H5" data-category="transition">
          <div class="projectDescription">
            <a href="https://jackllllll.github.io/src/example/case7/index.html">
              <span> 手机H5</span></a
            >
          </div>
          <div class="project-pic project-pic6"></div>
        </div>
        <div class="grid-item Company" data-category="transition">
          <div class="projectDescription">
            <a href="http://www.shixinyuezi.com/"> <span>仕馨PC官网</span></a>
          </div>
          <div class="project-pic project-pic7"></div>
        </div>
        <div class="grid-item Company" data-category="transition">
          <div class="projectDescription">
            <a href="https://m.shixinyuezi.com/">
              <span>仕馨mobile官网</span></a
            >
          </div>
          <div class="project-pic project-pic8"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Isotope from "isotope-layout";
export default {
  name: "ProjectsAndWorks",

  data() {
    return {
      Isotope: {},
      activeClass: 0,
      items: [
        { filters: "*", text: "全部项目" },
        { filters: ".H5", text: "H5" },
        { filters: ".CRM", text: "CRM管理系统" },
        { filters: ".Company", text: "企业官网" },
      ],
    };
  },
  methods: {
    tabProject(index) {
      this.activeClass = index; // 把当前点击元素的index，赋值给activeClass

      let filters = event.target.getAttribute("data-filter");

      this.Isotope.arrange({ filter: filters });
    },
  },

  mounted() {
    let elem = document.querySelector(".grid");

    this.Isotope = new Isotope(elem, { filter: "*" });
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding-top: 40px;
  h5 {
    font-size: 15px;
    margin-top: 0;
    font-family: "Poppins";
    font-weight: bold;
    color: #35404e;
    span {
      color: #10afa0;
    }
  }
  h2 {
    display: inline-block;
    overflow: hidden;
    position: relative;
    left: 0;
    right: 0;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -1px;
  }
}
.filter-button-group {
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
  font-weight: 400;
  div {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 10px;
    font-size: 11px;
    text-transform: uppercase;
    background: none;
    outline: none;
    color: #888;
    text-decoration: none;
    padding: 5px 20px 5px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .active {
    color: #fff;
    background: #10afa0;
  }
}
.grid {
  .grid-item {
    margin: 0 0.75% 0.75% 0;
    width: 32%;
    img {
      width: 100%;
    }
    .projectDescription {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      text-align: center;
      background: rgba(#10afa0, 0);
      transition: ease 0.6s;
      cursor: pointer;
      display: table-cell;
      vertical-align: middle;
      span {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 80%;
        line-height: 20px;
        margin: auto;
        font-family: "Poppins";
        color: #eceff3;
        letter-spacing: 5px;
        word-wrap: break-word;
        word-break: normal;
        opacity: 0;
        transition: ease 0.6s;
      }
      &:hover {
        background: rgba(#10afa0, 0.8);
        span {
          opacity: 1;
        }
      }
    }
    .project-pic {
      width: 100%;
      height: 254px;
    }
  }
  .project-pic1 {
    background: url(../assets/img/CRM.jpg) center top/100% 100% no-repeat;
  }
  .project-pic2 {
    background: url(../example/case1/images/part01_bg.jpg) center top/100% 100%
      no-repeat;
  }
  .project-pic3 {
    background: url(../example/case2/img/bg1_gif2.gif) center top/100% 100%
      no-repeat;
  }
  .project-pic4 {
    background: url(../example/case3/img/bg1.jpg) center top/100% 100% no-repeat;
  }
  .project-pic5 {
    background: url(../example/case6/images/s_people.jpg) center top/100% 100%
      no-repeat;
  }
  .project-pic6 {
    background: url(../example/case7/images/jie01_pic.gif) center top/100% 100%
      no-repeat;
  }
  .project-pic7 {
    background: url(../assets/img/sx_pc.jpg) center top/100% 100% no-repeat;
  }
  .project-pic8 {
    background: url(../assets/img/sx_m.jpg) center top/100% 100% no-repeat;
  }
}

/* ---- .element-item ---- */

/* 5 columns, percentage width */

.container {
  max-width: 1200px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}
.de-gallery .project-name {
  font-size: 16px;
  letter-spacing: 0;
}
.project-name {
  font-size: 12px;
  font-weight: bold;
  display: block;
}
.pf_text {
  font-family: "Poppins";
  color: #eceff3;
  letter-spacing: 5px;
}
.de-gallery .overlay .pf_text {
  display: inline-block;
  opacity: 0;
}
.de-gallery .overlay {
  text-align: center;
}
span.overlay {
  font-family: "Nunito";
  text-align: center;
  display: block;
  width: 100px;
  background: rgba(var(--primary-color-rgb), 0.8);
  position: absolute;
  opacity: 0.75;
  z-index: 500;
}
.picframe {
  position: relative;
  overflow: hidden;
}
.de-gallery .overlay .pf_text {
  display: inline-block;
  opacity: 0;
}
</style>