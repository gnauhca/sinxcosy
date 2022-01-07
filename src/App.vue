<template>
  <div class="wrapper">
    <h1 class="stage" ref="refStageElem"></h1>
    <nav class="menu">
      <a href="./effects">EFFECTS</a>
      <a href="./3d-lab">3D LAB</a>
    </nav>
    <div class="footer">
      <span class="footer__item">Designed & Powerd by Chaz</span>
      <a class="footer__item" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022001828号-1</a>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { Stage } from './components/stage';

export default {
  setup() {
    const refStageElem = ref(null);
    onMounted(function() {
      const stage = new Stage(refStageElem.value);
      stage.tick();
    })
    return {
      refStageElem
    }
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  a {
    display: block;
    padding: 10px 0;
    width: 150px;
    font-weight: bold;
    background: #111;
    color: #fff;
    text-align: center;
    transition: all .2s;
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
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
    width: 100%!important;
    height: 100%!important;
  }
}

// @media (orientation: landscape) {
//   .stage {
//     width: 120vh;
//     height: 120vh;
//   }
// }

.footer {
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  &__item {
    margin: 0 10px;
    color: #888!important;
  }
}
</style>
