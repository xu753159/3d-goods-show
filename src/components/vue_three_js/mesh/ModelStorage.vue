
<script>
import * as THREE from "three";
import Dexie from "dexie";
import Worker from "worker-loader!./worker.js";
export default {
  name: "ModelStorage",
  data() {
    var db = new Dexie("ModelDatabase");
    db.version(1).stores({
      // 创建表
      modelList: "++id,name,model,edition,animation",
    });
    return {
      db,
      animationAction: null,
    };
  },
  props: {
    edition: Number,
    play: {
      // 播放暂停
      type: Boolean,
      default() {
        return true;
      },
    },
    loop: {
      //循环模式
      type: Number,
      default() {
        return THREE.LoopRepeat;
        /** 必须是以下值之一：
         *  THREE.LoopOnce - 只执行一次
            THREE.LoopRepeat - 重复次数为repetitions的值, 且每次循环结束时候将回到起始动作开始下一次循环。
            THREE.LoopPingPong - 重复次数为repetitions的值, 且像乒乓球一样在起始点与结束点之间来回循环。
        */
      },
    },
    time: {
      // 动作开始的时间点 (单位是秒, 从0开始计时).  第一次 播放的第几秒的那一帧
      type: Number,
      default() {
        return 0;
      },
    },
    weight: {
      //动作的影响程度 (取值范围[0, 1]). 0 (无影响)到1（完全影响）之间的值可以用来混合多个动作。默认值是1
      //控制，动画模型活动范围
      type: Number,
      default() {
        return 1;
      },
    },
    repetitions: {   // 动画播放次数  默认值是Infinity
      type: Number,
      default() {
        return Infinity;
      },
    },
    timeScale:{ // 时间(time)的比例因子. 值为0时会使动画暂停。值为负数时动画会反向执行。默认值是1。
       type: Number,
      default() {
        return 1;
      },
    },
    setEffectiveTimeScale:{ // 时间比例值越大播放越快
      type: Number,
      default() {
        return 1;
      },
    }
  },
  watch: {
    timeScale(v) {
      this.animationAction.timeScale=v
    },
  },
  created() {},
  beforeDestroy(){
    this.animationAction = null
  },

  methods: {
    /**线程 保存
     *@param obj: obj保存的对象
     */
    WorkerSave(obj) {
      let worker = new Worker();
      worker.postMessage(obj);
      worker.onmessage = (e) => {
        console.log("Received message " + e.data);
        worker.terminate();
      };
    },
    /**该方法用于读取数据库模型文件
     *@param modelName: 数据库存储的模型 名字
     **/
    async readModel(modelName) {
      let dbmodel = null;
      await this.db.modelList
        .where("name")
        .equalsIgnoreCase(modelName)
        .first()
        .then((res) => {
          if (res) {
            if (res.edition != this.edition) {
              this.db.modelList.delete(res.id);
              dbmodel = null;
            } else {
              //返回模型
              dbmodel = res;
            }
          } else {
            // 加载模型文件
            dbmodel = null;
          }
        })
        .catch((err) => {
          console.log("数据读取失败", err);
          dbmodel = null;
        });

      return dbmodel;
    },
    /** 加载 three 对象
     * @param resModel: 需要解析的模型
     */
    loaderModel(res) {
      let loader = new THREE.ObjectLoader(); //加载 three 对象
      new Promise((resolve) => {
        loader.parse(res.model, (model) => {
          this.meshVm.curObj = model;
          //加载动画
          this.loaderAnimations(res.animation, model);
          resolve();
        });
      }).then(() => {
        loader = null;
      });
    },
    /**加载数据库动画动画
     * @param animations: 动画数据
     * @param obj: 模型数据
     */
    loaderAnimations(animations, obj) {
      if (animations && animations.length) {
        animations = new THREE.AnimationLoader().parse(animations); //转换  AnimationClip 对象
        const mixer = new THREE.AnimationMixer(obj);
        for (let i = 0; i < animations.length; i++) {
          //  animations[i]   THREE.AnimationClip.parse(animations[i])
          const animation = animations[i];
          // There's .3333 seconds junk at the tail of the Monster animation that
          // keeps it from looping cleanly. Clip it at 3 seconds
          //animation.duration = 3;
          this.animationAction = mixer.clipAction(animation);
          this.setAnimation();
        }
        this.$global.mixer = mixer;
      }
    },
    /** 加载模型动画
     * @param animations: 动画数据
     * @param obj: 模型数据
     */
    animation(animations, obj) {
      let animationList = []; // 保存 动画数据
      if (animations && animations.length) {
        const mixer = new THREE.AnimationMixer(obj);
        for (let i = 0; i < animations.length; i++) {
          const animation = animations[i];
          // There's .3333 seconds junk at the tail of the Monster animation that
          // keeps it from looping cleanly. Clip it at 3 seconds
          //animation.duration = 3;
          this.animationAction = mixer.clipAction(animation);
          animationList.push(THREE.AnimationClip.toJSON(animation));
          this.setAnimation();
        }
        this.$global.mixer = mixer;
      }
      return animationList;
    },
    /** 初始化函数
     * @param fileName : 文件名称
     */
    initial(fileName) {
      // 查看数据有没有 模型
      //读取数据库
      this.readModel(fileName).then((dbmodel) => {
        if (dbmodel) {
          // 解析模型
          this.loaderModel(dbmodel);
          this.process();
        } else {
          // 重新加载模型
          this.requireModel();
          this.process();
        }
      });
    },
    /**
     * 加载 文件model
     */
    requireModel() {},

   
    
    /**动画设置
     */
    setAnimation() {
      if (this.play) {
        this.animationAction.play();
      }
      this.animationAction.loop = this.loop; // 动画循环模式
      this.animationAction.time = this.time; // 第一次播放的几秒那一帧
      this.animationAction.weight = this.weight;  //控制，动画模型活动范围
      this.animationAction.repetitions = this.repetitions;  // 控制动画 播放次数
      this.animationAction.timeScale  = this.timeScale;    // 控制 播放状态
      this.animationAction.setEffectiveTimeScale(this.setEffectiveTimeScale)
    },
  },
};
</script>

<style>
</style>