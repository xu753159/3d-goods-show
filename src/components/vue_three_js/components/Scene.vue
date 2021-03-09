<script>
/* eslint-disable no-duplicate-imports */
import { Scene } from "three";
import * as THREE from "three";
import Object3D from "./Object3D";
// import textture from '../texture/TextureScene'


export default {
  name: "Scene",
  mixins: [Object3D],
  props: {
    obj: { type: Object },
    bgcolor: {
      type: String,
      default() {
        return ''
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
    this.$global.scene = scene;

    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    // if (process.env.NODE_ENV === "development") {
    //   window.THREE = THREE;
    //   window.scene = scene;
    // }
  },
    beforeDestroy() {


    },
    destroyed() {
        let arr = this.curObj.children.filter(x=>x)
        arr.forEach(a=>{
            this.dispose(this.curObj,a);
        })
        this.curObj.remove();
        this.curObj = null;
    },

    methods:{
        dispose(parent,child){
            if(child.children.length){
                let arr  = child.children.filter(x=>x);
                arr.forEach(a=>{
                    this.dispose(child,a)
                })
            }
            if (child.material){
                if(child.material.map) {
                    child.material.map.dispose();
                }
                child.material.dispose();

            }
            if (child.geometry) {
                child.geometry.dispose();
            }
            child.remove();
            parent.remove(child);
        }
    },
    created() {
      console.log(this)
    },
};
</script>
