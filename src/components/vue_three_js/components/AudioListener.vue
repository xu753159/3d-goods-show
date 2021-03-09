<template>
  <Object3D :obj="listener" :position="position"></Object3D>
</template>

<script>
import { AudioListener } from 'three'
import Object3D from './Object3D'

export default {
  name: 'AudioListener',
  mixins: [Object3D],
  components: { Object3D },

  data () {
    let listener = new AudioListener()
    this.$global.audioListener = listener
    return { listener }
  },
  mounted() {
      this.$global.camera.add(this.listener)
   
  },
  beforeDestroy () {
    this.unsetObj(this.listener)
    this.listener=null
  },

  
}
</script>
