<template>
  <div class="stage" ref="refStageElem"></div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
.stage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vw;
  canvas {
    width: 100%!important;
    height: 100%!important;
  }
}

@media (orientation: landscape) {
  .stage {
    width: 120vh;
    height: 120vh;
  }
}
</style>
