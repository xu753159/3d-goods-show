<template>
  <object3d
    :position="television.position"
    :rotation="television.rotation"
    base-url="static/"
  >
    <mesh
      :rotation="{ y: -Math.PI / 2 }"
      :scale="telOptions.scale"
      :position="{ x: 1, y: 1, z: 0 }"
    >
      <geometry type="Plane" :args="telOptions.args"></geometry>
      <material type="MeshBasic" :options="telOptions.matOpts">
        <canvas-video
          :videourl="television.telurl"
          :isplay="toplay"
        ></canvas-video>
        <video-texture></video-texture>
      </material>
    </mesh>
    <mesh
      :rotation="{ y: 4.71 }"
      :scale="1"
      :position="{ x: 1, y: 15, z: 0 }"
      name="isplay"
      :onRaycaster="VideoChange"
    >
      <geometry type="Plane" :args="[5, 5]"></geometry>
      <material type="MeshBasic" :options="matOpts">
        <texture-loader
          :MappingIndex="Number(toplay)"
          :url="['img/play.png','img/suspend.png']"
        ></texture-loader>
      </material>
    </mesh>
  </object3d>
</template>

<script>
import * as THREE from "three";
export default {
  props: {
    television: {
      type: Object,
    },
    telOptions: {
      type: Object,
    },
  },
  data() {
    return {
      toplay: false,
      matOpts: {
        // color: 0x00ffff,
        side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending,
        opacity: 1,
        // depthWrite: false,
        transparent: true,
      },
    };
  },
  methods: {
    VideoChange() {
      this.toplay = !this.toplay;
    },
  },
};
</script>

<style>
</style>