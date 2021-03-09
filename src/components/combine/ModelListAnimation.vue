<template>
  <div>
    <div v-for="(model, index) in modelList" :key="index">
      <object3d
        v-if="model.renderorder <= loaderorder"
        base-url="static/Dracogltf/"
        :position="model.position"
      >
        <mesh :scale="modelOptions.scale">
          <m-gltf
            v-if="getFileType(model.modelsrc,'gltf')"
            :gltf-url="model.modelsrc"
            :edition="model.edition"
            :process="process"
          >
          </m-gltf>
          <m-fbx
            v-if="getFileType(model.modelsrc,'fbx')"
            :fbx-url="model.modelsrc"
            :process="process"
          >
          </m-fbx>
        </mesh>

      </object3d>
    </div>
  </div>
</template>

<script>
import Object3D from "../vue_three_js/components/Object3D";
export default {
  mixins: [Object3D],
  props: {
    modelList: {
      type: Array,
    },
    modelOptions: { type: Object },
  },
  data() {
    return {
      loaderorder: 0,
    };
  },
  mounted() {},
  methods: {
    process() {
      this.loaderorder += 1;
      this.$bus.$emit("modelloaded", this.loaderorder);
    },
    /** 返回文件 后缀名 */
    getFileType(filePath,fileName) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1) {
        var name = filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase() ;
          return name == fileName
      } else {
        return "";
      }
    },
    beforeDestroy() {
      this.loaderorder = 0;
    },
  },
};
</script>

<style>
</style>