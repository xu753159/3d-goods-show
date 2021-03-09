<template>
  <Object3D>
    <mesh
      :position="tips.position"
      :scale="tipOptions.scale"
      :name="tips.type"
      :index="tips.id"
      :rotation="tips.rotation"
      :onRaycaster="Show"
    >
      <geometry type="Plane" :args="tipOptions.args"></geometry>
      <material type="MeshBasic" :options="tipOptions.matOpts">
        <canvas-text :show="false"></canvas-text>
        <canvas-texture></canvas-texture>
      </material>
    </mesh>
    <mesh
      :position="tips.position"
      v-if="tipsShow"
      :scale="tipOptions.scale"
      :rotation="tips.rotation"
    >
      <geometry type="Plane" :args="tipOptions.args"></geometry>
      <material type="MeshBasic" :options="tipOptions.matOpts">
        <canvas-text
          :show="true"
          :title="tips.title"
          :describe="tips.describe"
        ></canvas-text>
        <canvas-texture></canvas-texture>
      </material>
    </mesh>
  </Object3D>
</template>

<script>
import Object3D from "../vue_three_js/components/Object3D";
export default {
  mixins: [Object3D],
  props: {
      tips:{
          type:Object
      },
      tipOptions:{
        type:Object
      }
  },
  data() {
    return {
      tipsShow:false
    };
  },
  methods: {
    Show(){
      this.tipsShow=!this.tipsShow
    }
  },
};
</script>

<style>
</style>