<template>
    <div></div>
</template>
<script>
import * as THREE from 'three'
export default {
    name:"Fog",
    inject:['scene'],
    props:{
        color : Number, 
        near : Number, 
        far : Number
    },
    data(){
        var fog = new THREE.Fog( this.color, this.near, this.far );
        return {fog }
    },
    mounted() {
      this.$globa.fog =this.fog
    },
    beforeDestroy(){
        this.fog=null
    }
}
</script>