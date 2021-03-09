<script>
import { PerspectiveCamera } from 'three'
import Object3D from './Object3D'

export default {
  name: 'Camera',
  mixins: [Object3D],
  props: {
    obj: { type: Object }
  },

  data () {
    let curObj = this.obj

    const { w, h } = this.$global.rendererSize // fixme
    if (!curObj) {
      curObj = new PerspectiveCamera(75, w / h, 0.1, 1000)
      // curObj.setViewOffset(w,h,500,500)
    }
    curObj.name = curObj.name || curObj.type

    return { curObj }
  },

  mounted () {
    this.$global.camera = this.curObj
  },
  beforeDestroy(){
    this.curObj=null
  }
  
}
</script>
