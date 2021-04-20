<template>
  <div class="SelfIntroduction">
    <div class="avatar_row wow rubberBand">
      <img class="avatar" src="../assets/img/avatar.png" alt="avatar" />
    </div>

    <el-row>
      <!-- 用于占位 -->
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <h2 class="name wow flash">林志斌</h2>
          <ul class="info">
            <li>
              <span class="first-block">年龄：</span>
              <span class="second-block fadeInRightBig wow"
                >93年({{ age }})</span
              >
            </li>
            <li>
              <span class="first-block">电话(微信)：</span>
              <span class="second-block fadeInRightBig wow">188-2515-1605</span>
            </li>
            <li>
              <span class="first-block">邮箱：</span>
              <span class="second-block fadeInRightBig wow"
                >lin302010@qq.com</span
              >
            </li>
            <li>
              <span class="first-block">居住：</span>
              <span class="second-block fadeInRightBig wow">广州市白云区</span>
            </li>
            <li>
              <span class="first-block">当前状态:</span>
              <span class="second-block fadeInRightBig wow">离职</span>
            </li>
            <li>
              <span class="first-block">最高学历:</span>
              <span class="second-block fadeInRightBig wow">本科(学士)</span>
            </li>
            <li>
              <span class="first-block">毕业于:</span>
              <span class="second-block fadeInRightBig wow"
                >华南理工大学广州学院 (2011 - 2015)</span
              >
            </li>
          </ul>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      born: 1993,
    };
  },
  computed: {
    age() {
      // `this` 指向 vm 实例
      const time = new Date();
      const year = time.getFullYear();
      return year - this.born;
    },
  },
};
</script>

<style lang="scss" scoped>
.SelfIntroduction {
  background: #d4d9dd;
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
  min-height: 80vh;
  position: relative;
  .avatar_row {
    background-position: center center;
    background-repeat: no-repeat;
    height: 360px;
    width: 330px;
    margin: 0 auto;
    margin-bottom: 30px;
    position: absolute;
    top: 200px;
    left: 470px;
    border-radius: 50%;
    overflow: hidden;
    .avatar {
      width: 100%;
    }
  }
  .name {
    margin-top: 184px;
    width: 300px;
    font-size: 50px;
    line-height: 1.3;
    font-weight: 300;
    transform: rotate(-5deg);
    padding: 4px 15px;
    position: relative;
    color: #fff;
    &::before {
      position: absolute;
      top: 40px;
      left: 380px;
      width: 30px;
      height: 4px;
      content: "";
      background: #fff;
      margin-left: -30px;
    }
    &::after {
      position: absolute;
      top: 40px;
      right: 390px;
      width: 30px;
      height: 4px;
      content: "";
      background: #fff;
      margin-right: -30px;
    }
  }
  .info {
    width: 530px;
    text-align: left;
  }
  .info li {
    margin: 20px;
    font-size: 20px;
  }
  .info li .first-block {
    width: 30%;
    display: inline-block;
    color: #000;
    font-weight: bold;
  }
  .info li .second-block {
    width: 70%;
    display: inline-block;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>