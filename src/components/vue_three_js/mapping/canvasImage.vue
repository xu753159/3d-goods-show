<template>
  <div></div>
</template>
<script>
// import { Blending } from "three";
export default {
    name:'canvasImage',
    inject:['material'],
    data(){
        return{
            canvas:null
        }
    },
    props:{
       Imageurl:String,
      
    },
    created(){
      
        // ctx.fillStyle = "rgba(0,0,0,0.5)";
        // ctx.fillRect(5, 5, 600, 300)
        // this.material.canvasimg = canvas
        // console.log(this.Renderer)
        // var canvas = document.createElement('canvas');
        // let ctx = canvas.getContext('2d')
        // canvas.width = 600
        // canvas.height = 300
        // // this. fillRoundRect(ctx, 0, 0, 600, 300, 10, ' rgb(255, 255, 255)');
        // // 制作矩形
        // ctx.fillStyle = "rgba(0,0,255,1)";
        // ctx.fillRect(5, 5, 600, 300)
        // // 设置文字
        // ctx.fillStyle = "#ffffff";
        // ctx.font = 'normal 24px "楷体"'
        // ctx.textAlign = "start"; //文本的中心被放置在指定的位置。
        // //文本基线是 em 方框的正中。
        // //  ctx.fillText('模型介绍', 100, 20)
        // ctx.fillText(this.title, 50, 30)
        // // let textWord = '该模型由同学制作完成'
        // let textWord = this.describe
        // // 文字换行
        // let len = parseInt(textWord.length / 10)
        // for (let i = 0; i < (len + 1); i++) {
        //     let space = 40
        //     if (i === len) {
        //     space = textWord.length - len * 10
        //     }
        //     // console.log('len+' + len, 'space+' + space)
        //     let word = textWord.substr(i * 10, space)
        //     ctx.font = 'normal 18px "楷体"'
        //     if (i<=0){
        //         ctx.fillText(word, 50, 60*(i+1))
        //     }else{
        //          ctx.fillText(word, 50, 60*(i+1)-(60*i-18*i))
        //     }

           
        //     }
        // // cxt.restore();
        // this.canvas = canvas.toDataURL()
        // 
        
        // this. fillRoundRect(ctx, 0, 0, 600, 300, 10, ' rgb(255, 255, 255)');
        // // 制作矩形
        // ctx.fillStyle = "rgba(0,0,255,1)";
        // ctx.fillRect(5, 5, 600, 300)
        // // 设置文字
        // ctx.fillStyle = "#ffffff";
        // ctx.font = 'normal 24px "楷体"'
        // ctx.textAlign = "start"; //文本的中心被放置在指定的位置。
        // //文本基线是 em 方框的正中。
        // //  ctx.fillText('模型介绍', 100, 20)
        // ctx.fillText(this.title, 50, 30)
        // // let textWord = '该模型由同学制作完成'
        // let textWord = this.describe
        // // 文字换行
        // let len = parseInt(textWord.length / 10)
        // for (let i = 0; i < (len + 1); i++) {
        //     let space = 40
        //     if (i === len) {
        //     space = textWord.length - len * 10
        //     }
        //     // console.log('len+' + len, 'space+' + space)
        //     let word = textWord.substr(i * 10, space)
        //     ctx.font = 'normal 18px "楷体"'
        //     if (i<=0){
        //         ctx.fillText(word, 50, 60*(i+1))
        //     }else{
        //          ctx.fillText(word, 50, 60*(i+1)-(60*i-18*i))
        //     }
        
    },
    methods:{
        runAsync(){
            let canvasWidth =  512;
            let canvasHeight =  256;
            let canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            let context = canvas.getContext('2d');
            return new Promise((resolve,reject)=>{
                let img =new Image()
                img.src=this.Imageurl
                img.onload=()=>{
                    context.clearRect(0, 0, canvasWidth, canvasHeight);
                    context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                    // console.log(this.material)
                    resolve(canvas)
                }
                img.onerror=(e)=>{
                    reject(e)
                }
            })
        }

    },
    mounted() {
        // var material = this.material
       this.material.canvasimg = this.runAsync().then((canvas)=>{
          
           return canvas
        //    console.log(this.material)
        })

    },
}
</script>
<style scoped>
    .coll{
        color: rgb(255, 255, 255);}

</style>