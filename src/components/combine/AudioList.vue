<template>
  <Object3D>
    <positional-audio
      loop
      :url="audio.audiosrc"
      :volume="1"
      :position="audio.position"
      :paused="play"
    ></positional-audio>
    <object3d base-url="static/"
    >
      <mesh
        :rotation="{ y: 4.71 }"
        :scale="audioOptions.scale"
        :position="audio.position"
        :onRaycaster="audioplay"
      >
        <geometry type="Plane" :args="audioOptions.args"></geometry>
        <material type="MeshBasic" :options="audioOptions.matOpts">
          <texture-loader :MappingIndex="Number(play)"
            :url="['img/suspend.png','img/play.png']" 
          ></texture-loader>
        </material>
      </mesh>
    </object3d>
  </Object3D>
</template>

<script>
// import Ami
import Object3D from "../vue_three_js/components/Object3D";
export default {
  mixins: [Object3D],
  props: {
    audio: {
      type: Object,
      default() {
      },
    },
    audioOptions:{
      type:Object
    }
  },
  data() {
    return {
      play:true
    };
  },
  // watch:{
  //   play(){
  //     console.log("00", this.play)
  //   }
  // },
  methods: {
    audioplay(){
      this.play = !this.play
      
    }
  },
  
};
</script>

<style>
</style>