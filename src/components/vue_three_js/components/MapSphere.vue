<template>
  <Object3D
    :position="spherePosition"
    name="sand"
  >
    <mesh :scale="3">
      <geometry type="SphereBuffer" :args="[4, 10, 10]"></geometry>
      <material type="MeshBasic" :options="matOpts2">
        <texture-loader url="static/img/red.png"></texture-loader>
      </material>
    </mesh>
  </Object3D>
</template>

<script>
import * as THREE from "three";
import Object3D from './Object3D'

export default {
  name:'mapSphere',
  mixins: [Object3D],
  props: {
    spherePosition: {
      type: Object,
    },
  },
  data() {
    return {
      matOpts2: {
        side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending,
        opacity: 1,
        // depthWrite: false,
        transparent: true,
      },
    };
  },
  mounted() {
    
  },
 
  
};
</script>

<style>
</style>