<script>
import * as THREE from "three";
import Base from "../components/Base";

export default {
  name: "ImageTexture",
  mixins: [Base],
  inject: ["material"],
  props: {
    image: [HTMLCanvasElement],
    options: { type: Object, default: () => ({}) },
  },
  data() {
    let { image, ...rest } = this.options;
    image = image || this.image;
    let texture;
    let img = THREE.ImageUtils.getDataURL(image);
    img.crossOrigin = "anonymous";
    texture = new THREE.TextureLoader().load(img);
    Object.keys(rest).forEach((k) => {
      if (k === "repeat") {
        texture.repeat.set(...rest[k]);
      } else {
        texture[k] = rest[k];
      }
    });

    this.material.map = texture;
    this.material.map.needsUpdate = true;
    return { texture };
  },
  mounted() {
    // this.$emit("update:obj", this.texture);
  },
  beforeDestroy() {
     this.texture.dispose()
    // this.$emit("update:obj", null);
  },
  destroyed() {
    this.material.map = null;
    this.texture.dispose();
    this.texture = null;

  },
};
</script>
