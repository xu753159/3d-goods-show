<script>
import Object3D from "./../components/Object3D";
import * as THREE from "three";
export default {
    name:'RectAreaLight',
    mixins: [Object3D],
    props:{
        hex:{type:String || Number},
        intensity: Number,
        width: Number,
        height: Number,
    },
    data(){
       let curObj = this.obj
    
        if (!curObj) {
        curObj = new THREE.RectAreaLight(new THREE.Color(this.hex), this.intensity,this.width,this.height)
        }
        curObj.name = curObj.name || curObj.type;
        return { curObj };
    }
}
</script>