<script>
import Object3D from "./../components/Object3D";
import * as THREE from "three";
export default {
  name: "HemisphereLight",
  mixins: [Object3D],
  props: {
    skyColor:{type:String || Number},
    groundColor:{type:String || Number},
    intensity: Number,
  },
  data() {
    let curObj = this.obj;
    if (!curObj) {
      curObj = new THREE.HemisphereLight(new THREE.Color(this.skyColor) , new THREE.Color(this.groundColor) , this.intensity);
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  },
};
</script>