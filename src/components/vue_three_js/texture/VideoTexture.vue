<script>
import { VideoTexture } from 'three'
import Base from '../components/Base'

export default {
  name: 'VideoTexture',
  mixins: [Base],
  inject: ['material'],
  props: {
    video: null,
    options: { type: Object, default: () => ({}) }
  },
  data () {
    let { video, ...rest } = this.options
    video = this.material.video || this.video || video
    let texture
    if(video) {
       texture = new VideoTexture(video)
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
