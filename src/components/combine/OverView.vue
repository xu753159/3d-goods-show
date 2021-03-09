<template>
  <object3d>
    <mesh
      :rotation="overView.rotation"
      :position="overView.position"
      :scale="overView.scale"
    >
      <geometry type="Sphere" :args="overViewOptions.args"></geometry>
      <material type="MeshBasic" :options="overViewOptions.matOpts">
        <texture-loader :url="overView.viewurl"></texture-loader>
      </material>
    </mesh>
  </object3d>
</template>

<script>
import * as THREE from "three";
export default {
  props: {
    overView: {
      type: Object,
    },
    overViewOptions:{type:Object}
  },
  data() {
    return {
      matOpts4: {
        // color: 0x808000,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        opacity: 1,
        // depthWrite: false,
        // transparent: true,
      },
    };
  },
};
</script>

<style>
</style>