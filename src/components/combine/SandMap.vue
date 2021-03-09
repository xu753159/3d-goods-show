<template>
  <Object3D>
    <!-- <assist-camera
      :position="SandMap.assistCamer.position"
      :rotation="SandMap.assistCamer.rotation"
    ></assist-camera> -->
    <map-sphere :spherePosition="SandMap.spherePosition"></map-sphere>
  </Object3D>

</template>
<script>
import Object3D from "../vue_three_js/components/Object3D";

export default {
  mixins: [Object3D],
  props:{
    SandMap:{
      type:Object
    }
  },
  data(){
    return {
        frame: null,
    }
  },
  mounted() {
    this.mapSphere();
  },
    beforeDestroy() {
      cancelAnimationFrame(this.frame);
    },
    methods: {
    mapSphere() {
      this.frame = requestAnimationFrame(this.mapSphere);
      this.SandMap.spherePosition.z = this.$global.camera.position.z;
      this.SandMap.spherePosition.x = this.$global.camera.position.x;
    },
  },
};
</script>

<style>
</style>
