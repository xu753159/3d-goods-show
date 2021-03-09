<template>
  <div></div>
</template>
<script>
import { Reflector } from "three/examples/jsm/objects/Reflector";
import * as THREE from "three";
export default {
  name: "Reflector",
  inject:['scene'],
  props: {
    name: { type: String },
    type: { type: String, default: 'Reflector' },
    obj: { type: Object },
    scale: { type: [Object, Number] }, // { x, y, z }
    position: { type: Object }, // { x, y, z }
    rotation: { type: Object }, // { x, y, z }
    args: { type: Array, default: () => [] },
  },
  watch: {
    scale: {
      deep: true,
      handler (v) {
        this.setScale(v)
      }
    },
    position: {
      deep: true,
      handler (v) {
        Object.assign(this.curObj.position, v)
      }
    },
    rotation: {
      deep: true,
      handler (v) {
        Object.assign(this.curObj.rotation, v)
      }
    },
    obj (obj) {
      this.curObj = obj
    },
    curObj (obj, oldObj) {
      this.unsetObj(oldObj)
      this.setObj(obj)
    }
  },

  data () {
    var geometry = new THREE.PlaneBufferGeometry(...this.args);
    const verticalMirror = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: this.$global.rendererSize.w * window.devicePixelRatio,
      textureHeight: this.$global.rendererSize.h * window.devicePixelRatio,
      color: 0x889999,
    });
    var curObj = verticalMirror;
    return { curObj }
  },

  // ready => mounted + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  mounted () {
    this.setObj(this.curObj)

  },

  // detached => destroyed + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#detached-deprecated
  // but we use beforeDestroy to clean up
  beforeDestroy () {
    this.curObj.dispose()
    this.unsetObj(this.curObj)
    this.curObj=null
  },

  methods: {
    setObj (obj) {
      // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
      // obj.name = obj.name || this.constructor.name
      obj.name = this.name || obj.name || obj.type

      this.setScale(this.scale)
      Object.assign(obj.position, this.position)
      Object.assign(obj.rotation, this.rotation)

      if (this.scene) {
        this.scene.add(obj)
      }
      // this.$emit('update:obj', obj)
    },
    unsetObj (obj) {
      // this.$emit('update:obj', null)
      if (this.scene) {
        this.scene.remove(obj)
      }
    },
    setScale (v) {
      if (v && typeof v === 'number') {
        v = { x: v, y: v, z: v }
      }
      Object.assign(this.curObj.scale, v)
    }
  }

};
</script>
