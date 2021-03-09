<script>
import Object3D from "./../components/Object3D";
import * as THREE from 'three'
export default {
  name: "AmbientLight",
  mixins: [Object3D],
  props: {
    hex: {type:String || Number},
    intensity: Number,
  },
  data () {
    let curObj = this.obj
    if (!curObj) {
       curObj = new THREE.AmbientLight(new THREE.Color(this.hex), this.intensity)
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  }
};
</script>