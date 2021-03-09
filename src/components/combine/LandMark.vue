<template>
  <Object3D>
    <mesh
      :position="landmark.landmarkposipostion"
      :rotation="{ x: 0, y: 0, z: 0 }"
      :scale="landmarkOption.scale"
      :onRaycaster="CameraChange"
    >
      <geometry type="Plane" :args="landmarkOption.args"></geometry>
      <material type="MeshBasic" :options="landmarkOption.matOpts">
        <texture-loader url="static/img/Map.png"></texture-loader>
      </material>
    </mesh>
  </Object3D>
</template>

<script>
import * as THREE from "three";
import Object3D from "../vue_three_js/components/Object3D";
export default {
  mixins: [Object3D],
  props: {
    landmark: {
      type: Object,
    },
    landmarkOption:{type:Object}
  },
  data() {
    return {
      matOpts2: {
        // color: 0x00ffff,
        side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending,
        opacity: 0.5,
        // depthWrite: false,
        transparent: true,
      },
    };
  },

  // watch:{
  //   play(){
  //     console.log("00", this.play)
  //   }
  // },
  methods: {
    CameraChange() {
    //   this.$global.camera.position=this.landmark.position
    //   this.$global.camera.rotation=this.landmark.rotation
      this.$global.camera.position.x= this.landmark.position.x
      this.$global.camera.position.y= this.landmark.position.y
      this.$global.camera.position.z= this.landmark.position.z

      this.$global.camera.rotation.x =this.landmark.rotation.x
      this.$global.camera.rotation.y=this.landmark.rotation.y
      this.$global.camera.rotation.z=this.landmark.rotation.z
    //   this.$global.camera.rotation=this.landmark.rotation
      
    },
  },
};
</script>

<style>
</style>