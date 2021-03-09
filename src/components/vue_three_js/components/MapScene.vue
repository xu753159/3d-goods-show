<script>
/* eslint-disable no-duplicate-imports */
import { Scene } from "three";
import * as THREE from "three";
import Object3D from "./Object3D";

export default {
  name: "MapScene",
  mixins: [Object3D],
  props: {
    obj: { type: Object },
    bgcolor: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  provide() {
    return {
      scene: this.curObj,
    };
  },
  data() {
    let curObj = this.obj;
    if (!curObj) {
      curObj = new Scene();
      
    }
    if (this.bgcolor) {
      curObj.background = new THREE.Color(this.bgcolor);
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  },

  mounted() {
    let scene = this.curObj;
    this.$global.mapscene = scene;
    
    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    // if (process.env.NODE_ENV === "development") {
    //   window.THREE = THREE;
    //   window.scene = scene;
    // }
  },
  beforeDestroy(){
    this.curObj.children = []
  }
};
</script>
