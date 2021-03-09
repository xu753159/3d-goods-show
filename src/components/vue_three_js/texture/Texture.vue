<script>
import { CanvasTexture, TextureLoader,VideoTexture } from 'three'
import * as THREE from 'three'
import Base from '../components/Base'

export default {
  name: 'Texture',
  mixins: [Base],
  inject: ['material'],
  props: {
    url: String,
    image: [HTMLCanvasElement],
    canvas: HTMLCanvasElement,
    video: null,
    options: { type: Object, default: () => ({}) }
  },
  watch:{
    url(){
     let texture = new TextureLoader().load(this.baseUrl + this.url)
      this.material.map = texture
      this.material.map.needsUpdate = true;
    }
  },
  data () {
    let { url, canvas, image,video, ...rest } = this.options
    url = url || this.url
    image = image || this.image
    canvas = this.material.canvasimg || canvas || this.canvas
    video = this.material.video || this.video || video
    let texture
    if (url) {
      if (this.baseUrl) {
        url = this.baseUrl + url
      }
      texture = new TextureLoader().load(url)
    } else if (canvas) {
      texture = new CanvasTexture(canvas)
    } else if(video) {
       texture = new VideoTexture(video)
    }else {
      let img = THREE.ImageUtils.getDataURL(image)
       img.crossOrigin ='anonymous'

      texture = new THREE.TextureLoader().load(img)
      // texture.set
    }

    Object.keys(rest).forEach(k => {
      if (k === 'repeat') {
        texture.repeat.set(...rest[k])
      } else {
        texture[k] = rest[k]
      }
    })

    this.material.map = texture
    this.material.map.needsUpdate = true;
    return { texture }
  },
  mounted () {
    // this.$emit('update:obj', this.texture)
  },
  beforeDestroy () {
     this.texture.dispose()
    // this.$emit('update:obj', null)
  },
  destroyed () {
    this.material.map = null;
    this.texture.dispose();
    this.texture = null;
  }
}
</script>
