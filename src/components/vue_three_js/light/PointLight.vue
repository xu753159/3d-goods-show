<script>
import Object3D from "./../components/Object3D";
import * as THREE from "three";
export default {
  name: "PointLight",
  mixins: [Object3D],
  props: {
    hex:{type:String || Number},
    intensity: Number,
    distance: Number,
    decay: Number,
  },
  data() {
    let curObj = this.obj
    if (!curObj) {
      curObj = new THREE.PointLight(new THREE.Color(this.hex), this.intensity,this.distance,this.decay)
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  },
};
</script>