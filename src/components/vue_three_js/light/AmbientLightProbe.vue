<script>
import * as THREE from 'three'
import Object3D from './../components/Object3D'
export default {
    name:'AmbientLightProbe',
    mixins:[Object3D],
    props: {
    type: { type: String, default: 'AmbientLightProbe' },
    hex:{type:String || Number},
    intensity: Number
  },
  data () {
    let curObj = this.obj
    if (!curObj) {
      curObj = new THREE.AmbientLightProbe(new THREE.Color(this.hex), this.intensity)
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  }
}
</script>