<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import * as THREE from 'three'
import Base from '../components/Base'
export default {
    name:"Sprite",
    mixins:[Base],
    inject:['meshVm'],
    provide(){
        return{
            obtain:Object
        } 
    },
    data(){
        return{
          sprite:null
        }
    },
    props:{
        name:String,
        index:Number
    },
    mounted(){
        if(!this.meshVm.curObj.material){
            this.meshVm.curObj.material = new THREE.SpriteMaterial( {  color: 0xFF00FF } );
        }
        this.sprite = new THREE.Sprite(this.meshVm.curObj.material)
        //this.meshVm.curObj = this.sprite
        this.sprite.name = this.name
        this.sprite.tipsindex = this.index
        this.meshVm.curObj = this.sprite

        // var spriteMaterial = new THREE.SpriteMaterial({
		// 	color:0xff00ff,//设置精灵矩形区域颜色
		// 	  // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
		// 	//   map: texture,//设置精灵纹理贴图
		// });
    },
    beforeDestroy(){
        
    }

}
</script>
