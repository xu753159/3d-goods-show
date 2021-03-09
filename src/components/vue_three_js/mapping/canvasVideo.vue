<template>
    <div></div>
</template>
<script>
// import * as THREE from 'three'
export default {
    name:'canvasVideo',
    inject: ['material'],
    data(){
        return{
            video:document.createElement('video')
        }
    },
    props:{
        videourl:String,
        isplay:{
            default(){
                return false
            }
        }
    },
    watch:{
        isplay(){
            if(this.isplay){
                this.video.play()
                this.video.muted = "";
            }else{
                this.video.pause()
                this.video.currentTime = 0;
                this.video.muted = "muted";
            }
        }
    },
    created(){
         
            this.video.src = this.videourl; // 设置视频地址
            this.video.autoplay = "autoplay"; //要设置播放
            this.video.muted = "muted"; //静音
            this.video.loop = 'loop'
           if(this.isplay){
                this.video.play()
            }
            this.material.video = this.video
    },
    beforeDestroy(){
        this.video.pause()
        this.video = null
    }

}
</script>