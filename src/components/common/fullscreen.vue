<template>
  <span @click="fullscreenchange()">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "fullscreen",
  data() {
    return {};
  },
  methods: {
    fullscreenchange() {
      let element = document.body;
      // console.log(element);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
      // document.querySelector('canvas').height = document.body.clientHeight
      // var fullscreenElement =
      //   document.fullscreenElement ||
      //   document.mozFullScreenElement ||
      //   document.webkitFullscreenElement;
      var fullscreenEnabled =
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled;
      if (fullscreenEnabled) {
        // 退出全屏模式!
        this.exitFullscreen();
      }
      // fullscreenElement.height = document.body.clientHeight;
    },
    // 退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
  },
};
</script>

<style>
</style>