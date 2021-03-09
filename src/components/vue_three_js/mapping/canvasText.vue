<template>
  <div></div>
</template>
<script>
// import { Blending } from "three";
export default {
  name: "canvasText",
  inject: ["material"],
  data() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    return {
      canvas,
      context,
    };
  },
  props: {
    title: String,
    describe: String,
    show: Boolean,
  },
  watch: {
  //   show() {
  //     this.DrawAcircle();
  //     if (this.show) {
  //       this.fillRoundRect(
  //         this.context,
  //         0,
  //         280,
  //         600,
  //         300,
  //         10,
  //         " rgba(0, 0, 0,0.5)"
  //       );
  //       // 制作矩形
  //       // ctx.fillStyle = "rgba(0,0,0,0.5)";
  //       // ctx.fillRect(5, 5, 600, 300)
  //       // 设置文字
  //       this.context.fillStyle = "#ffffff";
  //       this.context.font = 'normal 30px "楷体"';
  //       this.context.textAlign = "start"; //文本的中心被放置在指定的位置。
  //       //文本基线是 em 方框的正中。
  //       //  ctx.fillText('模型介绍', 100, 20)
  //       this.context.fillText(this.title, 300, 320);
  //       // let textWord = '该模型由同学制作完成'
  //       let textWord = this.describe;
  //       // 文字换行
  //       let len = parseInt(textWord.length / 10);
  //       for (let i = 0; i < len + 1; i++) {
  //         let space = 18;
  //         if (i === len) {
  //           space = textWord.length - len * 10;
  //         }
  //         // console.log('len+' + len, 'space+' + space)
  //         let word = textWord.substr(i * 10, space);
  //         this.context.font = "normal 24px ";
  //         this.context.textAlign = "start";
  //         if (i <= 0) {
  //           this.context.fillText(word, 20, 300 + 60 * (i + 1));
  //         } else {
  //           this.context.fillText(
  //             word,
  //             20,
  //             300 + 60 * (i + 1) - (60 * i - 28 * i)
  //           );
  //         }
  //       }
  //     }
  //   },
  },
  created() {
    this.DrawAcircle();
    if (this.show) {
      // 圆角矩形平面    宽度：600
      this.fillRoundRect(
        this.context,
        0,
        200,
        600,
        300,
        10,
        " rgba(0, 0, 0,0.5)"
      );
      // 白色长条
      this.fillRoundRect(
        this.context,
        295,
        60,
        10,
        150,
        5,
        " rgba(255, 255, 255,0.9)"
      );
      // 设置文字
      this.context.fillStyle = "#ffffff";
      this.context.font = 'normal 30px "楷体"';
      this.context.textAlign = "start"; //文本的中心被放置在指定的位置。
      //文本基线是 em 方框的正中。
      //  ctx.fillText('模型介绍', 100, 20)
      this.context.fillText(this.title, (600-this.context.measureText(this.title).width)/2, 240);
       var result = this.breakLinesForCanvas(
            this.describe,
            580,  this.context.font);
         var lineHeight = 30
        result.forEach((line, index)=>{
        this.context.fillText(line, 10, lineHeight * index + 280);
    });
    }
     
    this.material.canvasimg = this.canvas;
  },
  methods: {
    DrawAcircle() {
      this.canvas.width = 600;
      this.canvas.height = 600;
      this.context.beginPath();
      this.context.arc(300, 75, 50, 0, 2 * Math.PI);
      this.context.fillStyle = "rgba(0,0,0,0.5)";
      this.context.fill();
      this.context.stroke();
      this.context.beginPath();
      this.context.arc(300, 75, 20, 0, 2 * Math.PI);
      this.context.fillStyle = "#fff";
      this.context.fill();
      this.context.stroke();
    },
    /**该方法用来绘制圆角矩形
     *@param cxt:canvas的上下文环境
     *@param x:左上角x轴坐标
     *@param y:左上角y轴坐标
     *@param width:矩形的宽度
     *@param height:矩形的高度
     *@param radius:圆的半径
     *@param lineWidth:线条粗细
     *@param strokeColor:线条颜色
     **/
    strokeRoundRect(
      cxt,
      x,
      y,
      width,
      height,
      radius,
      /*optional*/ lineWidth,
      /*optional*/ strokeColor
    ) {
      //圆的直径必然要小于矩形的宽高
      if (2 * radius > width || 2 * radius > height) {
        return false;
      }

      cxt.save();
      cxt.translate(x, y);
      //绘制圆角矩形的各个边
      this.drawRoundRectPath(cxt, width, height, radius);
      cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2
      cxt.strokeStyle = strokeColor || "#000";
      cxt.stroke();
      cxt.restore();
    },
    /**该方法用来绘制一个有填充色的圆角矩形
     *@param cxt:canvas的上下文环境
     *@param x:左上角x轴坐标
     *@param y:左上角y轴坐标
     *@param width:矩形的宽度
     *@param height:矩形的高度
     *@param radius:圆的半径
     *@param fillColor:填充颜色
     **/
    fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
      //圆的直径必然要小于矩形的宽高
      if (2 * radius > width || 2 * radius > height) {
        return false;
      }
      cxt.save();
      cxt.translate(x, y);
      //绘制圆角矩形的各个边
      this.drawRoundRectPath(cxt, width, height, radius);
      cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
      cxt.fill();
      cxt.restore();
    },
    drawRoundRectPath(cxt, width, height, radius) {
      cxt.beginPath(0);
      //从右下角顺时针绘制，弧度从0到1/2PI
      cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
      //矩形下边线
      cxt.lineTo(radius, height);
      //左下角圆弧，弧度从1/2PI到PI
      cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
      //矩形左边线
      cxt.lineTo(0, radius);
      //左上角圆弧，弧度从PI到3/2PI
      cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
      //上边线
      cxt.lineTo(width - radius, 0);
      //右上角圆弧
      cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
      //右边线
      cxt.lineTo(width, height - radius);
      cxt.closePath();
    },
    //寻找切换断点
    findBreakPoint(text, width, context) {
      var min = 0;
      var max = text.length - 1;

      while (min <= max) {
        var middle = Math.floor((min + max) / 2);
        // 截取的文本长度
        var middleWidth = context.measureText(text.substr(0, middle)).width;
        var oneCharWiderThanMiddleWidth = context.measureText(
          text.substr(0, middle + 1)
        ).width;
        if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
          return middle;
        }
        if (middleWidth < width) {
          min = middle + 1;
        } else {
          max = middle - 1;
        }
      }

      return -1;
    },
    // 文字   一行文字长度width   font 文字样式
     /**该方法用来绘制文字换行
     *@param text:文字
     *@param width:一行文字长度width
     *@param font:文字样式
     **/
    breakLinesForCanvas(text, width, font) {
      var context = this.context
      var result = [];
      var breakPoint = 0;

      if (font) {
        context.font = font;
      }

      while ((breakPoint = this.findBreakPoint(text, width, context)) !== -1) {
        result.push(text.substr(0, breakPoint));
        text = text.substr(breakPoint);
      }

      if (text) {
        result.push(text);
      }

      return result;
    },
  },
  beforeDestroy() {
    this.canvas = null;
    this.context = null;
  },
};
</script>
<style scoped>
.coll {
  color: rgb(255, 255, 255);
}
</style>
