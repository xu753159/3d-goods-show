<script>
import { TextureLoader } from "three";
import Base from "../components/Base";
export default {
  name: "TextureLoader",
  mixins: [Base],
  inject: ["material"],
  props: {
    url: null,
    options: { type: Object, default: () => ({}) },
    MappingIndex: { type: Number, default: () => 0 },
  },
  watch: {
    url() {
      let texture = new TextureLoader().load(this.baseUrl + this.url);
      this.material.map = texture;
      this.material.map.needsUpdate = true;
    },
    MappingIndex() {
      this.material.map = this.texture[this.MappingIndex];
      this.material.map.needsUpdate = true;
    },
  },
  data() {
    let { url, ...rest } = this.options;
    url = url || this.url;
    // 1. 判断url 是单个 还是多个
    let texture;
    if (Array.isArray(url)) {
      texture = [];
      for (let i = 0; i < url.length; i++) {
        if (url[i]) {
          if (this.baseUrl) {
            url[i] = this.baseUrl + url[i];
          }
          texture[i] = new TextureLoader().load(url[i]);
        }
      }
      Object.keys(rest).forEach((k) => {
        if (k === "repeat") {
          texture[this.MappingIndex].repeat.set(...rest[k]);
        } else {
          texture[this.MappingIndex][k] = rest[k];
        }
      });
      this.material.map = texture[this.MappingIndex];
     
    } else {
      if (url) {
        if (this.baseUrl) {
          url = this.baseUrl + url;
        }
        texture = new TextureLoader().load(url);
      }
      Object.keys(rest).forEach((k) => {
        if (k === "repeat") {
          texture.repeat.set(...rest[k]);
        } else {
          texture[k] = rest[k];
        }
      });
      this.material.map = texture;
    }
     this.material.map.needsUpdate = true;
    return { texture };
  },
  mounted() {
    this.$emit("update:obj", this.texture);
  },
  beforeDestroy() {
    if(Array.isArray(this.url)){
      for (let i = 0; i < this.texture.length; i++) {
        this.texture[i].dispose()
      }
      this.texture = null
    }else{
      this.texture.dispose();
    }

    this.$emit("update:obj", null);
  },
  destroyed() {
    this.material.map = null;
  },
};
</script>