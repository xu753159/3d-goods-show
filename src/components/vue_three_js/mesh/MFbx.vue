<script>
import * as THREE from "three";
import Base from "../components/Base";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import ModelStorage from "./ModelStorage";

export default {
  name: "MFbx",
  mixins: [Base, ModelStorage],
  inject: ["meshVm"],
  props: {
    process: {
      type: Function,
    },
    FbxUrl: String,
    processNumber: Number,
  },
  data() {
    return {
      loader: null,
    };
  },
  created() {
    // var cnt=0
    this.initial(this.FbxUrl)
  },
  methods: {
    requireModel() {
      new Promise((resolve) => {
        let { baseUrl, FbxUrl } = this;
        this.loader = new FBXLoader();
        this.loader.load(baseUrl + FbxUrl, (obj) => {
          this.meshVm.curObj = obj;
          const animations = obj.animations;
          //加载动画
          let animationList = this.animation(animations,obj)
          var objBbox = new THREE.Box3().setFromObject(obj);
          objBbox.setFromObject(obj);
          let model = {
            name: this.FbxUrl,
            model: obj.toJSON(),
            edition: this.edition,
            animation:  animationList,// worker 传入对对象必须是可以拷贝的 
          };
          resolve(model);
        });
      }).then((model) => {
        this.loader = null;
        this.WorkerSave(model);
      });
    },
  },
  beforeDestroy() {
    this.loader = null
  },
};
</script>
