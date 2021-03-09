<script>
import Object3D from "./../components/Object3D";
import * as THREE from "three";
export default {
  name: "SpotLight",
  mixins: [Object3D],
  props: {
    hex: {type:String || Number},
    intensity: Number,
    distance: Number,
    angel:Number,
    decay: Number,
  },
  data() {
    let curObj = this.obj
    if (!curObj) {
      curObj = new THREE.SpotLight(new THREE.Color(this.hex), this.intensity,this.distance,this.angel,0,this.decay)
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  },
};
</script>