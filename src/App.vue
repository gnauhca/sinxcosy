<template>
  <div class="wrapper">
    <h1 class="stage" ref="refStageElem"></h1>
    <nav class="menu">
      <a href="./daily-effect-test" target="_blank">EFFECTS</a>
      <a href="./3dlab" target="_blank">3D LAB</a>
    </nav>
    <div class="footer">
      <span class="footer__item">Designed & Powerd by Chaz</span>
      <div class="footer-group">
        <a class="footer__item" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022001828号-1</a>
        <a
          class="footer__item"
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502008627"
        >
          <img src="@/assets/beian.png" />
          粤公网安备 44030502008627号
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { Stage } from './components/stage';

export default {
  setup() {
    const refStageElem = ref(null);
    onMounted(function () {
      const stage = new Stage(refStageElem.value);
      stage.tick();
    });
    return {
      refStageElem,
    };
  },
};
</script>
<style lang="less">
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
nav.menu {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    display: block;
    padding: 10px 0;
    width: 150px;
    font-weight: bold;
    // background: #111;
    font-size: 24px;
    color: #fff;
    color: #333;
    text-align: center;
    transition: all 0.2s;
    @media screen and (max-width: 500px) {
      width: 100px;
      font-size: 18px;
    }
    &:hover {
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
    }
  }
  a + a {
    margin-left: 10px;
  }
}
.stage {
  position: relative;
  width: 100vw;
  height: 0;
  padding-top: 33%;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}

// @media (orientation: landscape) {
//   .stage {
//     width: 120vh;
//     height: 120vh;
//   }
// }

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  &-group {
    display: flex;
    align-items: center;
  }
  &__item {
    display: flex;
    align-items: center;
    margin: 0 10px;
    color: #888 !important;
    img {
      margin-right: 4px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
