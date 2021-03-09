<script>
import * as THREE from 'three'
import Object3D from './../components/Object3D'

export default {
  name: 'DirectionLight',
  mixins: [Object3D],
  props: {
    hex:{type:String || Number},
    intensity: Number
  },

  data () {
    let curObj = this.obj
    if (!curObj) {
      curObj = new THREE.DirectionalLight(new THREE.Color(this.hex), this.intensity,)
      // curObj.castShadow=true
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  }
}
</script>
