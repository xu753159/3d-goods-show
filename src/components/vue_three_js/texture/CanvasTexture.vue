<script>
import Base from "./../components/Base";
import { CanvasTexture } from 'three'
export default {
  name: "CanvasTexture",
  mixins: [Base],
  inject: ["material"],
  props: {
    canvas: HTMLCanvasElement,
    options: { type: Object, default: () => ({}) },
  },
 data () {
    let {canvas, ...rest } = this.options
    canvas = this.material.canvasimg || canvas || this.canvas
    let texture
    if (canvas) {
      texture = new CanvasTexture(canvas)
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
    //  this.$emit('update:obj', null)
  },
  destroyed () {
    this.material.map = null;
    this.texture.dispose();
    this.texture = null;

  }
};
</script>
